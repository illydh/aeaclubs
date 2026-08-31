import { Link } from "@tanstack/react-router";
import logo from "@/assets/aea-logo.png.asset.json";
import { CONTACT_EMAIL } from "@/data/aea";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/clubs", label: "Clubs" },
  { to: "/documents", label: "Documents" },
  { to: "/photos", label: "Photos" },
] as const;

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt="Aerospace Employees Association logo" className="h-10 w-auto" />
          <span className="hidden text-sm font-semibold uppercase tracking-wide text-brand-deep sm:block">
            Aerospace Employees Association
          </span>
        </Link>
        <div className="flex items-center gap-5 text-sm font-medium text-muted-foreground sm:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-brand-blue border-b-2 border-brand-blue" }}
              className="pb-1 transition-colors hover:text-brand-blue"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img src={logo.url} alt="" className="h-7 w-auto" />
          <span className="text-xs font-medium uppercase text-muted-foreground">
            © {new Date().getFullYear()} Aerospace Employees Association
          </span>
        </div>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <Link to="/documents" className="hover:text-brand-blue">
            Bylaws
          </Link>
          <Link to="/clubs" className="hover:text-brand-blue">
            Clubs
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-blue">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <header className="border-b border-border bg-brand-deep py-16 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-accent">{eyebrow}</span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed opacity-80">{intro}</p>
      </div>
    </header>
  );
}
