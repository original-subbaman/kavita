import { createContext } from "react";

export const PostActions = {
  hide: "hide",
  edit: "edit",
  delete: "delete",
};

export const PostActionsContext = createContext();

export const PostActionsProvider = ({ children, onPostAction }) => {
  return (
    <PostActionsContext.Provider value={{ onPostAction }}>
      {children}
    </PostActionsContext.Provider>
  );
};
