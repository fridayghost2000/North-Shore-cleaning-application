export const northShoreCompany = {
  name: 'North Shore Cleaning Systems, Inc.',
  shortName: 'North Shore Clean',
  tagline: 'Commercial & Residential Cleaning Specialists',
  address: '100 Cummings Center, Suite 425C, Beverly, MA 01915',
  phone: '978-809-5533',
  email: 'service@northshoreclean.com',
  website: 'https://northshoreclean.com',
  serviceAreas: ['Beverly', 'Salem', 'Marblehead', 'Danvers', 'Manchester-by-the-Sea', 'Peabody', 'Gloucester', 'Essex County'],
}

export const cleansterServices = [
  {
    id: 'short-term-rentals',
    title: 'Short term rentals',
    subtitle: 'Airbnb or other rental properties',
    iconName: 'BedDouble',
    color: '#0B4A8F', // North Shore Brand Blue
    bgColor: '#EEF5FC',
    basePrice: 135,
    duration: '2–3 hrs',
    description: 'Fast, dependable turnovers for Airbnb hosts and vacation rentals with laundry & guest restocking.',
  },
  {
    id: 'apartment-condo',
    title: 'Apartment/Condo',
    subtitle: 'Stakeholders and property managers',
    iconName: 'Building',
    color: '#0284C7', // Blue
    bgColor: '#F0F9FF',
    basePrice: 110,
    duration: '2 hrs',
    description: 'Thorough cleaning for multi-family units, condos, and common hallways in residential complexes.',
  },
  {
    id: 'house',
    title: 'House',
    subtitle: 'Regular cleaning & deep cleaning',
    iconName: 'Home',
    color: '#10B981', // Green
    bgColor: '#ECFDF5',
    basePrice: 160,
    duration: '3–4 hrs',
    description: 'Eco-friendly residential home cleaning tailored to your family schedule with pet-safe products.',
  },
  {
    id: 'commercial-office',
    title: 'Commercial/Office spaces',
    subtitle: 'Offices, gyms, stores & facilities',
    iconName: 'Briefcase',
    color: '#64748B', // Slate
    bgColor: '#F8FAFC',
    basePrice: 220,
    duration: '3–5 hrs',
    description: 'Complete commercial janitorial plans available 24/7 (including overnight cleaning) across Essex County.',
  },
  {
    id: 'floor-care',
    title: 'Floor Stripping & Waxing',
    subtitle: 'Commercial VCT & hard floor buffing',
    iconName: 'Sparkles',
    color: '#F59E0B', // Amber
    bgColor: '#FFFBEB',
    basePrice: 250,
    duration: '4–6 hrs',
    description: 'Specialized hard floor care utilizing commercial high-speed buffers and durable protective waxing.',
  },
  {
    id: 'carpet-upholstery',
    title: 'Carpet & Upholstery',
    subtitle: 'Hot water steam extraction & stain removal',
    iconName: 'Armchair',
    color: '#8B5CF6', // Purple
    bgColor: '#F5F3FF',
    basePrice: 140,
    duration: '2–3 hrs',
    description: 'Deep carpet fiber restoration, pet odor removal, and fabric upholstery sanitizing.',
  },
]

