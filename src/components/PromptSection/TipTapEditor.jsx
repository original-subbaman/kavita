import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import "./editor_styles.css";
import { Tooltip } from "@mui/material";
import { PaintBucket, X, XIcon } from "lucide-react";
import { CirclePicker, SketchPicker } from "react-color";
import { Button } from "@radix-ui/themes";

const ToolbarButton = ({
  onClick,
  isActive,
  disabled,
  children,
  className = "",
  toolTip,
}) => (
  <Tooltip title={toolTip ? toolTip : ""}>
    <span>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
      font-primary text-lg font-bold px-1 
      ${isActive ? "bg-gray-500 text-white rounded" : ""}
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      ${className}
    `}
      >
        {children}
      </button>
    </span>
  </Tooltip>
);

function MenuBar({ editor, bgColor, setBgColor }) {
  const [showPicker, setShowPicker] = useState(false);
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  const buttons = [
    {
      label: "B",
      action: () => editor.chain().focus().toggleBold().run(),
      active: editorState.isBold,
      disabled: !editorState.canBold,
      toolTip: "Bold",
    },
    {
      label: "I",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editorState.isItalic,
      disabled: !editorState.canItalic,
      className: "italic font-serif",
      toolTip: "Italic",
    },
    {
      label: "S",
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editorState.isStrike,
      disabled: !editorState.canStrike,
      className: "line-through",
      toolTip: "Strike through",
    },
    {
      label: "H1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editorState.isHeading1,
      toolTip: "Heading 1",
    },
    {
      label: "H2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editorState.isHeading2,
      toolTip: "Heading 2",
    },
    {
      label: "H5",
      action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      active: editorState.isHeading5,
      toolTip: "Heading 5",
    },
    {
      label: "↺",
      action: () => editor.chain().focus().undo().run(),
      disabled: !editorState.canUndo,
      toolTip: "Undo",
    },
    {
      label: "↻",
      action: () => editor.chain().focus().redo().run(),
      disabled: !editorState.canRedo,
      toolTip: "Redo",
    },
  ];

  function toggleCirclePicker() {
    setShowPicker((prev) => !prev);
  }
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 p-2 bg-gray-200 text-black rounded-t-sm h-10">
        {buttons.map((btn, idx) => {
          return (
            <ToolbarButton
              key={idx}
              onClick={btn.action}
              isActive={btn.active}
              disabled={btn.disabled}
              className={btn.className}
              toolTip={btn?.toolTip}
            >
              {btn.label}
            </ToolbarButton>
          );
        })}

        <ToolbarButton onClick={toggleCirclePicker} toolTip="Background Color">
          <PaintBucket />
        </ToolbarButton>
      </div>
      {showPicker && (
        <div className="flex items-center bg-gray-800 w-full p-4 z-[100]">
          <CirclePicker
            color={bgColor}
            colors={[
              "#6B7280",
              "#77172e",
              "#1e3a8a",
              "#065f46",
              "#9c27b0",
              "#f59e0b",
              "#264d3b",
              "#472e5b",
            ]}
            width="100%"
            onChangeComplete={(color) => setBgColor(color.hex)}
          />
          <Button
            variant="ghost"
            onClick={toggleCirclePicker}
            className="rounded-full w-7 h-7 p-0"
          >
            <XIcon size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}

const DefaultBGColor = "#6B7280";

function TipTapEditor({ initial, onChange }) {
  const [bgColor, setBgColor] = useState(DefaultBGColor);
  const editor = useEditor({
    extensions: [StarterKit],
    content: initial,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <MenuBar editor={editor} bgColor={bgColor} setBgColor={setBgColor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default TipTapEditor;
