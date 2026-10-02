import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { EventCalendar } from "@/components/EventCalendar";
import { RegisterEventDialog } from "@/components/RegisterEventDialog";
import { Eyebrow, container } from "@/components/SiteChrome";
import {
  CONTACT_EMAIL,
  directors,
  heroImage,
  mailto,
  officers,
  type BoardMember,
} from "@/data/aea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AEA Home — Aerospace Employees Association" },
      {
        name: "description",
        content:
          "Welcome to the Aerospace Employees Association: browse clubs, see upcoming events, and meet the officers and directors.",
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
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand text-white">
        <img
          src={heroImage}
          alt=""
          width={800}
          height={600}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-brand/75" />
        <div className={cn(container, "pb-28 pt-24 md:pb-34.5 md:pt-33.5")}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/75">Welcome</p>
          <h1 className="mt-5.5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl sm:leading-none">
            We're here to make your time at the company that much better.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.7] text-white/90">
            The Aerospace Employees Association charters and supports the clubs across our sites. We
            host the events that bring everyone together outside of the day-to-day work. Take a look
            around, join something that sounds fun, and if you don't see what you're looking for,
            tell us and we'll help you start it.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/clubs"
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand transition-colors hover:bg-white/90"
            >
              Browse the clubs
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="#calendar"
              className="rounded-full border border-white/40 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10"
            >
              Upcoming events
            </a>
          </div>
        </div>
      </section>

      <section id="calendar" className="scroll-mt-20 py-26">
        <div className={cn(container, "grid items-start gap-12 lg:grid-cols-3 lg:gap-20")}>
          <div>
            <Eyebrow>Calendar</Eyebrow>
            <h2 className={cn("mt-5.5", sectionTitle)}>What's coming up</h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              Club events, meetings, and association-wide gatherings, all in one view. Have
              something to add? Register it and we'll post it here for everyone.
            </p>
            <RegisterEventDialog className="mt-7" />
          </div>
          <div className="min-w-0 lg:col-span-2">
            <EventCalendar />
          </div>
        </div>
      </section>

      <section className="bg-white pb-28 pt-24 md:pb-36 md:pt-28">
        <div className={container}>
          <Eyebrow>Leadership</Eyebrow>
          <h2 className={cn("mt-5.5", sectionTitle)}>Officers &amp; Directors</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
            Your volunteer board — all employees, all happy to talk about clubs, events, or how to
            get involved.
          </p>

          <BoardGrid members={officers} className="mt-14" />

          <h3 className="mt-21 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            Directors
          </h3>
          <BoardGrid members={directors} className="mt-9" />
        </div>
      </section>
    </>
  );
}

const sectionTitle = "text-4xl font-bold leading-tight tracking-tight text-ink md:text-[2.5rem]";

function BoardGrid({ members, className }: { members: BoardMember[]; className?: string }) {
  return (
    <ul className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {members.map((person) => (
        <li
          key={person.name}
          className="flex flex-col rounded-3xl border border-slate-200/60 bg-white px-7 pb-7.5 pt-7.5"
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-base font-semibold text-ink">
            {person.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </div>
          <h4 className="mt-5 text-lg font-semibold tracking-tight text-ink">{person.name}</h4>
          <p className="mt-1.5 text-xs font-medium uppercase leading-5 tracking-[0.2em] text-brand">
            {person.role}
          </p>
          <blockquote className="mt-4 text-base italic leading-relaxed text-slate-600">
            “{person.quote}”
          </blockquote>
          <a
            href={mailto(CONTACT_EMAIL, `For ${person.name}`)}
            className="mt-6 inline-flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-brand"
          >
            <Mail className="size-4" aria-hidden />
            {CONTACT_EMAIL}
          </a>
        </li>
      ))}
    </ul>
  );
}
