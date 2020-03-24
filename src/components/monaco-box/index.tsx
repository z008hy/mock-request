import MonacoEditor, { EditorConstructionOptions } from 'react-monaco-editor';
import React, { forwardRef, useRef, useImperativeHandle } from 'react';

interface Props {
  option?: EditorConstructionOptions,
  value?: string,
  height?: number | string,
}

const MonacoBox : React.FC<Props> = ({ option, value, height }: Props, ref) => {
  const monacoRef = useRef<MonacoEditor>(null);

  useImperativeHandle(ref, () => ({
    editorBox: monacoRef.current,
  }));

  return (
    <MonacoEditor
      ref={monacoRef}
      height={height}
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
