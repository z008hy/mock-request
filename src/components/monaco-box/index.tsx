import MonacoEditor, { EditorConstructionOptions } from 'react-monaco-editor';
import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';

interface Props {
  option?: EditorConstructionOptions,
  value?: string,
  height: number | string,
}

const MonacoBox : React.FC<Props> = ({ option, value, height }: Props, ref) => {
  const monacoRef = useRef<MonacoEditor>(null);

  useImperativeHandle(ref, () => ({
    editorBox: monacoRef.current,
  }));

  useEffect(() => {
    if (monacoRef.current !== null && monacoRef.current.editor) {
      monacoRef.current.editor.layout();
    }
  }, [monacoRef]);

  return (
    <MonacoEditor
      ref={monacoRef}
      height={height}
      width="100%"
      language="javascript"
      theme="vs-dark"
      options={{
        selectOnLineNumbers: true,
        scrollBeyondLastLine: false,
        contextmenu: false,
        automaticLayout: true,
        scrollbar: {
          horizontal: 'hidden',
        },
        minimap: {
          enabled: false,
        },
        ...option,
      }}
      value={value}
    />
  );
};

export default forwardRef(MonacoBox);
