import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, container } from "@/components/SiteChrome";
import { CONTACT_EMAIL, mailto, photos } from "@/data/aea";
import { cn } from "@/lib/utils";

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
    <main className={cn(container, "pb-28 pt-29.5")}>
      <PageIntro eyebrow="The life cycle" title="Moments from our clubs.">
        Picnics, launches, star parties, and long lunch runs. Have photos from an AEA event?{" "}
        <a
          href={mailto(CONTACT_EMAIL, "Photo submission")}
          className="text-brand underline decoration-1 underline-offset-4 hover:text-brand-dark"
        >
          Send them our way
        </a>
        .
      </PageIntro>

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <li
            key={photo.src}
            className={cn(
              "group relative overflow-hidden rounded-3xl bg-brand-soft",
              photo.wide && "sm:col-span-2",
            )}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              className={cn(
                "aspect-[13/10] size-full object-cover transition-transform duration-700 group-hover:scale-105",
                // Wide photos fill whatever height the row's regular photo sets.
                photo.wide && "sm:aspect-[2/1] lg:absolute lg:inset-0 lg:aspect-auto",
              )}
            />
            <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-6 pb-5 pt-12 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {photo.caption}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
