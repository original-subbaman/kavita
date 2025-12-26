import React from "react";
import { Button } from "@radix-ui/themes";
import { Loader2 } from "lucide-react";
function LoadingButton({
  type,
  loading,
  onClick,
  className,
  children,
  ...props
}) {
  console.log("🚀 ~ LoadingButton ~ className:", className);
  return (
    <Button
      disabled={loading}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}

export default LoadingButton;
