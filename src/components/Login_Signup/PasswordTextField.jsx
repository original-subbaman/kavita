import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import Input from "../ui/Input";
import { Label } from "../ui/Label";

const PasswordTextField = ({ register, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="space-y-2">
      <Label htmlFor="password" className="text-foreground">
        Password
      </Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="pl-10 pr-10 bg-card border-border"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
        {error && (
          <span className="text-xs text-red-500 mt-1 block">{error}</span>
        )}
      </div>
    </div>
  );
};

export default PasswordTextField;
