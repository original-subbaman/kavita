import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DecorativeLeftPanel from "./DecorativeLeftPanel";
import { Button } from "../ui/Button";

const LoginWrapper = ({
  title = "Welcome Back",
  subtitle = "Continue exploring poetry",
  children,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      <DecorativeLeftPanel />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-3">
              <span className="font-display text-2xl font-semibold text-primary">
                कविता
              </span>
            </Link>
          </div>

          {/* Back link */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="
            inline-flex items-center gap-2 text-sm text-muted-foreground 
            hover:text-foreground hover:bg-transparent mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {title}
            </h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginWrapper;
