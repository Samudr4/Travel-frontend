import { TravelPackage, Review, User, BlogPost, Booking } from './types';

export const APP_NAME = "North East Adventure";

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Packages', path: '/packages' },
  { name: 'Travel Guide', path: '/travel-guide' },
  { name: 'About Us', path: '/about' },
  // Wishlist is now conditional in Navbar
];

export const ADMIN_NAV_LINKS = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Manage Packages', path: '/admin/packages' },
  { name: 'Manage Bookings', path: '/admin/bookings' },
  { name: 'Manage Users', path: '/admin/users' },
];

// Helper to create dates for mock data
const formatDate = (date: Date): string => date.toISOString().split('T')[0];

// MOCK REVIEWS (Updated structure)
export const MOCK_REVIEWS_MEGHALAYA: Review[] = [
  { id: 'r1', packageId: 'ne1', userId: 'user01', userName: 'Adventure Alice', comment: 'Absolutely stunning landscapes in Meghalaya! The living root bridges were a highlight.', rating: 5, date: formatDate(new Date('2023-11-10')) },
  { id: 'r2', packageId: 'ne1', userId: 'user02', userName: 'Explorer Bob', comment: 'Great trip, well organized. Caves were amazing. Wish we had more time in Cherrapunji.', rating: 4, date: formatDate(new Date('2023-12-01')) },
  { id: 'r2b', packageId: 'ne1', userId: 'user03', userName: 'Nature Nina', comment: 'The waterfalls are magical, and the people are so friendly. Mawlynnong truly is spotless!', rating: 5, date: formatDate(new Date('2024-01-05')) },
];

export const MOCK_REVIEWS_SIKKIM: Review[] = [
  { id: 'r3', packageId: 'ne2', userId: 'user03', userName: 'Mountain Mike', comment: 'Sikkim is breathtaking. The views of Kanchenjunga were unreal. Homestays were very welcoming.', rating: 5, date: formatDate(new Date('2024-02-15')) },
  { id: 'r4', packageId: 'ne2', userId: 'user01', userName: 'Adventure Alice', comment: 'Pelling was peaceful and Gangtok vibrant. A good mix of culture and nature.', rating: 4, date: formatDate(new Date('2024-03-01')) },
];

