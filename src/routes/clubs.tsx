import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CONTACT_EMAIL, clubs } from "@/data/aea";
import { PageHeader } from "@/components/SiteChrome";

export const Route = createFileRoute("/clubs")({
  head: () => ({
    meta: [
      { title: "Clubs — Aerospace Employees Association" },
      {
        name: "description",
        content:
          "Browse AEA clubs by category — technical, sports, creative, outdoors and social — and contact a club to join.",
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
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(clubs.map((c) => c.category)))],
    [],
  );
  const [active, setActive] = useState("All");
  const visible = active === "All" ? clubs : clubs.filter((c) => c.category === active);

  return (
    <>
      <PageHeader
        eyebrow="Get Involved"
        title="Clubs & Interest Groups"
        intro="Every club below is run by employees, open to all, and always looking for new members. Pick a category, find something that sounds fun, and reach out."
      />
      <main className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={
                category === active
                  ? "rounded-full bg-brand-deep px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-foreground"
                  : "rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:border-brand-blue hover:text-brand-blue"
              }
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((club) => (
            <div
              key={club.name}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-deep/5 text-xl">
                  <span>{club.icon}</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {club.category}
                </span>
              </div>
              <h2 className="mb-2 text-xl font-bold">{club.name}</h2>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">{club.description}</p>
              <p className="mb-5 font-mono text-xs text-muted-foreground">Meets {club.meets}</p>
              <a
                href={`mailto:${club.contact}?subject=Joining%20${encodeURIComponent(club.name)}`}
                className="rounded-lg bg-brand-blue py-2.5 text-center text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Contact to Join
              </a>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-xl font-bold">Don't see your interest?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Starting a new club is easy — grab the charter application from the Documents page and
            email us. We'll help you get going.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=New%20club%20idea`}
            className="mt-6 inline-block rounded-lg bg-brand-deep px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Propose a Club
          </a>
        </div>
      </main>
    </>
  );
}
