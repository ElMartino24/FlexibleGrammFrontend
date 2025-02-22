import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor(props) {
  const [editorValue, setEditorValue] = useState(props.code);

  useEffect(() => {
    setEditorValue(props.code);
  }, [props.code]);

  const handleEditorChange = (value) => {
    setEditorValue(value);
    props.setCode(value);
  };

  return (
    <div className="w-full bg-gray-800 p-4">
      <div className="flex justify-between items-center mb-4">
        <label className="text-white text-sm font-semibold">
          Choose Language:
          <select
            value={props.selectedLanguage}
            onChange={(e) => props.setSelectedLanguage(e.target.value)}
            className="ml-2 bg-gray-700 text-white p-2 rounded"
          >
            <option value="javascript">React with JSX</option>
            <option value="html">HTML with Inline CSS</option>
          </select>
        </label>
        <div>
          {props.showToast || (
            <button
              onClick={props.handlChartSave}
              className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition mr-1"
            >
              Save Chart
            </button>
          )}
          {props.showToast && (
            <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition mr-5">
              Saved!
            </button>
          )}
          <button
            onClick={props.handleCodeEditorChange}
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition"
          >
            Run Code
          </button>
        </div>
      </div>
      <Editor
        height="70vh"
        theme="vs-dark"
        language={
          props.selectedLanguage === "javascript" ? "javascript" : "html"
        }
        value={editorValue}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default CodeEditor;