export const SAMPLE_PACKAGES: TravelPackage[] = [
  {
    id: 'ne1',
    name: 'Meghalaya\'s Living Root Bridges & Caves',
    destination: 'Shillong, Cherrapunji, Mawlynnong',
    region: 'Meghalaya',
    duration: 7,
    price: 19500, // INR
    description: 'Explore the "Abode of Clouds" - Meghalaya. Witness living root bridges, explore stunning caves, and visit Asia\'s cleanest village.',
    longDescription: 'Embark on a 7-day journey through the rolling hills and lush landscapes of Meghalaya. Visit the vibrant capital Shillong, experience the record-breaking rainfall of Cherrapunji (Sohra), marvel at the engineering wonders of living root bridges in Nongriat, explore the Mawsmai caves, and wander through the pristine village of Mawlynnong. This package includes comfortable stays, local guides, and transport.',
    imageUrl: 'https://picsum.photos/seed/meghalayaExplore/600/400',
    rating: 4.8, // Recalculate based on new reviews
    reviews: MOCK_REVIEWS_MEGHALAYA,
    activities: ['Trekking to Living Root Bridges', 'Caving', 'Sightseeing', 'Cultural Village Visits', 'Waterfall Exploration', 'Boating in Dawki'],
    whatsIncluded: ['Accommodation in hotels/homestays', 'Private vehicle for transfers & sightseeing', 'Breakfast & Dinner', 'Local guide fees', 'Permits', 'Entry fees to scheduled sights'],
    bestTimeToVisit: 'October to April',
  },
  {
    id: 'ne2',
    name: 'Mystical Sikkim & Kanchenjunga Views',
    destination: 'Gangtok, Pelling, Yuksom, Ravangla',
    region: 'Sikkim',
    duration: 8,
    price: 23500, // INR
    description: 'Discover the serene beauty of Sikkim, with majestic Himalayan views, ancient monasteries, and vibrant culture.',
    longDescription: 'An 8-day exploration of Sikkim, the land of mystic splendor. From the bustling streets of Gangtok to the tranquil monasteries of Pelling and the historical significance of Yuksom, this trip offers stunning views of Mt. Kanchenjunga, rich Buddhist heritage, and warm Sikkimese hospitality. Includes monastery visits, nature walks, a visit to the Buddha Park in Ravangla, and scenic drives.',
    imageUrl: 'https://picsum.photos/seed/sikkimGlory/600/400',
    rating: 4.7, // Recalculate
    reviews: MOCK_REVIEWS_SIKKIM,
    activities: ['Monastery Visits (Rumtek, Pemayangtse)', 'Mountain Viewpoints (Kanchenjunga)', 'Nature Walks', 'Cultural Immersion', 'Tsomgo Lake Visit (optional)', 'Buddha Park Ravangla'],
    whatsIncluded: ['Hotel accommodation', 'Transportation (SUV/Innova)', 'Breakfast & Dinner', 'Permits for restricted areas (Nathu La excluded)', 'Guided tours'],
    bestTimeToVisit: 'March to May, October to Mid-December',
  },
  {
    id: 'ne3',
    name: 'Arunachal\'s Tawang Monastery Circuit',
    destination: 'Guwahati, Dirang, Tawang, Bomdila',
    region: 'Arunachal Pradesh',
    duration: 9,
    price: 29500, // INR
    description: 'Journey to the remote and beautiful Tawang Valley, home to one of the largest Buddhist monasteries in the world.',
    longDescription: 'A 9-day expedition to the breathtaking landscapes of Arunachal Pradesh. Travel through scenic mountain passes like Sela Pass, visit ancient monasteries including the famed Tawang Monastery and Bomdila Monastery, and experience the unique Monpa culture. This trip is an adventure into a less-explored part of the Himalayas. Requires Inner Line Permits (ILP).',
    imageUrl: 'https://picsum.photos/seed/arunachalPeak/600/400',
    rating: 4.6,
    reviews: [ { id: 'r5', packageId: 'ne3', userId: 'user02', userName: 'Explorer Bob', comment: 'Tawang was an incredible experience. Sela Pass is stunning but challenging. ILP process was smooth with their help.', rating: 4.5, date: formatDate(new Date('2023-10-20')) }],
    activities: ['Monastery Tours', 'High-Altitude Passes (Sela Pass)', 'Cultural Experiences', 'Scenic Drives', 'War Memorial Visit', 'Local Market Exploration'],
    whatsIncluded: ['Accommodation (Hotels/Guesthouses)', 'Transport (Sumo/Innova)', 'Breakfast & Dinner', 'ILP assistance', 'Local guides'],
    bestTimeToVisit: 'April to June, September to October',
  },
  {
    id: 'ne4',
    name: 'Assam Tea Gardens & Wildlife Safari',
    destination: 'Guwahati, Kaziranga, Jorhat, Majuli',
    region: 'Assam',
    duration: 7, // Increased duration
    price: 18500, // Adjusted price
    description: 'Experience the lush tea gardens of Assam, go on thrilling safaris in Kaziranga, and visit the world\'s largest river island, Majuli.',
    longDescription: 'This 7-day tour combines the colonial charm of Assamese tea estates with the wild adventure of Kaziranga National Park and the unique cultural landscape of Majuli island. Enjoy jeep and elephant safaris, visit ancient temples in Guwahati, learn about tea processing, and experience Sattriya culture in Majuli. A perfect blend of nature, wildlife, and culture.',
    imageUrl: 'https://picsum.photos/seed/assamWild/600/400',
    rating: 4.5,
    reviews: [{ id: 'r6', packageId: 'ne4', userId: 'user01', userName: 'Adventure Alice', comment: 'Kaziranga rhino safari was amazing! Majuli was a very unique cultural experience.', rating: 4.5, date: formatDate(new Date('2024-04-05')) }],
    activities: ['Wildlife Safari (Jeep & Elephant in Kaziranga)', 'Tea Garden Visit & Tasting', 'Temple Tours (Kamakhya)', 'River Cruise on Brahmaputra', 'Majuli Island Visit', 'Sattriya Art Exposure'],
    whatsIncluded: ['Resort/Hotel/Homestay Stays', 'All Transfers (including ferry to Majuli)', 'Breakfast & Dinner', 'Safari Permits & Rides', 'Entry fees for scheduled sights'],
    bestTimeToVisit: 'November to April',
  },
  {
    id: 'ne5',
    name: 'Nagaland\'s Hornbill Festival & Tribal Culture',
    destination: 'Dimapur, Kohima, Khonoma',
    region: 'Nagaland',
    duration: 8,
    price: 26000,
    description: 'Immerse yourself in the vibrant Hornbill Festival and explore the rich tribal heritage of Nagaland.',
    longDescription: 'An 8-day cultural journey into Nagaland, timed for the spectacular Hornbill Festival (typically first week of December). Witness traditional dances, music, sports, and crafts of various Naga tribes. Visit Kohima, the state capital, explore the historic Khonoma village (Asia\'s first green village), and learn about the unique customs and traditions of the Naga people. This package offers a deep dive into one of India\'s most fascinating cultural landscapes.',
    imageUrl: 'https://picsum.photos/seed/nagalandHornbill/600/400',
    rating: 4.8,
    reviews: [],
    activities: ['Hornbill Festival Attendance', 'Tribal Village Tours', 'War Cemetery Visit (Kohima)', 'State Museum Exploration', 'Local Cuisine Tasting', 'Interaction with Local Artisans'],
    whatsIncluded: ['Accommodation (Hotels/Homestays)', 'Transportation', 'Breakfast & Dinner', 'Entry pass for Hornbill Festival', 'Local Naga guides', 'Protected Area Permit (PAP) assistance'],
    bestTimeToVisit: 'Late November to Early December (for Hornbill Festival), October to May for general travel.',
  },
  {
    id: 'ne6',
    name: 'Mizoram\'s Serene Hills & Rich Traditions',
    destination: 'Aizawl, Reiek Peak, Hmuifang',
    region: 'Mizoram',
    duration: 6,
    price: 21000,
    description: 'Discover the tranquil beauty of Mizoram, with its rolling hills, vibrant culture, and warm hospitality.',
    longDescription: 'A 6-day tour exploring the picturesque state of Mizoram. Visit Aizawl, the charming capital city, trek to Reiek Peak for stunning panoramic views, and experience the local Mizo culture in Hmuifang. This package offers a blend of natural beauty, adventure, and cultural immersion in a less-trodden part of Northeast India.',
    imageUrl: 'https://picsum.photos/seed/mizoramHills/600/400',
    rating: 4.4,
    reviews: [],
    activities: ['City Tour of Aizawl (State Museum, Bara Bazar)', 'Trekking to Reiek Peak', 'Cultural Village Visit (Hmuifang)', 'Exploring local markets', 'Enjoying Mizo cuisine', 'Visiting Durtlang Hills viewpoint'],
    whatsIncluded: ['Accommodation in comfortable hotels/guesthouses', 'Private vehicle for all transfers and sightseeing', 'Daily breakfast and dinner', 'Local Mizo guide', 'Entry fees to attractions mentioned'],
    bestTimeToVisit: 'October to March',
  },
];


