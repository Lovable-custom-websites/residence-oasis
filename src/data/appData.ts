import { ApartmentProps } from "@/components/ApartmentCard";

// Apartment data
export const allApartments: ApartmentProps[] = [
  {
    id: "1",
    name: "apartment1_name",
    description: "apartment1_description",
    priceeur: 30,
    pricedz: 8000,
    capacity: 2,
    size: 23,
    image: "/residence/assets/1-STUDIO/01.avif",
    images: [
      "/residence/assets/1-STUDIO/01.avif",
      "/residence/assets/1-STUDIO/02.avif",
      "/residence/assets/1-STUDIO/03.avif",
      "/residence/assets/1-STUDIO/04.avif"
    ],
    location: "floor1",
    type: "Studio",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "Refrigerator", "Oven", "Stove", "Freezer", "Washing Machine"],
    airbnbLink: "https://www.airbnb.fr/rooms/1210309363040804447"
  },
  {
    id: "2",
    name: "apartment2_name",
    description: "apartment2_description",
    priceeur: 35,
    pricedz: 9000,
    capacity: 4,
    size: 33,
    image: "/residence/assets/2-F2/01.avif",
    images: [
      "/residence/assets/2-F2/01.avif",
      "/residence/assets/2-F2/02.avif",
      "/residence/assets/2-F2/03.avif",
      "/residence/assets/2-F2/04.avif"
    ],
    location: "floor1",
    type: "F2",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "Refrigerator", "Oven", "Stove", "Freezer", "Washing Machine"],
    airbnbLink: "https://www.airbnb.fr/rooms/1403490902913383980"
  },
  {
    id: "3",
    name: "apartment3_name",
    description: "apartment3_description",
    priceeur: 50,
    pricedz: 14000,
    capacity: 4,
    size: 44,
    image: "/residence/assets/3-F2/01.avif",
    images: [
      "/residence/assets/3-F2/01.avif",
      "/residence/assets/3-F2/02.avif",
      "/residence/assets/3-F2/03.avif",
      "/residence/assets/3-F2/04.avif",
      "/residence/assets/3-F2/05.avif",
      "/residence/assets/3-F2/06.avif"
    ],
    location: "floor1",
    type: "F2",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "Refrigerator", "Oven", "Stove", "Freezer", "Washing Machine", "Jacuzzi"],
    airbnbLink: "https://www.airbnb.fr/rooms/1406477130010047362"
  },
  {
    id: "4",
    name: "apartment4_name",
    description: "apartment4_description",
    priceeur: 40,
    pricedz: 10000,
    capacity: 4,
    size: 33,
    image: "/residence/assets/4-F2/01.avif",
    images: [
      "/residence/assets/4-F2/01.avif",
      "/residence/assets/4-F2/02.avif",
      "/residence/assets/4-F2/03.avif",
      "/residence/assets/4-F2/04.avif",
      "/residence/assets/4-F2/05.avif",
      "/residence/assets/4-F2/06.avif",
    ],
    location: "floor2",
    type: "F2",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "Refrigerator", "Oven", "Stove", "Freezer", "Washing Machine"],
    airbnbLink: "https://www.airbnb.fr/rooms/1466501144879461799"
  },
  {
    id: "5",
    name: "apartment5_name",
    description: "apartment5_description",
    priceeur: 40,
    pricedz: 10000,
    capacity: 4,
    size: 33,
    image: "/residence/assets/5-F2/01.avif",
    images: [
      "/residence/assets/5-F2/01.avif",
      "/residence/assets/5-F2/02.avif",
      "/residence/assets/5-F2/03.avif",
      "/residence/assets/5-F2/04.avif",
      "/residence/assets/5-F2/05.avif",
      "/residence/assets/5-F2/06.avif",
      "/residence/assets/5-F2/07.avif"
    ],
    location: "floor2",
    type: "F2",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "Refrigerator", "Oven", "Stove", "Freezer", "Washing Machine"],
    airbnbLink: "https://www.airbnb.fr/rooms/1459886902893228309"
  },
  {
    id: "6",
    name: "apartment6_name",
    description: "apartment6_description",
    priceeur: 40,
    pricedz: 10000,
    capacity: 4,
    size: 36,
    image: "/residence/assets/6-F2/01.avif",
    images: [
      "/residence/assets/6-F2/01.avif",
      "/residence/assets/6-F2/02.avif",
      "/residence/assets/6-F2/03.avif",
      "/residence/assets/6-F2/04.avif",
      "/residence/assets/6-F2/05.avif",
      "/residence/assets/6-F2/06.avif"
    ],
    location: "floor2",
    type: "F2",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "Refrigerator", "Oven", "Stove", "Freezer", "Washing Machine"],
    airbnbLink: "https://www.airbnb.fr/rooms/1456024577261385927"
  },
  {
    id: "7",
    name: "apartment7_name",
    description: "apartment7_description",
    priceeur: 120,
    pricedz: 25000,
    capacity: 6,
    size: 132,
    image: "/residence/assets/WIP/01.webp",
    images: [
      "/residence/assets/WIP/01.webp"
    ],
    location: "floor3",
    type: "F3",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "Refrigerator", "Oven", "Stove", "Freezer", "Washing Machine", "TV", "Microwave", "Terrace", "Dishwasher"],
    airbnbLink: "https://www.airbnb.fr/rooms/NONE"
  },
];

