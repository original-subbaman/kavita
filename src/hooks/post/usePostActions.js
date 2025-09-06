import { useContext } from "react";
import { PostActionsContext } from "../../context/PostActionContext";
const usePostActions = () => {
  const context = useContext(PostActionsContext);
  if (!context) {
    throw new Error("usePostActions must be used within PostActionsProvider");
  }
  return context;
};

export default usePostActions;
