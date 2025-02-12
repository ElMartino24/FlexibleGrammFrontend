import Editor from '@monaco-editor/react';
import React from 'react';

function CodeEditor(props) {

  const handleEditorChange = (value) => {
    props.setCode(value);
  };

  const handleChange = (e) => {
    props.setSelectedLanguage(e.target.value);
  };

  return (
      <div className="w-full bg-gray-800 p-4">
        <div className="flex justify-between items-center mb-4">
          <label className="text-white text-sm font-semibold">
            Choose Language:
            <select 
              value={props.selectedLanguage} 
              onChange={handleChange} 
              className="ml-2 bg-gray-700 text-white p-2 rounded">
              <option value="javascript">React with JSX</option>
              <option value="html">HTML with Inline CSS</option>
            </select>
          </label>
          <button 
            onClick={props.handleCodeEditorChange}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition">
              Run Code
          </button>
        </div>
        <Editor
          height="70vh"
          theme="vs-dark"
          language={props.selectedLanguage === "javascript" ? "javascript" : "html"}
          value={props.code}
          onChange={handleEditorChange}
        />
      </div>
  );
}

export default CodeEditor;