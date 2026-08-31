import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL, photos } from "@/data/aea";
import { PageHeader } from "@/components/SiteChrome";

export const Route = createFileRoute("/photos")({
  head: () => ({
    meta: [
      { title: "Photos — Aerospace Employees Association" },
      {
        name: "description",
        content: "A gallery of AEA club activities, events, and community moments across the year.",
      },
      { property: "og:title", content: "Photos — Aerospace Employees Association" },
      {
        property: "og:description",
        content: "See what AEA clubs and members have been up to.",
      },
    ],
  }),
  component: PhotosPage,
});

function PhotosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Activities & Events"
        intro="A look at what AEA clubs and members have been up to. Have photos from an event? Send them our way and we'll add them."
      />
      <main className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                width={800}
                height={600}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <figcaption className="px-5 py-4 text-sm font-medium text-muted-foreground">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Photo%20submission`}
            className="inline-block rounded-lg bg-brand-deep px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Submit Photos
          </a>
        </div>
      </main>
    </>
  );
}
