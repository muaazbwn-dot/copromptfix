import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Plus, Search, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/explore", label: "Explore" },
  { to: "/categories", label: "Categories" },
  { to: "/upload", label: "Upload" },
] as const;

export function SiteHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");

  function search(event: React.FormEvent) {
    event.preventDefault();
    setOpen(false);
    navigate({ to: "/explore", search: { q: term || undefined, category: undefined } });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center" aria-label="PromptHell home">
          <img src={logo.url} alt="PromptHell — Discover Copy Create" className="h-9 w-auto" />
        </Link>


        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={search} className="ml-auto hidden w-64 lg:block">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search prompts..."
              aria-label="Search prompts"
              className="h-10 w-full rounded-full border border-border bg-surface pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
            />
          </label>
        </form>

        <Link
          to="/upload"
          className="ml-auto inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] lg:ml-3"
        >
          <Plus className="size-4" /> Upload Prompt
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="ml-1 inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border/70 bg-background px-4 pb-4 pt-3 md:hidden">
          <form onSubmit={search} className="mb-3">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Search prompts..."
                aria-label="Search prompts"
                className="h-11 w-full rounded-full border border-border bg-surface pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60"
              />
            </label>
          </form>
          <div className="grid gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
