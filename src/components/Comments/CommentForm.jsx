import { Avatar, AvatarFallback } from "../ui/Avatar";
import { useState } from "react";
import { Button } from "../ui/Button";
import CharLimitTextArea from "./CharLimitTextArea";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
  isAuthenticated,
}) => {
  const [text, setText] = useState(initialText);
  const isTextAreaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-4  pb-6 border-b border-border"
    >
      <Avatar className="w-10 h-10">
        <AvatarFallback className="bg-secondary">Y</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <CharLimitTextArea
          text={text}
          setText={setText}
          isAuthenticated={isAuthenticated}
        />
        <Button type="submit" disabled={isTextAreaDisabled} className="w-36">
          {submitLabel}
        </Button>
        {hasCancelButton && (
          <Button
            variant="soft"
            size={"3"}
            type="submit"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
