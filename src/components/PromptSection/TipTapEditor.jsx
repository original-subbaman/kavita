import { Tooltip } from "@mui/material";
import { Button } from "@radix-ui/themes";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { CirclePicker } from "react-color";
import { useAppTheme } from "../../hooks/useAppTheme";
import {
  Bold,
  Italic,
  Strikethrough,
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import "./editor_styles.css";
import { DefaultBGColor } from "./InputAlertDialog";
import Placeholder from "@tiptap/extension-placeholder";

const ToolbarButton = ({
  onClick,
  isActive,
  disabled,
  children,
  className = "",
  toolTip,
}) => (
  <Tooltip title={toolTip ? toolTip : ""}>
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      font-primary font-bold 
      ${isActive ? "text-black" : "text-gray-500"}
      ${disabled ? " cursor-not-allowed" : ""}
      ${className}
    `}
    >
      {children}
    </button>
  </Tooltip>
);

function MenuBar({ editor, bgColor, setBgColor }) {
  const ICON_SIZE = 18;
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
      icon: <Heading1 size={ICON_SIZE} />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editorState.isHeading1,
      toolTip: "Heading 1",
    },
    {
      icon: <Heading2 size={ICON_SIZE} />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editorState.isHeading2,
      toolTip: "Heading 2",
    },
    {
      icon: <Heading3 size={ICON_SIZE} />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editorState.isHeading3,
      toolTip: "Heading 3",
    },
    {
      icon: <Bold size={ICON_SIZE} />,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editorState.isBold,
      disabled: !editorState.canBold,
      toolTip: "Bold",
    },
    {
      icon: <Italic size={ICON_SIZE} />,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editorState.isItalic,
      disabled: !editorState.canItalic,
      toolTip: "Italic",
    },
    {
      icon: <Strikethrough size={ICON_SIZE} />,
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editorState.isStrike,
      disabled: !editorState.canStrike,
      toolTip: "Strike through",
    },

    {
      icon: <Undo2 size={ICON_SIZE} />,
      action: () => editor.chain().focus().undo().run(),
      disabled: !editorState.canUndo,
      toolTip: "Undo",
    },
    {
      icon: <Redo2 size={ICON_SIZE} />,
      action: () => editor.chain().focus().redo().run(),
      disabled: !editorState.canRedo,
      toolTip: "Redo",
    },
  ];

  return (
    <div
      className={`flex flex-wrap items-center 
    gap-3 px-2 py-2 bg-slate-50
    text-black rounded-sm border`}
    >
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
            {btn.icon}
          </ToolbarButton>
        );
      })}
    </div>
  );
}

function TipTapEditor({
  initialContent,
  initialTitle,
  onContentChange,
  onTitleChange,
  bgColor,
  setBgColor,
}) {
  const contentEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Enter content here...",
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        // style: `background-color: ${bgColor}; border-radius: 0.25rem;`,
        style: `background-color: #fff; border-radius: 0.375rem;`,
        class: "font-poetry p-4 mt-2 border rounded-md w-full min-h-[25rem]",
      },
    },
    onUpdate({ editor }) {
      onContentChange(editor.getHTML());
    },
  });
  const titleEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Enter title here...",
      }),
    ],
    content: initialTitle,
    editorProps: {
      attributes: {
        // style: `background-color: ${bgColor}; border-radius: 0.25rem;`,
        style: `border-radius: 0.375rem;`,
        class: "p-4 mt-2 h-12 border w-full",
      },
    },
    onUpdate({ editor }) {
      onTitleChange(editor.getHTML());
    },
  });

  return (
    <div className="mx-2 md:mx-0">
      {/* <MenuBar editor={contentEditor} bgColor={bgColor} /> */}
      {/* <EditorContent editor={titleEditor} /> */}
      <EditorContent editor={contentEditor} />
    </div>
  );
}

export default TipTapEditor;