// Featured apartments (for homepage)
export const featuredApartments: ApartmentProps[] = [
  allApartments[2], // F2 Suite Jacuzzi
  allApartments[6], // F3 Deluxe Suite Private Terrace
];

// Gallery images data
export const galleryImages = [
  // Studio images
  { id: 1, src: '/residence/assets/1-STUDIO/01.avif', alt: 'Studio Deluxe - Living Area', category: 'apartments' },
  { id: 2, src: '/residence/assets/1-STUDIO/02.avif', alt: 'Studio Deluxe - Kitchen', category: 'apartments' },
  { id: 3, src: '/residence/assets/1-STUDIO/03.avif', alt: 'Studio Deluxe - Bathroom', category: 'apartments' },
  { id: 4, src: '/residence/assets/1-STUDIO/04.avif', alt: 'Studio Deluxe - Bedroom Area', category: 'apartments' },

  // F2 Double Classique images
  { id: 21, src: '/residence/assets/2-F2/01.avif', alt: 'F2 Double Classique - Living Room', category: 'apartments' },
  { id: 22, src: '/residence/assets/2-F2/02.avif', alt: 'F2 Double Classique - Kitchen', category: 'apartments' },
  { id: 23, src: '/residence/assets/2-F2/03.avif', alt: 'F2 Double Classique - Bedroom', category: 'apartments' },
  { id: 24, src: '/residence/assets/2-F2/04.avif', alt: 'F2 Double Classique - Bathroom', category: 'apartments' },

  // F2 Suite Jacuzzi images
  { id: 31, src: '/residence/assets/3-F2/01.avif', alt: 'F2 Suite Jacuzzi - Living Room', category: 'apartments' },
  { id: 32, src: '/residence/assets/3-F2/02.avif', alt: 'F2 Suite Jacuzzi - Kitchen', category: 'apartments' },
  { id: 33, src: '/residence/assets/3-F2/03.avif', alt: 'F2 Suite Jacuzzi - Bedroom', category: 'apartments' },
  { id: 34, src: '/residence/assets/3-F2/04.avif', alt: 'F2 Suite Jacuzzi - Bathroom', category: 'apartments' },
  { id: 35, src: '/residence/assets/3-F2/05.avif', alt: 'F2 Suite Jacuzzi - Jacuzzi', category: 'apartments' },
  { id: 36, src: '/residence/assets/3-F2/06.avif', alt: 'F2 Suite Jacuzzi - Additional View', category: 'apartments' },

  // F2 Double Classique images
  { id: 41, src: '/residence/assets/5-F2/01.avif', alt: 'F2 Double Classique - Living Room', category: 'apartments' },
  { id: 42, src: '/residence/assets/5-F2/02.avif', alt: 'F2 Double Classique - Kitchen', category: 'apartments' },
  { id: 43, src: '/residence/assets/5-F2/03.avif', alt: 'F2 Double Classique - Bedroom', category: 'apartments' },
  { id: 44, src: '/residence/assets/5-F2/04.avif', alt: 'F2 Double Classique - Bathroom', category: 'apartments' },
  { id: 45, src: '/residence/assets/5-F2/05.avif', alt: 'F2 Double Classique - Additional View 1', category: 'apartments' },
  { id: 46, src: '/residence/assets/5-F2/06.avif', alt: 'F2 Double Classique - Additional View 2', category: 'apartments' },
  { id: 47, src: '/residence/assets/5-F2/07.avif', alt: 'F2 Double Classique - Additional View 3', category: 'apartments' },

  // F2 Double Classique images
  { id: 51, src: '/residence/assets/4-F2/01.avif', alt: 'F2 Double Classique - Chambre', category: 'apartments' },

  // F2 Deluxe Double images
  { id: 61, src: '/residence/assets/6-F2/01.avif', alt: 'F2 Deluxe Double - Living Room', category: 'apartments' },
  { id: 62, src: '/residence/assets/6-F2/02.avif', alt: 'F2 Deluxe Double - Kitchen', category: 'apartments' },
  { id: 63, src: '/residence/assets/6-F2/03.avif', alt: 'F2 Deluxe Double - Bedroom', category: 'apartments' },
  { id: 64, src: '/residence/assets/6-F2/04.avif', alt: 'F2 Deluxe Double - Bathroom', category: 'apartments' },
  { id: 65, src: '/residence/assets/6-F2/05.avif', alt: 'F2 Deluxe Double - Additional View 1', category: 'apartments' },
  { id: 66, src: '/residence/assets/6-F2/06.avif', alt: 'F2 Deluxe Double - Additional View 2', category: 'apartments' },

  // Common images
  { id: 91, src: '/residence/assets/COMMON/01.avif', alt: 'Rusica Park', category: 'proximity' },
  { id: 92, src: '/residence/assets/COMMON/02.avif', alt: 'Plage - Jeanne d\'Arc', category: 'proximity' },
  { id: 93, src: '/residence/assets/COMMON/03.avif', alt: 'Rusica Park - Aquaparc', category: 'proximity' },
  { id: 94, src: '/residence/assets/COMMON/04.avif', alt: 'Rusica Park', category: 'proximity' },
  { id: 95, src: '/residence/assets/COMMON/05.avif', alt: 'Plage - Jeanne d\'Arc', category: 'proximity' },
];

