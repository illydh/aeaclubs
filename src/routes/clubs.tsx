import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, User } from "lucide-react";
import { useState } from "react";
import { PageIntro, container } from "@/components/SiteChrome";
import { CONTACT_EMAIL, clubCategories, clubs, mailto, type ClubCategory } from "@/data/aea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/clubs")({
  head: () => ({
    meta: [
      { title: "Clubs — Aerospace Employees Association" },
      {
        name: "description",
        content:
          "Browse AEA clubs by category — social, technical, wellness and community — and reach out to join.",
      },
      { property: "og:title", content: "Clubs — Aerospace Employees Association" },
      {
        property: "og:description",
        content: "Find and join an AEA club that matches your interests.",
      },
    ],
  }),
  component: ClubsPage,
});

function ClubsPage() {
  const [active, setActive] = useState<ClubCategory | "All">("All");
  const visible = active === "All" ? clubs : clubs.filter((club) => club.category === active);

  return (
    <main className={cn(container, "pb-28 pt-29.5")}>
      <PageIntro eyebrow="The constellation" title="Every club, one click away.">
        Pick a category, find something that sounds like you, and reach out to the club contact
        directly. Everyone is welcome — beginners especially.
      </PageIntro>

      <div
        className="mt-12 flex flex-wrap gap-3"
        role="group"
        aria-label="Filter clubs by category"
      >
        {(["All", ...clubCategories] as const).map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={category === active}
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-5 py-3.25 text-xs font-medium uppercase tracking-[0.2em] transition-colors",
              category === active
                ? "border-ink bg-ink text-white"
                : "border-slate-200/70 bg-white text-slate-600 hover:border-brand/40 hover:text-brand",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="mt-14 grid gap-7.5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((club) => (
          <li
            key={club.name}
            className="flex flex-col overflow-hidden rounded-3xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10"
          >
            {club.image && (
              <img
                src={club.image}
                alt=""
                loading="lazy"
                className="aspect-[13/7] w-full object-cover"
              />
            )}
            <div className="flex flex-1 flex-col px-7 pb-7 pt-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
                {club.category}
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-ink">{club.name}</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{club.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-500">
                <li className="flex gap-2">
                  <Clock className="mt-0.5 size-4 shrink-0" aria-label="Meets" />
                  {club.schedule}
                </li>
                <li className="flex gap-2">
                  <User className="mt-0.5 size-4 shrink-0" aria-label="Contact" />
                  {club.contact}
                </li>
              </ul>
              <div className="mt-auto pt-7">
                <a
                  href={mailto(
                    club.email ?? CONTACT_EMAIL,
                    `Interested in ${club.name}`,
                    `Hi ${club.contact},\n\nI'd like to learn more about ${club.name}.\n`,
                  )}
                  className="inline-flex items-center gap-2.5 rounded-full bg-brand px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-dark"
                >
                  <Mail className="size-4" aria-hidden />
                  Connect
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-24 rounded-3xl border border-dashed border-slate-300 px-6 py-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Don't see your club?</h2>
        <p className="mt-3 text-base text-slate-600">
          We'll help you charter a new one — it only takes five interested people.
        </p>
        <a
          href={mailto(CONTACT_EMAIL, "New club request")}
          className="mt-6 inline-block rounded-full bg-brand px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-dark"
        >
          Request a new club
        </a>
      </div>
    </main>
  );
}
