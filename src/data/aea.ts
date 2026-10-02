import photoAstronomy from "@/assets/photo-astronomy.jpg";
import photoCoffee from "@/assets/photo-coffee.jpg";
import photoFoodDrive from "@/assets/photo-food-drive.jpg";
import photoHike from "@/assets/photo-hike.jpg";
import photoParty from "@/assets/photo-party.jpg";
import photoProject from "@/assets/photo-project.jpg";
import photoRocketLaunch from "@/assets/photo-rocket-launch.jpg";
import photoRunners from "@/assets/photo-runners.jpg";
import photoSports from "@/assets/photo-sports.jpg";
import photoStargaze from "@/assets/photo-stargaze.jpg";

export const CONTACT_EMAIL = "contactaea@aero.org";

export function mailto(to: string, subject?: string, body?: string) {
  const params = [
    subject ? `subject=${encodeURIComponent(subject)}` : "",
    body ? `body=${encodeURIComponent(body)}` : "",
  ].filter(Boolean);
  return `mailto:${to}${params.length ? `?${params.join("&")}` : ""}`;
}

export const heroImage = photoProject;

// ---------------------------------------------------------------------------
// Events. `date` is yyyy-MM-dd and times are 24-hour HH:mm, so the calendar can
// sort and place them without parsing display strings.
// ---------------------------------------------------------------------------

export type AeaEvent = {
  id: string;
  date: string;
  start: string;
  end?: string;
  title: string;
  club: string;
  location: string;
  details: string;
};

export const events: AeaEvent[] = [
  {
    id: "fall-food-drive",
    date: "2026-09-08",
    start: "11:00",
    end: "13:00",
    title: "Fall Food Drive",
    club: "Community Volunteers",
    location: "Building 120 Lobby",
    details: "Drop off canned goods and pantry staples, or stay and help sort donations.",
  },
  {
    id: "photo-walk",
    date: "2026-09-12",
    start: "17:30",
    end: "19:00",
    title: "Photo Walk: Golden Hour",
    club: "AEA",
    location: "Main Lobby",
    details: "A relaxed walk around campus at golden hour. Any camera or phone is welcome.",
  },
  {
    id: "launch-day-sep",
    date: "2026-09-19",
    start: "09:00",
    end: "12:00",
    title: "Launch Day",
    club: "Rocketry Club",
    location: "South Field",
    details: "Bring a rocket or just come watch. Families welcome.",
  },
  {
    id: "board-games-sep-24",
    date: "2026-09-24",
    start: "17:00",
    end: "19:00",
    title: "Board Game Night",
    club: "Board Game Night",
    location: "Cafeteria annex",
    details: "Strategy games, party games, and the trivia league. Snacks provided.",
  },
  {
    id: "group-hike-oct",
    date: "2026-10-03",
    start: "08:00",
    end: "14:00",
    title: "Peak Trail Group Hike",
    club: "Hiking & Outdoors",
    location: "Carpool from Lot C",
    details: "A moderate day hike. Bring water, lunch, and sturdy shoes.",
  },
  {
    id: "board-games-oct-08",
    date: "2026-10-08",
    start: "17:00",
    end: "19:00",
    title: "Board Game Night",
    club: "Board Game Night",
    location: "Cafeteria annex",
    details: "Strategy games, party games, and the trivia league. Snacks provided.",
  },
  {
    id: "group-ride-oct",
    date: "2026-10-10",
    start: "07:00",
    end: "10:00",
    title: "Saturday Group Ride",
    club: "Cycling Club",
    location: "Main gate",
    details: "A no-drop road ride with a coffee stop halfway.",
  },
  {
    id: "chess-ladder",
    date: "2026-10-13",
    start: "12:00",
    end: "13:00",
    title: "Fall Chess Ladder Kickoff",
    club: "Chess Club",
    location: "Library commons",
    details: "Sign up for the fall ladder and play your first round.",
  },
  {
    id: "launch-day-oct",
    date: "2026-10-17",
    start: "09:00",
    end: "12:00",
    title: "Launch Day",
    club: "Rocketry Club",
    location: "South Field",
    details: "Bring a rocket or just come watch. Families welcome.",
  },
  {
    id: "board-games-oct-22",
    date: "2026-10-22",
    start: "17:00",
    end: "19:00",
    title: "Board Game Night",
    club: "Board Game Night",
    location: "Cafeteria annex",
    details: "Strategy games, party games, and the trivia league. Snacks provided.",
  },
  {
    id: "star-party-oct",
    date: "2026-10-22",
    start: "20:00",
    end: "22:00",
    title: "Star Party",
    club: "Astronomy Society",
    location: "Observation Deck",
    details: "Telescopes provided. Dress warmly.",
  },
  {
    id: "board-games-nov-05",
    date: "2026-11-05",
    start: "17:00",
    end: "19:00",
    title: "Board Game Night",
    club: "Board Game Night",
    location: "Cafeteria annex",
    details: "Strategy games, party games, and the trivia league. Snacks provided.",
  },
  {
    id: "neighborhood-cleanup",
    date: "2026-11-14",
    start: "09:00",
    end: "12:00",
    title: "Neighborhood Cleanup",
    club: "Community Volunteers",
    location: "Meet at the Main gate",
    details: "Gloves, bags, and grabbers provided.",
  },
  {
    id: "board-games-nov-19",
    date: "2026-11-19",
    start: "17:00",
    end: "19:00",
    title: "Board Game Night",
    club: "Board Game Night",
    location: "Cafeteria annex",
    details: "Strategy games, party games, and the trivia league. Snacks provided.",
  },
];

