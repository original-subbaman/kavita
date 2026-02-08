import { Link } from "react-router-dom";

function DecorativeLeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/30" />

      <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <span className="font-display text-3xl font-semibold">कविता</span>
        </Link>

        <h2 className="font-display text-4xl font-bold mb-6 leading-tight">
          Where mountains whisper
          <br />
          and words take flight
        </h2>

        <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-md">
          Join a community of poets celebrating Sikkim's diverse linguistic
          heritage. Write in your mother tongue, discover new voices, and
          preserve our stories.
        </p>

        <div className="mt-12 pt-12 border-t border-primary-foreground/20">
          <blockquote className="font-poetry text-xl italic text-primary-foreground/90">
            "In Sikkim's heart, where spirits dwell,
            <br />I find the peace no words can tell."
          </blockquote>
          <p className="text-primary-foreground/60 text-sm mt-4">
            — Diki Sherpa, "Morning Mist"
          </p>
        </div>
      </div>
    </div>
  );
}

export default DecorativeLeftPanel;
