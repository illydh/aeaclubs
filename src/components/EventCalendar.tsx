import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { events, type AeaEvent } from "@/data/aea";
import { cn } from "@/lib/utils";

type View = "month" | "week" | "day";

const views: { id: View; label: string }[] = [
  { id: "month", label: "Month" },
  { id: "week", label: "Week" },
  { id: "day", label: "Day" },
];

// The server doesn't know the visitor's date, so the first render (and the prerendered HTML)
// uses a fixed date. After hydration the calendar moves to today.
const INITIAL_DATE = parseISO(events[0]?.date ?? "2026-01-01");

const eventsByDay = new Map<string, AeaEvent[]>();
for (const event of [...events].sort((a, b) => a.start.localeCompare(b.start))) {
  eventsByDay.set(event.date, [...(eventsByDay.get(event.date) ?? []), event]);
}

function eventsOn(day: Date) {
  return eventsByDay.get(format(day, "yyyy-MM-dd")) ?? [];
}

function formatTime(time: string) {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return format(new Date(2000, 0, 1, hours, minutes), "h:mm a");
}

function formatRange(event: AeaEvent) {
  return event.end
    ? `${formatTime(event.start)} – ${formatTime(event.end)}`
    : formatTime(event.start);
}

function title(view: View, cursor: Date) {
  if (view === "month") return format(cursor, "MMMM yyyy");
  if (view === "day") return format(cursor, "EEEE, MMM d, yyyy");
  const start = startOfWeek(cursor);
  const end = endOfWeek(cursor);
  return `${format(start, "MMM d")} – ${format(end, isSameMonth(start, end) ? "d" : "MMM d")}, ${format(end, "yyyy")}`;
}

export function EventCalendar() {
  const [view, setView] = useState<View>("month");
  const [cursor, setCursor] = useState(INITIAL_DATE);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    const now = startOfToday();
    setToday(now);
    setCursor(now);
  }, []);

  const step = (direction: 1 | -1) =>
    setCursor((date) =>
      view === "month"
        ? addMonths(date, direction)
        : view === "week"
          ? addWeeks(date, direction)
          : addDays(date, direction),
    );

  const openDay = (day: Date) => {
    setCursor(day);
    setView("day");
  };

  const isToday = (day: Date) => today !== null && isSameDay(day, today);

  return (
    <div className="min-w-0 rounded-3xl bg-white p-4 shadow-sm shadow-slate-900/[0.03] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl" aria-live="polite">
          {title(view, cursor)}
        </h3>
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <div
            role="group"
            aria-label="Calendar view"
            className="flex rounded-full bg-slate-100 p-1"
          >
            {views.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={view === option.id}
                onClick={() => setView(option.id)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  view === option.id
                    ? "bg-white text-brand shadow-sm shadow-slate-900/10"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setCursor(today ?? startOfToday())}
              className="rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-700 transition-colors hover:bg-slate-100"
            >
              Today
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={`Previous ${view}`}
                className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={`Next ${view}`}
                className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {view === "month" && <MonthView cursor={cursor} isToday={isToday} onOpenDay={openDay} />}
      {view === "week" && <WeekView cursor={cursor} isToday={isToday} onOpenDay={openDay} />}
      {view === "day" && <DayView cursor={cursor} />}
    </div>
  );
}

type GridProps = {
  cursor: Date;
  isToday: (day: Date) => boolean;
  onOpenDay: (day: Date) => void;
};

function WeekdayLabels({ days }: { days: Date[] }) {
  return (
    <div className="mt-7 grid grid-cols-7 gap-1.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-400 sm:gap-2">
      {days.map((day) => (
        <div key={day.toISOString()}>
          <span className="sm:hidden">{format(day, "EEEEE")}</span>
          <span className="hidden sm:inline">{format(day, "EEE")}</span>
        </div>
      ))}
    </div>
  );
}

