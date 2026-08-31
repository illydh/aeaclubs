import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT_EMAIL, clubs, events, officers, photos } from "@/data/aea";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AEA Home — Aerospace Employees Association" },
      {
        name: "description",
        content:
          "Welcome to the Aerospace Employees Association: browse clubs, upcoming events, officers and directors, documents and photos.",
      },
      { property: "og:title", content: "AEA Home — Aerospace Employees Association" },
      {
        property: "og:description",
        content: "Clubs, events, and community for employees at Aerospace.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = clubs.slice(0, 4);

  return (
    <>
      <header className="relative overflow-hidden bg-brand-deep py-24 text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight">
              Elevating your experience at <span className="text-brand-accent">Aerospace</span>.
            </h1>
            <p className="mb-8 text-lg leading-relaxed opacity-80">
              Welcome to the AEA hub. We're here to make your time at the company that much better.
              Whether you're looking to join a club, find association documents, or connect with your
              colleagues, you're in the right place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/clubs"
                className="rounded-lg bg-brand-accent px-6 py-3 text-sm font-bold text-brand-deep shadow-lg transition-all hover:opacity-90"
              >
                Explore Clubs
              </Link>
              <Link
                to="/photos"
                className="rounded-lg border border-current/20 px-6 py-3 text-sm font-bold transition-all hover:bg-brand-blue"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-16 lg:col-span-2">
            <section>
              <div className="mb-6 flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  About Us
                </span>
              </div>
              <h2 className="mb-6 text-3xl font-bold">Your Workplace Community</h2>
              <div className="max-w-none leading-relaxed text-muted-foreground">
                <p className="mb-4">
                  The Aerospace Employees Association (AEA) is a member-run organization dedicated to
                  making life at the company more connected and more fun. We charter and support the
                  clubs, organize events, and give employees an easy way to find people who share
                  their interests.
                </p>
                <p>
                  From technical interest groups to recreational sports, the AEA turns colleagues into
                  friends. Take a look around, join something new, and tell us what you'd like to see
                  next.
                </p>
              </div>
            </section>

            <section>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl font-bold">Featured Clubs</h2>
                <Link to="/clubs" className="text-sm font-bold text-brand-blue">
                  View All Clubs &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {featured.map((club) => (
                  <div
                    key={club.name}
                    className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-brand-deep/5 text-xl">
                      <span>{club.icon}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{club.name}</h3>
                    <p className="mb-6 text-sm text-muted-foreground">{club.description}</p>
                    <a
                      href={`mailto:${club.contact}`}
                      className="text-sm font-semibold text-brand-blue hover:underline"
                    >
                      Join Group
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-8 text-3xl font-bold">Recent Activities</h2>
              <div className="grid grid-cols-3 gap-4">
                {photos.slice(0, 3).map((photo) => (
                  <img
                    key={photo.src}
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                ))}
              </div>
              <Link to="/photos" className="mt-4 inline-block text-sm font-bold text-brand-blue">
                See all photos &rarr;
              </Link>
            </section>

            <section>
              <div className="mb-8 flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Who We Are
                </span>
              </div>
              <h2 className="mb-8 text-3xl font-bold">Officers &amp; Directors</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {officers.map((person) => (
                  <div
                    key={person.name}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-deep/5 font-mono text-sm font-bold text-brand-deep">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{person.name}</div>
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">
                        {person.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-10">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold">Upcoming Events</h2>
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.title} className="flex gap-4">
                    <div className="flex h-12 min-w-12 flex-col items-center justify-center rounded bg-secondary text-secondary-foreground">
                      <span className="text-[10px] font-bold uppercase">{event.month}</span>
                      <span className="text-lg font-bold leading-tight">{event.day}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">{event.title}</h3>
                      <p className="text-xs text-muted-foreground">{event.detail}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-brand-blue">
                        {event.club}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Add%20a%20club%20event`}
                className="mt-8 block w-full rounded-lg border border-border py-2 text-center text-xs font-bold text-muted-foreground hover:bg-secondary"
              >
                Submit a club event
              </a>
            </div>

            <div className="rounded-2xl bg-brand-blue p-6 text-primary-foreground shadow-lg">
              <h2 className="mb-3 text-lg font-bold">Have a suggestion?</h2>
              <p className="mb-6 text-sm opacity-90">
                We welcome your thoughts, suggestions and questions. Reach out to us at{" "}
                {CONTACT_EMAIL}.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="block w-full rounded-lg bg-card py-3 text-center text-sm font-bold text-brand-blue"
              >
                Reach Out to Us
              </a>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