export const initialActiveBooking = {
  id: 'bk-201',
  serviceType: 'Residential Deep Clean',
  categoryBadge: 'House',
  status: 'In Progress', // 'Arrived'
  estimatedArrival: '5 mins',
  cleaner: {
    name: 'William N.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 142,
    phone: '(978) 809-5533',
  },
  dateFormatted: 'Today · Nov 20, 2026',
  timeWindow: '11:00 AM – 2:00 PM',
  address: '100 Cummings Center, Suite 425C, Beverly, MA 01915',
  price: 185.00,
  beforePhotos: [
    { id: 'bp-1', url: '/kitchen-before.jpg', type: 'image', caption: 'Kitchen Counter Clutter' },
    { id: 'bp-2', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80', type: 'image', caption: 'Stovetop Grease' },
    { id: 'bp-3', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80', type: 'video', caption: 'Hallway Floor Pre-Sweep' },
    { id: 'bp-4', url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80', type: 'image', caption: 'Bathroom Tile Grout' },
  ],
  afterPhotos: [
    { id: 'ap-1', url: '/kitchen-after.jpg', type: 'image', caption: 'Kitchen Sparkling Clean' },
    { id: 'ap-2', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80', type: 'image', caption: 'Sanitized Appliances' },
    { id: 'ap-3', url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&auto=format&fit=crop&q=80', type: 'video', caption: 'Pristine Bath Finish' },
  ],
}

export const initialUpcomingBookings = [
  {
    id: 'bk-202',
    dateBadge: { day: '21', month: 'NOV' },
    dateString: 'Fri 21 Nov 2026',
    categoryBadge: 'Commercial',
    price: 240.00,
    status: 'Pending',
    statusColor: '#D97706',
    timeWindow: 'Fri, Nov 21 · 09:00AM – 12:00PM',
    address: '84 Cabot Street, Downtown Beverly, MA 01915',
    serviceTitle: 'Commercial Office Janitorial',
  },
  {
    id: 'bk-203',
    dateBadge: { day: '24', month: 'NOV' },
    dateString: 'Mon 24 Nov 2026',
    categoryBadge: 'Condo',
    price: 110.00,
    status: 'Confirmed',
    statusColor: '#059669',
    timeWindow: 'Mon, Nov 24 · 01:30PM – 03:30PM',
    address: '25 Atlantic Ave, Marblehead, MA 01945',
    serviceTitle: 'Apartment Turnover Clean',
  },
]

export const initialPastBookings = [
  {
    id: 'bk-199',
    dateBadge: { day: '14', month: 'NOV' },
    dateString: 'Fri 14 Nov 2026',
    categoryBadge: 'House',
    price: 160.00,
    status: 'Completed',
    statusColor: '#059669',
    timeWindow: 'Fri, Nov 14 · 10:00AM – 01:00PM',
    address: '14 Harbor View Ave, Beverly, MA 01915',
    serviceTitle: 'Regular Residential Maintenance',
  },
]

export const cleansterChecklists = [
  {
    id: 'cl-1',
    title: 'Getting Started',
    subtasksCount: 4,
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80',
    tasks: [
      { text: 'Verify property access code & lockbox', done: true },
      { text: 'Initial walkthrough & take Before photos', done: true },
      { text: 'Empty all wastebaskets & replace liners', done: true },
      { text: 'Check for pet alerts and special instructions', done: false },
    ],
  },
  {
    id: 'cl-2',
    title: 'Living Room',
    subtasksCount: 7,
    thumbnail: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80',
    tasks: [
      { text: 'Dust all furniture surfaces, shelves & frames', done: true },
      { text: 'Vacuum upholstery, sofa cushions & rugs', done: true },
      { text: 'Clean window sills & interior glass doors', done: false },
      { text: 'Dust baseboards and floor corners', done: false },
      { text: 'Mop hardwood or laminate flooring', done: false },
    ],
  },
  {
    id: 'cl-3',
    title: 'Kitchen',
    subtasksCount: 10,
    thumbnail: '/kitchen-after.jpg',
    tasks: [
      { text: 'Scrub and sanitize sink and chrome faucet', done: true },
      { text: 'Clean countertops and tile backsplash', done: true },
      { text: 'Wipe down exterior of refrigerator & dishwasher', done: true },
      { text: 'Deep clean inside of microwave', done: true },
      { text: 'Degrease stovetop burners & control knobs', done: false },
      { text: 'Sweep and mop kitchen floor with neutral cleaner', done: false },
    ],
  },
  {
    id: 'cl-4',
    title: 'Bathroom',
    subtasksCount: 10,
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
    tasks: [
      { text: 'De-scale and scrub glass shower doors & tiles', done: true },
      { text: 'Disinfect toilet bowl, seat, and exterior base', done: true },
      { text: 'Polish mirrors and vanity faucets', done: false },
      { text: 'Restock towels, toilet paper & hand soap', done: false },
    ],
  },
  {
    id: 'cl-5',
    title: 'Bedroom',
    subtasksCount: 5,
    thumbnail: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&auto=format&fit=crop&q=80',
    tasks: [
      { text: 'Change bed linens & make bed neatly', done: false },
      { text: 'Dust nightstands, dressers & lamps', done: false },
      { text: 'Vacuum bedroom carpets & under bed perimeter', done: false },
    ],
  },
  {
    id: 'cl-6',
    title: 'Finishing Touches',
    subtasksCount: 7,
    thumbnail: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&auto=format&fit=crop&q=80',
    tasks: [
      { text: 'Take After photos & upload to app gallery', done: false },
      { text: 'Turn off all interior lights and fans', done: false },
      { text: 'Ensure windows and doors are securely locked', done: false },
      { text: 'Return lockbox key to front entrance position', done: false },
    ],
  },
]

export const initialMessages = [
  {
    id: 'm-1',
    sender: 'cleaner',
    text: "Hi! I'm on my way to your property in Beverly. Arriving in ~5 minutes.",
    time: '10:55 AM',
  },
  {
    id: 'm-2',
    sender: 'cleaner',
    text: 'I bought the specialized floor buffer pads you requested and it cost $70.',
    time: '12:35 PM',
  },
  {
    id: 'm-3',
    sender: 'user',
    text: 'Sure, send me the payment request in the app.',
    time: '12:36 PM',
  },
  {
    id: 'm-4',
    sender: 'cleaner',
    text: 'Awesome 😊',
    time: '12:37 PM',
  },
  {
    id: 'm-5',
    sender: 'system',
    type: 'expense_request',
    title: 'Expenses: Payment Request',
    amount: 70.00,
    paid: true,
    time: '12:39 PM',
  },
]