// Testimonials data
export interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  originalContent: string;
  translatedContent: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Zakaria',
    location: 'Saint-Priest, France',
    avatar: '/residence/assets/logo.avif',
    originalContent: 'Parfait tout l\'appartement nickel, l\'hôte très sympa merci',
    translatedContent: 'Perfect, the apartment was spotless, the host was very nice, thank you',
    rating: 5
  },
  {
    id: 2,
    name: 'Ranya',
    location: 'Monaco, France',
    avatar: '/residence/assets/logo.avif',
    originalContent: 'Le logement était impeccable, très propre et conforme à la description ainsi qu\'aux photos. On s\'y sent tout de suite bien. L\'hôtel est très agréable, bien situé et parfaitement entretenu. Merci pour ce super séjour !',
    translatedContent: 'The accommodation was impeccable, very clean and in line with the description and photos. You feel at home right away. The hotel is very pleasant, well located and perfectly maintained. Thank you for this great stay!',
    rating: 5
  },
  {
    id: 3,
    name: 'Keltoum',
    location: 'France',
    avatar: '/residence/assets/logo.avif',
    originalContent: 'Nous avons passé un excellent séjour dans cette location !',
    translatedContent: '',
    rating: 5
  },
];

// Contact information
export const contactInfo = {
  address: {
    street: "Villa N°17, Route Bouzaaroura",
    city: "Filfila, Skikda, 21000",
    country: "Algérie"
  },
  phone: {
    primary: "+213 5 61 47 29 90 (WhatsApp/Telegram)",
    secondary: "+213 6 96 12 38 00 (WhatsApp/Telegram)"
  },
  email: "...",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61578022628802",
    whatsapp: "https://wa.me/213561472990",
    telegram: "https://t.me/residence_oasis"
  },
  hours: {
    reception: "24h",
  },
  map: {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1213.5907643681207!2d7.024805984390581!3d36.894184300337336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f1cd7a86daeb77%3A0xbfbebfabf4bdedec!2sR%C3%A9sidence%20Oasis!5e0!3m2!1sen!2sdz!4v1752252755553!5m2!1sen!2sdz"
  }
};

// Site configuration
export const siteConfig = {
  name: "Résidence Oasis",
  description: "Modern equipped apartments near the beaches, offering the perfect blend of comfort and elegance for dream vacations.",
  logo: "/residence/assets/logo.avif",
  logoOnly: "/residence/assets/logo-only.avif",
  heroImage: "/residence/assets/COMMON/00-background.avif",
  heroImage2: "/residence/assets/COMMON/02-background.avif",
  heroImage3: "/residence/assets/COMMON/01-background.avif"
};
