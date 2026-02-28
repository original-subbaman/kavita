import { Link } from "react-router-dom";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-display text-2xl font-semibold text-primary">
                कविता
              </span>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              A sanctuary for poets from the Himalayan heartland. Share your
              verses, discover new voices, and celebrate the rich linguistic
              heritage of Sikkim.
            </p>
          </div>

          {/* Languages
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Languages</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>नेपाली (Nepali)</li>
              <li>भोटिया (Bhutia)</li>
              <li>ལེབཅ (Lepcha)</li>
              <li>लिम्बु (Limbu)</li>
              <li>English</li>
            </ul>
          </div> */}

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/home"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Poems
                </Link>
              </li>
              <li>
                <Link
                  to="/posts/new"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Start Writing
                </Link>
              </li>
              <li>
                <Link
                  to="/inspiration"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Language Wall
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {year} कविता (Kavita). From Sikkim with ❤️.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