export const MOCK_USERS: User[] = [
  { id: 'admin01', email: 'admin@example.com', passwordHash: 'adminpassword', name: 'Admin User', role: 'admin', createdAt: formatDate(new Date('2023-01-01')) },
  { id: 'user01', email: 'alice@example.com', passwordHash: 'password123', name: 'Alice Wonderland', role: 'user', createdAt: formatDate(new Date('2023-05-10')) },
  { id: 'user02', email: 'bob@example.com', passwordHash: 'password123', name: 'Bob The Explorer', role: 'user', createdAt: formatDate(new Date('2023-06-15')) },
  { id: 'user03', email: 'mike@example.com', passwordHash: 'password456', name: 'Mountain Mike', role: 'user', createdAt: formatDate(new Date('2023-07-20')) },
  { id: 'user04', email: 'nina@example.com', passwordHash: 'password789', name: 'Nature Nina', role: 'user', createdAt: formatDate(new Date('2023-08-25')) },
];

export const MOCK_BOOKINGS: Booking[] = [
  { 
    id: 'b001', 
    packageId: 'ne1', 
    packageName: 'Meghalaya\'s Living Root Bridges & Caves', 
    userId: 'user01', 
    customerName: 'Alice Wonderland',
    customerEmail: 'alice@example.com',
    bookingDate: formatDate(new Date('2023-10-01')), 
    travelDate: formatDate(new Date('2023-11-05')),
    numTravelers: 2,
    totalPrice: 39000, // 19500 * 2
    status: 'Confirmed' 
  },
  { 
    id: 'b002', 
    packageId: 'ne2', 
    packageName: 'Mystical Sikkim & Kanchenjunga Views', 
    userId: 'user02', 
    customerName: 'Bob The Explorer',
    customerEmail: 'bob@example.com',
    bookingDate: formatDate(new Date('2024-01-20')), 
    travelDate: formatDate(new Date('2024-03-10')),
    numTravelers: 1,
    totalPrice: 23500,
    status: 'Pending' 
  },
   { 
    id: 'b003', 
    packageId: 'ne1', 
    packageName: 'Meghalaya\'s Living Root Bridges & Caves', 
    userId: 'user02', 
    customerName: 'Bob The Explorer',
    customerEmail: 'bob@example.com',
    bookingDate: formatDate(new Date('2023-11-15')), 
    travelDate: formatDate(new Date('2023-12-01')),
    numTravelers: 1,
    totalPrice: 19500,
    status: 'Completed' 
  },
  { 
    id: 'b004', 
    packageId: 'ne4', 
    packageName: 'Assam Tea Gardens & Wildlife Safari', 
    userId: 'user03', 
    customerName: 'Mountain Mike',
    customerEmail: 'mike@example.com',
    bookingDate: formatDate(new Date('2024-03-01')), 
    travelDate: formatDate(new Date('2024-04-15')),
    numTravelers: 3,
    totalPrice: 55500, // 18500 * 3
    status: 'Confirmed' 
  },
];

