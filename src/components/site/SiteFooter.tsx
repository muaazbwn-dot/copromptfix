import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-gradient-brand">Promptify</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            A free library of AI image prompts. Browse the image, copy the prompt, create
            something of your own.
          </p>
        </div>
        <nav className="grid gap-2 text-sm text-muted-foreground">
          <Link to="/explore" className="hover:text-foreground">
            Explore prompts
          </Link>
          <Link to="/categories" className="hover:text-foreground">
            Categories
          </Link>
          <Link to="/upload" className="hover:text-foreground">
            Upload a prompt
          </Link>
        </nav>
        <nav className="grid gap-2 text-sm text-muted-foreground">
          <Link to="/about" className="hover:text-foreground">
            About
          </Link>
          <Link to="/contact" className="hover:text-foreground">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-foreground">
            Terms of Service
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/70 px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Promptify. All prompts belong to their creators.
      </div>
    </footer>
  );
}
