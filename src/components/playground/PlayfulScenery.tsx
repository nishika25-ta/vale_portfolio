export function FloatingScenery() {
  return <div className="floating-scenery" aria-hidden="true"><span className="scene-spark spark-a">✦</span><span className="scene-spark spark-b">✧</span><span className="scene-spark spark-c">✦</span><svg className="space-explorer" viewBox="0 0 100 92" fill="none"><ellipse cx="51" cy="78" rx="26" ry="5" fill="#a18bff" opacity=".2" /><path d="m33 54-9 13m44-13 9 13M41 69l-4 11m23-11 4 11" stroke="#c3b3ef" strokeWidth="7" strokeLinecap="round" /><rect x="31" y="39" width="41" height="32" rx="15" fill="#b6a5ee" /><circle cx="51" cy="31" r="24" fill="#e3d9fa" stroke="#ab93e4" strokeWidth="2" /><rect x="33" y="20" width="36" height="23" rx="11" fill="#32234e" /><path d="M40 28v6m22-6v6" stroke="#abffdf" strokeWidth="3" strokeLinecap="round" /><path d="M47 37q4 3 8 0" stroke="#abffdf" strokeWidth="2" strokeLinecap="round" /><path d="M39 22h15" stroke="white" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" /><circle cx="51" cy="55" r="5" fill="#adffdb" /><path d="m83 12 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#ffd5ac" /></svg></div>;
}
export function PlayfulNotes() {
  return (
    <>
      <div className="floating-notes" aria-hidden="true">
        <span>♪</span><span>♫</span><span>✧</span><span>♪</span>
      </div>
      <div className="play-burst" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
      </div>
    </>
  );
}
