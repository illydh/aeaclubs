import { Link } from "@tanstack/react-router";
import { Mail, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import logo from "@/assets/aea-logo.png";
import { CONTACT_EMAIL, mailto } from "@/data/aea";
import { cn } from "@/lib/utils";

/** Page-width wrapper shared by the header, footer and every section. */
export const container = "mx-auto w-full max-w-[1360px] px-6 lg:px-10";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/clubs", label: "Clubs" },
  { to: "/documents", label: "Documents" },
  { to: "/photos", label: "Photos" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand text-white">
      <div className={cn(container, "flex h-20.25 items-center justify-between gap-6")}>
        <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
          <img
            src={logo}
            alt="Aerospace Employees Association"
            width={259}
            height={83}
            className="h-10 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-white" }}
              inactiveProps={{ className: "text-white/80" }}
              className="text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={mailto(CONTACT_EMAIL)}
            className="rounded-full bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-brand transition-colors hover:bg-white/90"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 rounded-full p-2 text-white md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-white/15 md:hidden">
          <div className={cn(container, "flex flex-col gap-1 py-4")}>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-white" }}
                inactiveProps={{ className: "text-white/70" }}
                className="py-2 text-sm font-medium uppercase tracking-[0.2em]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={mailto(CONTACT_EMAIL)}
              className="mt-3 self-start rounded-full bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-brand"
            >
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-brand text-white">
      <div className={cn(container, "grid gap-12 pb-16 pt-17 md:grid-cols-3")}>
        <div>
          <img
            src={logo}
            alt="Aerospace Employees Association"
            width={259}
            height={83}
            className="h-10 w-auto"
          />
        </div>
        <div>
          <FooterHeading>Explore</FooterHeading>
          <ul className="mt-4 space-y-3">
            {navItems.slice(1).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-white/90 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <FooterHeading>Get in touch</FooterHeading>
          <a
            href={mailto(CONTACT_EMAIL)}
            className="mt-4 inline-flex items-center gap-2.5 text-white/90 transition-colors hover:text-white"
          >
            <Mail className="size-4.5" aria-hidden />
            {CONTACT_EMAIL}
          </a>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
            Thoughts, suggestions, or questions? We'd love to hear from you!
          </p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className={cn(container, "py-6 text-center text-sm text-white/60")}>
          © {new Date().getFullYear()} Aerospace Employees Association
        </p>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">{children}</h2>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-medium uppercase tracking-[0.2em] text-brand", className)}>
      {children}
    </p>
  );
}

/** Eyebrow, large title and intro paragraph at the top of the Clubs, Documents and Photos pages. */
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <header>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-5.5 text-5xl font-bold tracking-tight text-ink md:text-6xl">{title}</h1>
      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-600">{children}</p>
    </header>
  );
}
