import React from 'react';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
}

const Editor: React.FC<EditorProps> = ({ code, onChange }) => {
  return (
    <div className="editor-container-p5">
      <div className="editor-gutter">
        {code.split('\n').map((_, i) => (
          <div key={i} className="line-number">{i + 1}</div>
        ))}
      </div>
      <textarea
        className="CodeMirror-p5"
        data-testid="code-editor"
        aria-label="Code Editor"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder="// Write your p5.js code here..."
      />
    </div>
  );
};

export default Editor;
