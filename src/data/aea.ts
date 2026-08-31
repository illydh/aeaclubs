import photoHike from "@/assets/photo-hike.jpg";
import photoParty from "@/assets/photo-party.jpg";
import photoProject from "@/assets/photo-project.jpg";
import photoSports from "@/assets/photo-sports.jpg";
import photoVolunteer from "@/assets/photo-volunteer.jpg";
import photoStargaze from "@/assets/photo-stargaze.jpg";

export const CONTACT_EMAIL = "contactaea@aero.org";

export type AeaEvent = {
  month: string;
  day: string;
  title: string;
  detail: string;
  club: string;
};

export const events: AeaEvent[] = [
  {
    month: "Sep",
    day: "12",
    title: "Fall Welcome BBQ",
    detail: "North Courtyard • 12:00 PM",
    club: "AEA",
  },
  {
    month: "Sep",
    day: "19",
    title: "Photography Walk: Golden Hour",
    detail: "Main Lobby • 5:30 PM",
    club: "Lens & Aperture",
  },
  {
    month: "Sep",
    day: "26",
    title: "Model Rocket Launch Day",
    detail: "South Field • 9:00 AM",
    club: "Rocketry Collective",
  },
  {
    month: "Oct",
    day: "04",
    title: "Peak Trail Group Hike",
    detail: "Carpool from Lot C • 8:00 AM",
    club: "Trailblazers",
  },
  {
    month: "Oct",
    day: "11",
    title: "Softball League Opening Game",
    detail: "Community Park • 10:00 AM",
    club: "AEA Softball",
  },
  {
    month: "Oct",
    day: "22",
    title: "Stargazing Night",
    detail: "Observation Deck • 8:00 PM",
    club: "Stargazers Society",
  },
];

export type Club = {
  name: string;
  icon: string;
  category: string;
  description: string;
  contact: string;
  meets: string;
};

export const clubs: Club[] = [
  {
    name: "Rocketry Collective",
    icon: "🚀",
    category: "Technical",
    description:
      "Design, build, and launch small-scale rockets with fellow enthusiasts. All experience levels welcome.",
    contact: "rocketry@aero.org",
    meets: "2nd Thursday, 5:30 PM",
  },
  {
    name: "Lens & Aperture",
    icon: "📸",
    category: "Creative",
    description:
      "Monthly photo walks, print critiques, and technical workshops for photographers of every skill level.",
    contact: "photoclub@aero.org",
    meets: "3rd Wednesday, 5:00 PM",
  },
  {
    name: "AEA Softball",
    icon: "🥎",
    category: "Sports",
    description:
      "A friendly co-ed league running spring through fall. Players, subs, and cheering sections all needed.",
    contact: "softball@aero.org",
    meets: "Saturdays, 10:00 AM",
  },
  {
    name: "Trailblazers Hiking",
    icon: "🥾",
    category: "Outdoors",
    description:
      "Weekend day hikes around the region, from easy nature loops to full-day summit routes.",
    contact: "hiking@aero.org",
    meets: "1st Saturday, 8:00 AM",
  },
  {
    name: "Stargazers Society",
    icon: "🔭",
    category: "Science",
    description:
      "Night sky observation sessions, telescope loans, and astrophotography talks.",
    contact: "stargazers@aero.org",
    meets: "New moon weekends",
  },
  {
    name: "Book Club",
    icon: "📚",
    category: "Social",
    description:
      "One book a month, one relaxed lunchtime discussion. Fiction, science, and everything between.",
    contact: "bookclub@aero.org",
    meets: "Last Tuesday, 12:00 PM",
  },
  {
    name: "Community Service Corps",
    icon: "🤝",
    category: "Volunteer",
    description:
      "Food drives, STEM mentoring, and local cleanup days organized throughout the year.",
    contact: "service@aero.org",
    meets: "Monthly projects",
  },
  {
    name: "Chess & Games",
    icon: "♟️",
    category: "Social",
    description:
      "Casual chess ladders, board game nights, and the annual company tournament.",
    contact: "games@aero.org",
    meets: "Fridays, 12:00 PM",
  },
  {
    name: "Running & Fitness",
    icon: "🏃",
    category: "Sports",
    description:
      "Lunchtime run groups, race training plans, and campus fitness challenges.",
    contact: "fitness@aero.org",
    meets: "Tue & Thu, 11:45 AM",
  },
];

export type Officer = {
  name: string;
  role: string;
  group: "Officers" | "Directors";
  email: string;
};

export const officers: Officer[] = [
  { name: "Sarah Mitchell", role: "President", group: "Officers", email: CONTACT_EMAIL },
  { name: "Marcus Chen", role: "Vice President", group: "Officers", email: CONTACT_EMAIL },
  { name: "Elena Rodriguez", role: "Treasurer", group: "Officers", email: CONTACT_EMAIL },
  { name: "David Okafor", role: "Secretary", group: "Officers", email: CONTACT_EMAIL },
  { name: "Priya Raman", role: "Director of Clubs", group: "Directors", email: CONTACT_EMAIL },
  { name: "Tom Whitaker", role: "Director of Events", group: "Directors", email: CONTACT_EMAIL },
  { name: "Angela Reyes", role: "Director of Communications", group: "Directors", email: CONTACT_EMAIL },
  { name: "Jonathan Pike", role: "Director of Membership", group: "Directors", email: CONTACT_EMAIL },
];

export type AeaDocument = {
  title: string;
  description: string;
  category: string;
  updated: string;
};

export const documents: AeaDocument[] = [
  {
    title: "AEA Bylaws",
    description: "Governing rules, membership terms, and election procedures for the association.",
    category: "Governance",
    updated: "Jan 2026",
  },
  {
    title: "New Club Charter Application",
    description: "Form to propose and register a new club, including sponsor requirements.",
    category: "Forms",
    updated: "Mar 2026",
  },
  {
    title: "Event Reimbursement Request",
    description: "Submit receipts and budget details for approved club event spending.",
    category: "Forms",
    updated: "Apr 2026",
  },
  {
    title: "Annual Budget Summary",
    description: "Overview of dues, allocations, and club funding for the current fiscal year.",
    category: "Finance",
    updated: "Feb 2026",
  },
  {
    title: "Board Meeting Minutes",
    description: "Archive of monthly board meeting notes and recorded decisions.",
    category: "Governance",
    updated: "Aug 2026",
  },
  {
    title: "Club Officer Handbook",
    description: "Practical guide for club leads: planning events, promotion, and reporting.",
    category: "Guides",
    updated: "Jun 2026",
  },
];

export type Photo = { src: string; caption: string };

export const photos: Photo[] = [
  { src: photoHike, caption: "Trailblazers spring hike" },
  { src: photoParty, caption: "Anniversary celebration" },
  { src: photoProject, caption: "Rocketry Collective build night" },
  { src: photoSports, caption: "Softball league opening day" },
  { src: photoVolunteer, caption: "Community food drive" },
  { src: photoStargaze, caption: "Stargazers observation night" },
];
