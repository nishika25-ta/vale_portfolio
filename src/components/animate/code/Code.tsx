import { createContext, useContext, type ReactNode } from 'react';

type CodeContextValue = {
  code: string;
};

const CodeContext = createContext<CodeContextValue | null>(null);

export function useCode(): CodeContextValue {
  const ctx = useContext(CodeContext);
  if (!ctx) {
    throw new Error('Code subcomponents must be used inside <Code>');
  }
  return ctx;
}

type CodeProps = {
  children: ReactNode;
  className?: string;
  code: string;
};

export function Code({ children, className, code }: CodeProps) {
  return (
    <CodeContext.Provider value={{ code }}>
      <div className={className}>{children}</div>
    </CodeContext.Provider>
  );
}
