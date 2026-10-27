/**
 * Lagos Preferred Jetties Configuration
 * Pre-seeded with Five Cowries Creek and key waterfront jetties.
 * Items marked with TODO need final operational confirmation before launch.
 */

export interface JettyOption {
  id: string;
  name: string;
  location: string;
  isConfirmed: boolean;
  notes?: string;
}

export const LAGOS_JETTIES: JettyOption[] = [
  {
    id: "five-cowries",
    name: "Five Cowries Creek Terminal",
    location: "Victoria Island / Ikoyi",
    isConfirmed: true, // Confirmed primary hub
    notes: "LASWA Terminal, Falomo round-about",
  },
  {
    id: "tarzan-jetty",
    name: "Tarzan Jetty (Victoria Island)",
    location: "Victoria Island",
    isConfirmed: false, // TODO: Confirm partnership agreement with Tarzan Marine
    notes: "Opposite Oriental Hotel, Lekki Expressway",
  },
  {
    id: "civic-centre-jetty",
    name: "Civic Centre Jetty",
    location: "Ozumba Mbadiwe, Victoria Island",
    isConfirmed: false, // TODO: Confirm berthing rights and access protocols with Civic Centre management
    notes: "Private pontoon next to Civic Towers",
  },
  {
    id: "maroko-jetty",
    name: "Maroko Jetty",
    location: "Lekki Phase 1",
    isConfirmed: false, // TODO: Confirm passenger access and security post setup
    notes: "Near Lekki-Ikoyi Link Bridge",
  },
  {
    id: "fiki-marina",
    name: "Fiki Marine Jetty",
    location: "Marina / Victoria Island",
    isConfirmed: false, // TODO: Confirm fueling and overnight dockage terms
    notes: "3/4 Ozumba Mbadiwe Avenue",
  },
  {
    id: "laswa-marina",
    name: "CMS / Marina Central Jetty",
    location: "Lagos Island",
    isConfirmed: false, // TODO: Confirm commercial passenger boarding slots during morning commute
    notes: "Inner Marina water hub",
  },
  {
    id: "badore-jetty",
    name: "Badore Ferry Terminal",
    location: "Ajah",
    isConfirmed: false, // TODO: Confirm speed craft docking depth at low tide
    notes: "Ajah express link",
  },
  {
    id: "ilashe-private",
    name: "Ilashe Waterfront Jetties",
    location: "Ilashe Luxury Islands",
    isConfirmed: false, // TODO: Confirm beach club and private home access permits
    notes: "Weekend charter destination",
  },
  {
    id: "other",
    name: "Other (specify your jetty)",
    location: "Custom / Private Pontoon",
    isConfirmed: true,
  },
];
