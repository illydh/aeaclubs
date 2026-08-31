import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL, documents } from "@/data/aea";
import { PageHeader } from "@/components/SiteChrome";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — Aerospace Employees Association" },
      {
        name: "description",
        content:
          "AEA bylaws, club charter applications, reimbursement forms, budget summaries and board meeting minutes.",
      },
      { property: "og:title", content: "Documents — Aerospace Employees Association" },
      {
        property: "og:description",
        content: "Bylaws, forms and reference material for AEA members and club officers.",
      },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reference"
        title="Documents & Forms"
        intro="Bylaws, forms, and reference material for members and club officers. Need something that isn't here? Just ask."
      />
      <main className="mx-auto max-w-5xl px-6 py-14">
        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {documents.map((doc) => (
            <li
              key={doc.title}
              className="flex flex-col gap-3 p-6 transition-colors hover:bg-secondary/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold">{doc.title}</h2>
                  <span className="rounded-full bg-brand-deep/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-brand-deep">
                    {doc.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  Updated {doc.updated}
                </p>
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Request: ${doc.title}`)}`}
                className="shrink-0 rounded-lg border border-border px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-brand-blue hover:bg-secondary"
              >
                Request Copy
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Looking for something else? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-blue">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </main>
    </>
  );
}
