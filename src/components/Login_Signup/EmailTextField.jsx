import { Mail } from "lucide-react";
import Input from "../ui/Input";
import { Label } from "../ui/Label";

const EmailTextField = ({ register, error }) => (
  <div className="space-y-2">
    <Label htmlFor="email" className="text-foreground">
      Email
    </Label>
    <div className="relative">
      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="pl-10 bg-card border-border"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        })}
      />
    </div>
    {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
  </div>
);

export default EmailTextField;
