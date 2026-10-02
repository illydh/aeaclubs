import { CalendarPlus } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CONTACT_EMAIL, clubs, mailto } from "@/data/aea";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

/**
 * There's no backend, so "registering" an event opens a pre-filled email to AEA,
 * who add it to the calendar in src/data/aea.ts.
 */
export function RegisterEventDialog({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const time = [field("start"), field("end")].filter(Boolean).join(" – ");
    const body = [
      `Event: ${field("title")}`,
      `Club: ${field("club")}`,
      `Date: ${field("date")}`,
      time && `Time: ${time}`,
      field("location") && `Location: ${field("location")}`,
      field("details") && `\nDetails:\n${field("details")}`,
      `\nSubmitted by: ${field("name")}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = mailto(CONTACT_EMAIL, `Event registration: ${field("title")}`, body);
    setSent(true);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setSent(false);
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-dark",
            className,
          )}
        >
          <CalendarPlus className="size-4" aria-hidden />
          Register an event
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-0 bg-white p-7 sm:max-w-lg sm:rounded-3xl">
        {sent ? (
          <div className="py-4 text-center">
            <DialogTitle className="text-2xl font-bold text-ink">Almost done</DialogTitle>
            <DialogDescription className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-slate-600">
              Your email app should open with the event details filled in. Send it and we'll add the
              event to the calendar. If nothing opened, email{" "}
              <a href={mailto(CONTACT_EMAIL)} className="font-medium text-brand underline">
                {CONTACT_EMAIL}
              </a>
              .
            </DialogDescription>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-8 rounded-full bg-brand px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-brand-dark"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogTitle className="text-2xl font-bold text-ink">Register an event</DialogTitle>
            <DialogDescription className="mt-2 text-base leading-relaxed text-slate-600">
              Tell us what's happening. We'll add it to the calendar for everyone.
            </DialogDescription>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Event name" className="sm:col-span-2">
                <input name="title" required className={inputClass} placeholder="Fall Food Drive" />
              </Field>
              <Field label="Club" className="sm:col-span-2">
                <input
                  name="club"
                  required
                  list="register-event-clubs"
                  className={inputClass}
                  placeholder="Which club is hosting?"
                />
                <datalist id="register-event-clubs">
                  <option value="AEA" />
                  {clubs.map((club) => (
                    <option key={club.name} value={club.name} />
                  ))}
                </datalist>
              </Field>
              <Field label="Date" className="sm:col-span-2">
                <input name="date" type="date" required className={inputClass} />
              </Field>
              <Field label="Starts">
                <input name="start" type="time" className={inputClass} />
              </Field>
              <Field label="Ends">
                <input name="end" type="time" className={inputClass} />
              </Field>
              <Field label="Location" className="sm:col-span-2">
                <input name="location" className={inputClass} placeholder="Building 120 Lobby" />
              </Field>
              <Field label="Details" className="sm:col-span-2">
                <textarea
                  name="details"
                  rows={3}
                  className={inputClass}
                  placeholder="What should people know or bring?"
                />
              </Field>
              <Field label="Your name" className="sm:col-span-2">
                <input name="name" required className={inputClass} autoComplete="name" />
              </Field>
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-full bg-brand px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-dark"
            >
              Send to AEA
            </button>
            <p className="mt-3 text-center text-xs text-slate-500">
              Opens an email to {CONTACT_EMAIL} with these details.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
