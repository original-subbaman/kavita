import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./EditorStyles.css";
const QuillEditor = ({ value, onChange }) => {
  const toolbarOptions = [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ header: 1 }, { header: 2 }],
  ];
  return (
    <ReactQuill
      modules={{ toolbar: toolbarOptions }}
      value={value}
      onChange={onChange}
    />
  );
};

export default QuillEditor;
