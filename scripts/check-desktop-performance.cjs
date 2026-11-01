const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../src/components/desktop/PortfolioDesktop.tsx'), 'utf8');
const compile = code => ts.transpileModule(code, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;

// Exercise the actual handlers with a controlled animation-frame queue.
class Node {}
const targets = [new Node(), new Node()];
const root = { dataset: {} };
const frames = new Map();
let nextFrame = 0, tweenCalls = 0, layoutReads = 0;
const states = [{}, {}];
const motion = targets.map((target, index) => ({
  item: {
    contains: node => node === target,
    offsetParent: { getBoundingClientRect: () => { layoutReads++; return { left: 0, top: 0 }; } },
    offsetLeft: index * 60, offsetTop: 0, offsetWidth: 48, offsetHeight: 48,
    classList: { contains: () => true },
  },
  lift: value => { tweenCalls++; states[index].y = value; },
  scale: value => { tweenCalls++; states[index].scale = value; },
  spread: value => { tweenCalls++; states[index].x = value; },
}));
const dockStart = source.indexOf('let activeMotion:');
const dockEnd = source.indexOf("root.addEventListener('pointermove', move)", dockStart);
assert.ok(dockStart > 0 && dockEnd > dockStart);
const { move, reset } = new Function('motion', 'Node', 'root', 'glass', 'glow', 'styles', 'requestAnimationFrame', 'cancelAnimationFrame',
  compile(source.slice(dockStart, dockEnd)) + 'return { move, reset };')(
  motion, Node, root, null, null, { appIcon: 'icon' },
  callback => { const id = ++nextFrame; frames.set(id, callback); return id; },
  id => frames.delete(id),
);
const hover = target => move({ pointerType: 'mouse', target, clientX: 24, clientY: 24 });
const flush = () => { const batch = [...frames.values()]; frames.clear(); batch.forEach(callback => callback()); };
for (let index = 0; index < 120; index++) hover(targets[0]);
assert.equal(frames.size, 1);
assert.equal(tweenCalls, 0);
flush();
assert.equal(tweenCalls, 3);
assert.equal(layoutReads, 1);
assert.ok(states[0].scale > 1);
assert.equal(states[1].scale, undefined);
hover(targets[1]); flush();
assert.equal(states[0].scale, 1);
assert.ok(states[1].scale > 1);
hover(new Node()); flush();
assert.equal(root.dataset.tracking, 'false');
assert.ok(states.every(state => state.scale === 1));
const idleCalls = tweenCalls;
hover(new Node()); flush();
assert.equal(tweenCalls, idleCalls);
hover(targets[0]); reset(); flush();
assert.equal(frames.size, 0);
assert.equal(tweenCalls, idleCalls);

// Clock work follows minute boundaries and stops while the page is hidden.
const clockStart = source.indexOf('let timer: ReturnType<typeof setTimeout>');
const clockEnd = source.indexOf('}, []);', clockStart);
assert.ok(clockStart > 0 && clockEnd > clockStart);
const listeners = new Map(), timers = new Map();
const document = { hidden: false, addEventListener: (name, callback) => listeners.set(name, callback), removeEventListener: name => listeners.delete(name) };
let clockUpdates = 0, timerId = 0;
class ClockDate extends Date { static now() { return 12_345; } }
const cleanup = new Function('document', 'setClock', 'Date', 'setTimeout', 'clearTimeout', compile(source.slice(clockStart, clockEnd)))(
  document, () => clockUpdates++, ClockDate,
  (callback, delay) => { const id = ++timerId; timers.set(id, { callback, delay }); return id; },
  id => timers.delete(id),
);
assert.equal(clockUpdates, 1);
assert.equal([...timers.values()][0].delay, 47_655);
document.hidden = true; listeners.get('visibilitychange')();
assert.equal(timers.size, 0);
assert.equal(clockUpdates, 1);
document.hidden = false; listeners.get('visibilitychange')();
assert.equal(clockUpdates, 2);
assert.equal(timers.size, 1);
cleanup();
assert.equal(timers.size, 0);
assert.equal(listeners.size, 0);
console.log('PASS: 120 pointer events → one frame, three tween targets, one layout read; inactive icons stay idle; leave cancels queued work; minute clock sleeps while hidden and cleans up.');
