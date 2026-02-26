import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import Input from "../ui/Input";
import { Label } from "../ui/Label";

const PasswordTextField = ({
  name = "password",
  label = "Password",
  placeholder = "Enter your password",
  register,
  error,
  validationRules = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-foreground">
        {label}
      </Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="pl-10 pr-10 bg-card border-border"
          {...register(name, {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            ...validationRules,
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
      </div>
      {error && (
        <span className="text-xs text-red-500 mt-1 block">{error}</span>
      )}
    </div>
  );
};

export default PasswordTextField;
