import { Link, useLocation } from "react-router-dom";

const PANEL_CONTENT = {
  "/login": {
    brandName: "कविता",
    heading: ["Where mountains whisper", "and words take flight"],
    description:
      "Join a community of poets celebrating Sikkim's diverse linguistic heritage. Write in your mother tongue, discover new voices, and preserve our stories.",
    quote:
      "In Sikkim's heart, where spirits dwell, I find the peace no words can tell.",
    quoteAuthor: '— Diki Sherpa, "Morning Mist"',
  },
  "/signup": {
    brandName: "कविता",
    heading: ["Begin your journey", "as a poet today"],
    description:
      "Create an account to share your poetry with the world. Connect with fellow writers and be part of Sikkim's literary renaissance.",
    quote: "Every verse is a seed, planted in the garden of the soul.",
    quoteAuthor: "— Anonymous",
  },
  "/forgot-password": {
    brandName: "कविता",
    heading: ["Don't worry,", "we've got you covered"],
    description:
      "We'll help you regain access to your account so you can continue your poetic journey with us.",
    quote: "Even the longest night will end, and the sun will rise again.",
    quoteAuthor: "— Victor Hugo",
  },
  default: {
    brandName: "कविता",
    heading: ["Where mountains whisper", "and words take flight"],
    description:
      "Join a community of poets celebrating Sikkim's diverse linguistic heritage. Write in your mother tongue, discover new voices, and preserve our stories.",
    quote:
      "In Sikkim's heart, where spirits dwell, I find the peace no words can tell.",
    quoteAuthor: '— Diki Sherpa, "Morning Mist"',
  },
};

function DecorativeLeftPanel() {
  const { pathname } = useLocation();
  const content = PANEL_CONTENT[pathname] || PANEL_CONTENT.default;

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/30" />

      <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <span className="font-display text-3xl font-semibold">
            {content.brandName}
          </span>
        </Link>

        <h2 className="font-display text-4xl font-bold mb-6 leading-tight">
          {content.heading[0]}
          <br />
          {content.heading[1]}
        </h2>

        <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-md">
          {content.description}
        </p>

        <div className="mt-12 pt-12 border-t border-primary-foreground/20">
          <blockquote className="font-poetry text-xl italic text-primary-foreground/90">
            "{content.quote}"
          </blockquote>
          <p className="text-primary-foreground/60 text-sm mt-4">
            {content.quoteAuthor}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DecorativeLeftPanel;