export const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post1',
    title: 'A First-Timer\'s Guide to Exploring Meghalaya',
    slug: 'first-timers-guide-meghalaya',
    author: 'Admin User', // Or link to User ID
    date: formatDate(new Date('2024-03-10')),
    imageUrl: 'https://picsum.photos/seed/meghalayablogPost/800/400',
    summary: 'Planning your first trip to the "Abode of Clouds"? Here are essential tips, must-visit places, and what to expect in beautiful Meghalaya.',
    content: `<p>Meghalaya, often called the "Abode of Clouds," is a paradise for nature lovers and adventure seekers. This guide will help you plan an unforgettable first trip.</p>
              <h3 class="text-xl font-semibold mt-4 mb-2 text-secondary">Key Highlights:</h3>
              <ul class="list-disc list-inside space-y-1">
                <li><strong>Living Root Bridges:</strong> Marvel at these natural wonders in Cherrapunji (Sohra) and surrounding areas. The trek to the Double Decker Living Root Bridge is a must-do.</li>
                <li><strong>Waterfalls:</strong> Nohkalikai Falls, Seven Sisters Falls, and Elephant Falls are just a few of the spectacular cascades.</li>
                <li><strong>Caves:</strong> Explore fascinating cave systems like Mawsmai Cave and Arwah Cave.</li>
                <li><strong>Cleanest Village:</strong> Visit Mawlynnong, renowned as Asia's cleanest village.</li>
                <li><strong>Dawki River:</strong> Experience boating on the crystal-clear waters of the Umngot River in Dawki.</li>
              </ul>
              <h3 class="text-xl font-semibold mt-4 mb-2 text-secondary">Best Time to Visit:</h3>
              <p>The ideal time to visit Meghalaya is from October to April when the weather is pleasant. Monsoon (June to September) brings heavy rainfall, transforming the landscape into a lush green spectacle, but can sometimes disrupt travel.</p>
              <h3 class="text-xl font-semibold mt-4 mb-2 text-secondary">Getting Around:</h3>
              <p>Hiring a local taxi or a self-drive car (if you're comfortable with hilly terrain) are the best ways to explore. Public transport options are limited for reaching remote tourist spots.</p>
              <p class="mt-3">Remember to pack light rain gear, comfortable walking shoes, and respect local customs. Enjoy your adventure in Meghalaya!</p>`,
    tags: ['Meghalaya', 'Travel Guide', 'Adventure', 'Nature', 'First-Timers'],
  },
  {
    id: 'post2',
    title: 'Sikkim\'s Monasteries: A Journey into Serenity',
    slug: 'sikkim-monasteries-serenity',
    author: 'Admin User',
    date: formatDate(new Date('2024-02-25')),
    imageUrl: 'https://picsum.photos/seed/sikkimMonasteryBlog/800/400',
    summary: 'Discover the spiritual heart of Sikkim through its ancient and vibrant Buddhist monasteries. A guide to the most peaceful and culturally rich monastic sites.',
    content: `<p>Sikkim is dotted with numerous serene and ancient monasteries, offering a glimpse into its rich Buddhist heritage. Visiting these monasteries is a profound experience, filled with peace and spiritual energy.</p>
              <h3 class="text-xl font-semibold mt-4 mb-2 text-secondary">Must-Visit Monasteries:</h3>
              <ul class="list-disc list-inside space-y-1">
                <li><strong>Rumtek Monastery:</strong> One of the largest and most significant monasteries in Sikkim, the seat of the Karmapa.</li>
                <li><strong>Pemayangtse Monastery:</strong> Among the oldest monasteries, offering stunning views and intricate artwork.</li>
                <li><strong>Tashiding Monastery:</strong> Considered one of the holiest monasteries in Sikkim, located on a hilltop.</li>
                <li><strong>Enchey Monastery:</strong> An important seat of the Nyingma order, located in Gangtok.</li>
                <li><strong>Dubdi Monastery:</strong> Claimed to be the oldest monastery in Sikkim, near Yuksom.</li>
              </ul>
              <h3 class="text-xl font-semibold mt-4 mb-2 text-secondary">Monastery Etiquette:</h3>
              <p>Always walk clockwise around stupas and prayer wheels. Dress modestly (cover shoulders and knees). Ask for permission before taking photographs inside prayer halls. Maintain silence and respect the monks and their practices.</p>
              <p class="mt-3">A journey through Sikkim's monasteries is not just about sightseeing; it's about connecting with a timeless culture of peace and wisdom.</p>`,
    tags: ['Sikkim', 'Monasteries', 'Culture', 'Spirituality', 'Travel Guide'],
  },
  {
    id: 'post3',
    title: 'Exploring the Hornbill Festival: A Cultural Extravaganza in Nagaland',
    slug: 'hornbill-festival-nagaland-guide',
    author: 'Admin User',
    date: formatDate(new Date('2024-04-15')),
    imageUrl: 'https://picsum.photos/seed/hornbillBlog/800/400',
    summary: 'A comprehensive guide to experiencing the Hornbill Festival, Nagaland\'s vibrant celebration of tribal culture, traditions, and unity.',
    content: `<p>The Hornbill Festival, often dubbed the "Festival of Festivals," is an annual celebration held from December 1st to 10th in Kisama Heritage Village, near Kohima, Nagaland. It's a spectacular showcase of Naga culture.</p>
              <h3 class="text-xl font-semibold mt-4 mb-2 text-secondary">What to Expect:</h3>
              <ul class="list-disc list-inside space-y-1">
                <li><strong>Cultural Performances:</strong> Witness traditional dances, folk songs, and rituals performed by various Naga tribes.</li>
                <li><strong>Indigenous Games:</strong> Experience unique traditional sports and games.</li>
                <li><strong>Art & Craft Exhibitions:</strong> Explore intricate wood carvings, beadwork, textiles, and other Naga handicrafts.</li>
                <li><strong>Food Stalls:</strong> Savour authentic Naga cuisine, known for its distinct flavours and ingredients.</li>
                <li><strong>Music Concerts:</strong> Enjoy contemporary music performances in the evenings.</li>
              </ul>
              <h3 class="text-xl font-semibold mt-4 mb-2 text-secondary">Planning Your Trip:</h3>
              <p>Book accommodations and permits (Inner Line Permit for domestic tourists, Protected Area Permit for foreign tourists) well in advance as it's a popular event. Dress respectfully and be open to learning about the diverse Naga tribes.</p>
              <p class="mt-3">The Hornbill Festival is more than just a spectacle; it's an opportunity to understand and appreciate the rich cultural mosaic of Nagaland.</p>`,
    tags: ['Nagaland', 'Hornbill Festival', 'Culture', 'Travel Guide', 'Festivals'],
  },
  {
    id: 'post4',
    title: 'A Guide to Mizoram\'s Phawngpui National Park (Blue Mountain)',
    slug: 'phawngpui-blue-mountain-mizoram',
    author: 'Admin User',
    date: formatDate(new Date('2024-05-02')),
    imageUrl: 'https://picsum.photos/seed/mizoramPhawngpuiBlog/800/400',
    summary: 'Discover Phawngpui, the "Blue Mountain," Mizoram\'s highest peak and a biodiversity hotspot. A trekker\'s paradise offering stunning views and unique flora.',
    content: `<p>Phawngpui, also known as the Blue Mountain, is the highest peak in Mizoram and a revered natural landmark. It's part of the Phawngpui National Park, a haven for biodiversity.</p>
              <h3 class="text-xl font-semibold mt-4 mb-2 text-secondary">Trekking & Nature:</h3>
              <ul class="list-disc list-inside space-y-1">
                <li><strong>Scenic Trails:</strong> The trek to the summit offers breathtaking views of rolling hills and valleys, often shrouded in mist.</li>
                <li><strong>Rich Flora:</strong> The park is known for its beautiful orchids, rhododendrons, and diverse alpine vegetation.</li>
                <li><strong>Fauna:</strong> While elusive, the park is home to species like the clouded leopard, goral, serow, and Blyth's tragopan.</li>
                <li><strong>Birdwatching:</strong> A great spot for bird enthusiasts, with species like Hume's pheasant and various sunbirds.</li>
              </ul>
              <h3 class="text-xl font-semibold mt-4 mb-2 text-secondary">Best Time to Visit & Permits:</h3>
              <p>The ideal time for trekking is from October to April. Permits are required to enter the national park, which can be obtained from the Environment & Forest Department in Aizawl or through authorized tour operators.</p>
              <p class="mt-3">Phawngpui offers a serene escape into nature, rewarding visitors with its tranquil atmosphere and stunning vistas. Remember to practice responsible trekking and leave no trace.</p>`,
    tags: ['Mizoram', 'Phawngpui', 'Blue Mountain', 'Trekking', 'Nature', 'National Park'],
  },
];