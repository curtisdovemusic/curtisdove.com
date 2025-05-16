// Album data
export const albums = [
  {
    title: "Midnight Echoes",
    type: "EP",
    year: "2023",
    tracks: 5,
    duration: "18 min",
    image: "https://images.unsplash.com/photo-1544656376-ffe19d4b7353?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    featured: true,
    tag: "Featured",
    tagColor: "text-accent"
  },
  {
    title: "Lagos to Tokyo",
    type: "Album",
    year: "2022",
    tracks: 12,
    duration: "42 min",
    image: "https://images.unsplash.com/photo-1596120236172-231808879f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    featured: true,
    tag: "Popular",
    tagColor: "text-[hsl(var(--light-text))]"
  },
  {
    title: "Soul Rhythms",
    type: "Single",
    year: "2021",
    tracks: 1,
    duration: "3:45 min",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    featured: true,
    tag: "Single",
    tagColor: "text-[hsl(var(--cyan))]"
  }
];

// Shows data
export const shows = [
  {
    day: "24",
    month: "June",
    year: "2023",
    time: "8:00 PM",
    venue: "The Electric Room",
    location: "San Francisco, CA",
    tag: "Album Release Show",
    tagColor: "bg-accent/10 text-accent",
    ticketLink: "#"
  },
  {
    day: "15",
    month: "July",
    year: "2023",
    time: "9:30 PM",
    venue: "Rhythm Lounge",
    location: "Los Angeles, CA",
    tag: "Featured Artist",
    tagColor: "bg-[hsl(var(--purple))]/10 text-[hsl(var(--purple))]",
    ticketLink: "#"
  },
  {
    day: "29",
    month: "August",
    year: "2023",
    time: "7:00 PM",
    venue: "Blue Note Tokyo",
    location: "Tokyo, Japan",
    tag: "International Show",
    tagColor: "bg-[hsl(var(--cyan))]/10 text-[hsl(var(--cyan))]",
    ticketLink: "#"
  }
];