// ---------------------------------------------------------------------------
// Clubs. `email` is optional; clubs without one route to the AEA inbox.
// ---------------------------------------------------------------------------

export const clubCategories = ["Social", "Technical", "Wellness", "Community"] as const;
export type ClubCategory = (typeof clubCategories)[number];

export type Club = {
  name: string;
  category: ClubCategory;
  description: string;
  schedule: string;
  contact: string;
  email?: string;
  image?: string;
};

export const clubs: Club[] = [
  {
    name: "AEA Running Club",
    category: "Wellness",
    description: "Weekly group runs around campus and training plans for local races.",
    schedule: "Tuesdays & Thursdays, 11:45 AM — Fitness center",
    contact: "Sarah Mitchell",
    image: photoRunners,
  },
  {
    name: "Astronomy Society",
    category: "Technical",
    description: "Monthly star parties, telescope loans, and astrophotography talks.",
    schedule: "New moon weekends — see calendar",
    contact: "Priya Raman",
    image: photoAstronomy,
  },
  {
    name: "Board Game Night",
    category: "Social",
    description: "Strategy, party games, and a very competitive trivia league. Snacks provided.",
    schedule: "Every other Thursday, 5:00 PM — Cafeteria annex",
    contact: "Tomás Rivera",
  },
  {
    name: "Chess Club",
    category: "Social",
    description: "Casual games, ladder tournaments, and an annual company championship.",
    schedule: "Tuesdays, 12:00 PM — Library commons",
    contact: "Ibrahim Khan",
  },
  {
    name: "Coffee & Conversation",
    category: "Social",
    description: "An easy, low-key way to meet people outside your program. Drop in anytime.",
    schedule: "Wednesdays, 3:00 PM — Building 120 Lounge",
    contact: "Elena Ortiz",
    image: photoCoffee,
  },
  {
    name: "Community Volunteers",
    category: "Community",
    description: "Food drives, STEM mentoring, and neighborhood cleanups across the year.",
    schedule: "Monthly service days — see calendar",
    contact: "Sam Nguyen",
    image: photoFoodDrive,
  },
  {
    name: "Cycling Club",
    category: "Wellness",
    description: "Road and gravel rides, plus a bike-to-work mentoring program.",
    schedule: "Saturdays, 7:00 AM — Main gate",
    contact: "Kevin Park",
  },
  {
    name: "Hiking & Outdoors",
    category: "Wellness",
    description: "Weekend day hikes, seasonal camping trips, and gear swaps.",
    schedule: "Monthly weekend hikes — see calendar",
    contact: "Jordan Fields",
  },
  {
    name: "Rocketry Club",
    category: "Technical",
    description:
      "Design, build, and launch small-scale rockets with fellow enthusiasts. All experience levels welcome.",
    schedule: "Monthly launches — see calendar",
    contact: "Marcus Chen",
    image: photoRocketLaunch,
  },
];

