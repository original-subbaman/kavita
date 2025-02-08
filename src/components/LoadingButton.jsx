import React from "react";
import { Button } from "@radix-ui/themes";
import { Loader2 } from "lucide-react";
function LoadingButton({ type, loading, onClick, children, ...props }) {
  return (
    <Button disabled={loading} onClick={onClick} type={type} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}

export default LoadingButton;