function MonthView({ cursor, isToday, onOpenDay }: GridProps) {
  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(cursor)),
        end: endOfWeek(endOfMonth(cursor)),
      }),
    [cursor],
  );

  return (
    <>
      <WeekdayLabels days={days.slice(0, 7)} />
      <div className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2">
        {days.map((day) => {
          const inMonth = isSameMonth(day, cursor);
          const dayEvents = eventsOn(day);
          const today = isToday(day);
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onOpenDay(day)}
              aria-label={`${format(day, "EEEE, MMMM d")}${
                dayEvents.length
                  ? `, ${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}`
                  : ""
              }`}
              className={cn(
                "flex min-h-14 min-w-0 flex-col items-start rounded-xl border p-1.5 text-left transition-colors sm:min-h-24 sm:p-2",
                inMonth
                  ? "border-slate-200/70 bg-white hover:border-brand/40"
                  : "border-transparent bg-slate-50 hover:border-slate-200",
                today && "border-brand/45 ring-1 ring-brand/45 hover:border-brand/45",
              )}
            >
              <span
                className={cn(
                  "text-[13px] font-medium leading-5",
                  inMonth ? "text-slate-700" : "text-slate-300",
                  today &&
                    "flex size-6.5 items-center justify-center rounded-full bg-brand text-white",
                )}
              >
                {format(day, "d")}
              </span>
              {dayEvents.length > 0 && (
                <>
                  <span className="mt-1.5 flex gap-1 sm:hidden" aria-hidden>
                    {dayEvents.slice(0, 3).map((event) => (
                      <span key={event.id} className="size-1.5 rounded-full bg-brand" />
                    ))}
                  </span>
                  <span className="mt-1 hidden w-full space-y-1 sm:block">
                    {dayEvents.slice(0, 2).map((event) => (
                      <span
                        key={event.id}
                        title={`${formatTime(event.start)} ${event.title}`}
                        className={cn(
                          "block truncate rounded-md bg-brand-tint px-1.5 py-0.5 text-xs font-medium",
                          inMonth ? "text-brand" : "text-brand/50",
                        )}
                      >
                        {event.title}
                      </span>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="block px-1.5 text-[11px] font-medium text-slate-500">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

function WeekView({ cursor, isToday, onOpenDay }: GridProps) {
  const days = useMemo(
    () => eachDayOfInterval({ start: startOfWeek(cursor), end: endOfWeek(cursor) }),
    [cursor],
  );

  return (
    <div className="mt-7 grid gap-2 sm:grid-cols-7">
      {days.map((day) => {
        const dayEvents = eventsOn(day);
        const today = isToday(day);
        return (
          <div
            key={day.toISOString()}
            className={cn(
              "flex min-w-0 flex-col rounded-xl border border-slate-200/70 p-2.5 sm:min-h-80",
              today && "border-brand/45 ring-1 ring-brand/45",
            )}
          >
            <button
              type="button"
              onClick={() => onOpenDay(day)}
              aria-label={format(day, "EEEE, MMMM d")}
              className="flex items-center gap-2 text-left sm:flex-col sm:items-start sm:gap-1"
            >
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                {format(day, "EEE")}
              </span>
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-sm font-semibold text-ink sm:-ml-1",
                  today && "bg-brand text-white",
                )}
              >
                {format(day, "d")}
              </span>
            </button>
            {dayEvents.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {dayEvents.map((event) => (
                  <li key={event.id}>
                    <button
                      type="button"
                      onClick={() => onOpenDay(day)}
                      className="w-full rounded-lg bg-brand-tint p-2 text-left transition-colors hover:bg-brand-soft"
                    >
                      <span className="block text-[11px] font-semibold text-brand">
                        {formatTime(event.start)}
                      </span>
                      <span className="mt-0.5 block text-xs font-semibold leading-snug text-ink">
                        {event.title}
                      </span>
                      <span className="mt-1 block text-[11px] leading-snug text-slate-500">
                        {event.location}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-slate-400 sm:hidden">No events</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DayView({ cursor }: { cursor: Date }) {
  const dayEvents = eventsOn(cursor);

  if (dayEvents.length === 0) {
    return (
      <div className="mt-7 flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 px-6 text-center">
        <p className="text-base font-semibold text-ink">Nothing scheduled</p>
        <p className="mt-1 max-w-xs text-sm text-slate-500">
          Try another day, or register an event and we'll add it to the calendar.
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-7 space-y-3">
      {dayEvents.map((event) => (
        <li
          key={event.id}
          className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 p-5 sm:flex-row sm:gap-6"
        >
          <p className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-brand sm:w-44 sm:items-start">
            <Clock className="size-4 sm:mt-0.5" aria-hidden />
            {formatRange(event)}
          </p>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
              {event.club}
            </p>
            <h4 className="mt-1.5 text-lg font-semibold text-ink">{event.title}</h4>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="size-4 shrink-0" aria-hidden />
              {event.location}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{event.details}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