// ---------------------------------------------------------------------------
// Officers and directors. Everyone is reached through the AEA inbox.
// ---------------------------------------------------------------------------

export type BoardMember = {
  name: string;
  role: string;
  quote: string;
};

export const officers: BoardMember[] = [
  {
    name: "Marisol Vega",
    role: "President",
    quote: "AEA is where I met half the people I now call friends here.",
  },
  {
    name: "Daniel Okafor",
    role: "Vice President",
    quote: "If you have an idea for a club, bring it to us. We'll help you start it.",
  },
  {
    name: "Hannah Liu",
    role: "Secretary",
    quote: "Every event on our calendar started as somebody's good idea.",
  },
  {
    name: "Robert Chen",
    role: "Treasurer",
    quote: "We make sure every dollar goes back into the community.",
  },
];

export const directors: BoardMember[] = [
  {
    name: "Alicia Moreno",
    role: "Director, Membership",
    quote: "New here? Come find me — I'll introduce you around.",
  },
  {
    name: "Greg Salinas",
    role: "Director, Events",
    quote: "The picnic is my favorite day of the year, every year.",
  },
  {
    name: "Nina Patel",
    role: "Director, Communications",
    quote: "Tell us what you want to see and we'll get the word out.",
  },
  {
    name: "Frank Delgado",
    role: "Director, Community Outreach",
    quote: "Serving our neighbors is the best part of this job.",
  },
];

// ---------------------------------------------------------------------------
// Documents. There are no files yet, so each one is requested by email.
// ---------------------------------------------------------------------------

export type AeaDocument = {
  title: string;
  description: string;
  category: "Bylaws" | "Forms" | "Minutes" | "Guides";
  updated: string;
};

export const documents: AeaDocument[] = [
  {
    title: "Board Meeting Minutes — July 2026",
    description: "Summary of decisions and club updates.",
    category: "Minutes",
    updated: "July 14, 2026",
  },
  {
    title: "Board Meeting Minutes — June 2026",
    description: "Summary of decisions and club updates.",
    category: "Minutes",
    updated: "June 9, 2026",
  },
  {
    title: "Club Leader Handbook",
    description: "Everything you need to run a club: planning, promotion, and reporting.",
    category: "Guides",
    updated: "June 2026",
  },
  {
    title: "Event Reimbursement Request",
    description: "Submit receipts and budget details for approved club event spending.",
    category: "Forms",
    updated: "April 2026",
  },
  {
    title: "New Club Charter Application",
    description: "Propose and register a new club, including sponsor requirements.",
    category: "Forms",
    updated: "March 2026",
  },
  {
    title: "AEA Bylaws",
    description: "Governing rules, membership terms, and election procedures for the association.",
    category: "Bylaws",
    updated: "January 2026",
  },
];

// ---------------------------------------------------------------------------
// Photos. `wide` photos span two columns on the gallery grid.
// ---------------------------------------------------------------------------

export type Photo = { src: string; caption: string; wide?: boolean };

export const photos: Photo[] = [
  { src: photoCoffee, caption: "Coffee & Conversation" },
  { src: photoRunners, caption: "AEA Running Club fall run" },
  { src: photoRocketLaunch, caption: "Rocketry Club launch day" },
  { src: photoParty, caption: "Anniversary celebration", wide: true },
  { src: photoFoodDrive, caption: "Community food drive" },
  { src: photoAstronomy, caption: "Astronomy Society star party" },
  { src: photoHike, caption: "Hiking & Outdoors spring hike", wide: true },
  { src: photoSports, caption: "Company softball game" },
  { src: photoStargaze, caption: "Stargazing night" },
  { src: photoProject, caption: "Rocketry Club build night" },
];
