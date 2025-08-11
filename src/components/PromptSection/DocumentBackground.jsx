import { Node, mergeAttributes } from "@tiptap/core";

const DefaultBGColor = "#6B7280";
export const DocumentBackground = Node.create({
  name: "documentBackground",
  group: "block",
  content: "block*",
  draggable: false,
  selectable: false,

  addAttributes() {
    return {
      backgroundColor: {
        default: DefaultBGColor,
        parseHTML: (element) => element.style.backgroundColor || DefaultBGColor,
        renderHTML: (attributes) => {
          return {
            style: `background-color: ${attributes.backgroundColor}; padding: 1rem; border-radius: 8px;`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-document-background]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-document-background": "" }),
      0,
    ];
  },
});
