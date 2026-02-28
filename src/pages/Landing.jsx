import {
  ArrowRight,
  BookOpen,
  Globe,
  PenLine,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const LandingPage = () => {
  const languages = [
    { name: "नेपाली", english: "Nepali" },
    { name: "भोटिया", english: "Bhutia" },
    { name: "ལེབཅ", english: "Lepcha" },
    { name: "लिम्बु", english: "Limbu" },
    { name: "English", english: "English" },
  ];

  const features = [
    {
      icon: PenLine,
      title: "Write & Publish",
      description:
        "Compose your verses in any language. Our elegant editor respects your words.",
    },
    {
      icon: BookOpen,
      title: "Discover Poetry",
      description:
        "Explore poems from across Sikkim's diverse linguistic landscape.",
    },
    {
      icon: Users,
      title: "Connect with Poets",
      description:
        "Build community with fellow writers who share your passion for words.",
    },
    {
      icon: Sparkles,
      title: "Language Wall",
      description:
        "Save your favorite lines and build a personal collection of beauty.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />

        <div className="container mx-auto px-4 py-20 md:py-40 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-secondary-foreground mb-6 animate-fade-in">
              <Globe className="w-4 h-4 text-primary" />
              <span>Celebrating Sikkim's literary heritage</span>
            </div>

            {/* Main heading */}
            <h1
              className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Where Every Voice{" "}
              <span className="text-primary">Finds Its Verse</span>
            </h1>

            {/* Subheading */}
            <p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              कविता is a sanctuary for poets from the Himalayan heartland. Share
              your poetry in Nepali, Bhutia, Lepcha, Limbu, or English—and
              discover the beauty of multilingual verse.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Link to="/posts/new">
                <Button
                  size="lg"
                  className="gap-2 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  Start Writing
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/home">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 w-full sm:w-auto border-border hover:bg-secondary"
                >
                  <BookOpen className="w-4 h-4" />
                  Explore Poems
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mountain silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-muted/30 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              A Space for Every Poet
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to write, share, and celebrate poetry from
              Sikkim's rich cultural tapestry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Poetry Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Voices from the Mountains
              </h2>
            </div>

            {/* Featured poem */}
            <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-soft">
              <blockquote className="font-poetry text-2xl md:text-3xl text-foreground leading-relaxed text-center italic mb-6">
                "हिमालको छायामा बस्छु म,
                <br />
                सपना बुन्छु, आशा रोप्छु,
                <br />
                चराको गीत सुन्छु बिहान..."
              </blockquote>
              <div className="text-center">
                <p className="text-muted-foreground">
                  — From "हिमालको छायामा" by Indra Hang
                </p>
                <Link to="/home" className="inline-block mt-4">
                  <Button variant="ghost" className="gap-2 text-primary">
                    Discover More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Share Your Story?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join poets from across Sikkim in celebrating the beauty of language
            and verse.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 bg-card text-foreground hover:bg-card/90"
            >
              Create Your Account
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
