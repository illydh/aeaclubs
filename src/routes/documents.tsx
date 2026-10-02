import { createFileRoute } from "@tanstack/react-router";
import { FileText, Search } from "lucide-react";
import { useState } from "react";
import { PageIntro, container } from "@/components/SiteChrome";
import { CONTACT_EMAIL, documents, mailto } from "@/data/aea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — Aerospace Employees Association" },
      {
        name: "description",
        content: "AEA bylaws, club forms, board meeting minutes and guides for club leaders.",
      },
      { property: "og:title", content: "Documents — Aerospace Employees Association" },
      {
        property: "og:description",
        content: "Bylaws, forms and reference material for AEA members and club leaders.",
      },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = needle
    ? documents.filter((doc) =>
        [doc.title, doc.description, doc.category].some((text) =>
          text.toLowerCase().includes(needle),
        ),
      )
    : documents;

  return (
    <main className={cn(container, "pb-28 pt-29.5")}>
      <div className="mx-auto max-w-5xl">
        <PageIntro eyebrow="The archive" title="Documents & forms">
          Bylaws, club forms, meeting minutes, and guides — all in one place.
        </PageIntro>

        <label className="relative mt-12 block">
          <span className="sr-only">Search documents</span>
          <Search
            className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search documents..."
            className="w-full rounded-full border border-slate-200/70 bg-white py-4 pl-14 pr-6 text-lg text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>

        {visible.length > 0 ? (
          <ul className="mt-10">
            {visible.map((doc) => (
              <li
                key={doc.title}
                className="flex flex-col gap-4 border-b border-slate-200/70 py-7.5 sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="flex size-12 shrink-0 items-center justify-center self-start rounded-xl bg-brand-soft text-ink">
                  <FileText className="size-5" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 className="text-lg font-semibold tracking-tight text-ink">{doc.title}</h2>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                      {doc.category}
                    </span>
                  </div>
                  <p className="mt-2 text-base text-slate-600">{doc.description}</p>
                  <p className="mt-2 text-sm text-slate-400">Updated {doc.updated}</p>
                </div>
                <a
                  href={mailto(CONTACT_EMAIL, `Request: ${doc.title}`)}
                  className="shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-brand"
                >
                  Request copy
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-16 text-center text-base text-slate-500">
            No documents match “{query.trim()}”. Need something else? Email{" "}
            <a href={mailto(CONTACT_EMAIL)} className="font-medium text-brand underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        )}
      </div>
    </main>
  );
}
