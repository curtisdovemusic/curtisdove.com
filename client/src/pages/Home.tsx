import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import ProfilePicture from "../assets/CurtisDoveProfilePicture.jpg";
import PhoenixImage from "../assets/phoenix_image.webp";
import ShareButtons from "../components/ShareButtons";
import CollapsibleGenre from "../components/CollapsibleGenre";

// Music platforms information with your actual links
const MUSIC_PLATFORMS = [
  {
    name: "Spotify",
    icon: "fab fa-spotify",
    color: "#1DB954",
    url: "https://open.spotify.com/artist/5ZCP0tbgVY2Lx7JG0grqNR?si=S2VQDr7fSJu2NNjjjAuFxg"
  },
  {
    name: "Apple Music",
    icon: "fab fa-apple",
    color: "#fc3c44",
    url: "https://music.apple.com/us/artist/curtis-dove/1762565282"
  },
  {
    name: "Amazon Music",
    icon: "fab fa-amazon",
    color: "#FF9900", // Updated to orange
    url: "https://www.amazon.com/music/player/artists/B0DD4HQ6D3/curtis-dove"
  },
  {
    name: "YouTube",
    icon: "fab fa-youtube",
    color: "#FF0000",
    url: "https://www.youtube.com/@curtisdovemusic"
  },
  {
    name: "SoundCloud",
    icon: "fab fa-soundcloud",
    color: "#FF7700",
    url: "https://soundcloud.com/user-314281859"
  },
  {
    name: "Deezer",
    icon: "fab fa-deezer",
    color: "#00C7F2",
    url: "https://www.deezer.com/us/artist/277818781"
  },
  {
    name: "Tidal",
    icon: "fas fa-water",
    color: "#00FFFF",
    url: "https://tidal.com/artist/49781849"
  },
  {
    name: "iHeartRadio",
    icon: "fas fa-heartbeat",
    color: "#C6002B",
    url: "https://www.iheart.com/artist/curtis-dove-43752714/"
  },
  {
    name: "TikTok",
    icon: "fab fa-tiktok",
    color: "#FFFFFF", // Updated to white
    url: "https://www.tiktok.com/@curtisdovemusic?lang=en"
  },
  {
    name: "AudioMack",
    icon: "fas fa-music",
    color: "#FFA500",
    url: "https://audiomack.com/curtisdovemusic"
  }
];

// Social media profiles
const SOCIAL_MEDIA = [
  { name: "Instagram", icon: "fab fa-instagram", url: "https://www.instagram.com/curtisdovemusic" },
  { name: "Facebook", icon: "fab fa-facebook-f", url: "https://www.facebook.com/curtisdovemusic" },
  { name: "TikTok", icon: "fab fa-tiktok", url: "https://www.tiktok.com/@curtisdovemusic?lang=en" },
  { name: "YouTube", icon: "fab fa-youtube", url: "https://www.youtube.com/@curtisdovemusic" },
  { 
    name: "Threads", 
    url: "https://www.threads.com/@curtisdovemusic?igshid=NTc4MTIwNjQ2YQ==",
    customIcon: true, // Flag to use custom rendering
    render: (className: string) => (
      <span className={className}>@</span>
    )
  }
];

// Define section type
type Section = {
  id: string;
  label: string;
  isLink?: boolean;
};

// Navigation sections
const SECTIONS: Section[] = [
  { id: "home", label: "Home" },
  { id: "music", label: "Music" },
  { id: "artist-picks", label: "Artist Pick" },
  { id: "videos", label: "Videos" },
  { id: "press", label: "In The Press" },
  { id: "bio", label: "Bio" },
  { id: "contact", label: "Contact" }
];

// Define song type with optional properties
type Song = {
  title: string;
  streams: number;
  listeners: number;
  date: string;
  tag?: string;
  featured?: boolean;
};

// Top songs data from your spreadsheet
const TOP_SONGS: Record<string, Song[]> = {
  afrobeats: [
    { title: "Lagos Inferno", streams: 6915, listeners: 3146, date: "Jan 2025" },
    { title: "Lagos Islands", streams: 6109, listeners: 2738, date: "Jan 2025" },
    { title: "Island Breeze Serenade", streams: 3948, listeners: 1954, date: "Mar 2025" },
    { title: "Lagos Luv", streams: 1887, listeners: 1009, date: "Feb 2025" },
    { title: "Island Breeze", streams: 1336, listeners: 765, date: "Jan 2025" },
    { title: "Ọ Dị M Mma (Feels So Right)", streams: 734, listeners: 334, date: "May 2025", tag: "New" }
  ],
  pop: [
    { title: "One Wish", streams: 7978, listeners: 4462, date: "Apr 2025", tag: "Hot" },
    { title: "The Lounge Love", streams: 2340, listeners: 1118, date: "Feb 2025" },
    { title: "Sweet Poison", streams: 2075, listeners: 1059, date: "Apr 2025" },
    { title: "Beachside Fire", streams: 1839, listeners: 962, date: "Feb 2025" },
    { title: "Fire & Wine", streams: 959, listeners: 471, date: "Feb 2025", featured: true }
  ],
  rockMetal: [
    { title: "Rebuild", streams: 1878, listeners: 1165, date: "Nov 2024" },
    { title: "Behind the Mask", streams: 1433, listeners: 1064, date: "Nov 2024" },
    { title: "Beyond the Ashes (Nu Metal)", streams: 631, listeners: 396, date: "Dec 2024" },
    { title: "Burn it Down", streams: 530, listeners: 254, date: "Oct 2024" },
    { title: "Dust and Bones", streams: 524, listeners: 315, date: "Nov 2024" }
  ],
  rnb: [
    { title: "Whispers in the Wind", streams: 4464, listeners: 117, date: "Oct 2024" },
    { title: "Slow Fire", streams: 1616, listeners: 932, date: "Mar 2025" },
    { title: "Reflections of Us", streams: 1271, listeners: 953, date: "Nov 2024" },
    { title: "Wine & Kiss", streams: 849, listeners: 402, date: "Mar 2025" },
    { title: "Lose Myself in You", streams: 682, listeners: 291, date: "Mar 2025" }
  ],
  hiphop: [
    { title: "Kano Love", streams: 1990, listeners: 975, date: "Feb 2025" },
    { title: "Brother Eternal", streams: 1241, listeners: 610, date: "Dec 2024" },
    { title: "Black Heat", streams: 929, listeners: 640, date: "Dec 2024" },
    { title: "Detty December", streams: 487, listeners: 262, date: "Apr 2025", tag: "New" },
    { title: "Baller Life", streams: 163, listeners: 73, date: "Apr 2025", tag: "New" }
  ]
};

export default function Home() {
  const [currentSection, setCurrentSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for custom cursor effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Update custom cursor position
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
  }, [mousePosition]);
  
  // Determine active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map(section => section.id);
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = 300; // Adjust as needed
          
          if (rect.top <= offset && rect.bottom >= offset) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    setIsMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Custom music note cursor effect */}
      <div 
        ref={cursorRef}
        className="hidden md:block fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 opacity-80"
        style={{ 
          transition: 'transform 0.15s ease-out',
          width: '24px',
          height: '24px',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
          <path d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" />
        </svg>
      </div>
      
      {/* Fixed Navigation */}
      <nav className={`fixed w-full top-0 z-40 transition-all duration-500 ${scrollY > 50 ? 'bg-black/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="text-2xl font-bold flex items-center gap-2">
              <span className="text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" />
                </svg>
              </span>

            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {SECTIONS.map((section) => (
                section.isLink ? (
                  <Link 
                    key={section.id}
                    href={`/${section.id}`}
                    className="relative px-2 py-1 uppercase tracking-wider text-sm font-medium transition-colors text-amber-500 hover:text-white"
                  >
                    {section.label}
                  </Link>
                ) : (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`relative px-2 py-1 uppercase tracking-wider text-sm font-medium transition-colors ${
                      currentSection === section.id ? 'text-amber-500' : 'text-white hover:text-amber-500'
                    }`}
                  >
                    {section.label}
                    {currentSection === section.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"></span>
                    )}
                  </button>
                )
              ))}
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-2xl focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed inset-0 bg-black z-30 flex flex-col items-center justify-center transform transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container px-6 py-10">
          <div className="flex flex-col space-y-6 items-center">
            {SECTIONS.map((section) => 
              section.isLink ? (
                <Link
                  key={section.id}
                  href={`/${section.id}`}
                  className="text-2xl uppercase font-bold text-amber-500 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {section.label}
                </Link>
              ) : (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-2xl uppercase font-bold hover:text-amber-500 transition-colors"
                >
                  {section.label}
                </button>
              )
            )}
            
            <div className="flex space-x-6 mt-10">
              {SOCIAL_MEDIA.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 hover:bg-amber-500 hover:text-black transition-colors"
                >
                  {social.customIcon ? 
                    <span className="text-xl font-bold">@</span> : 
                    <i className={social.icon}></i>
                  }
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10"></div>
          
          {/* Background gradient orbs */}
          <div className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-purple-500/10 blur-[100px]"></div>
          <div className="absolute bottom-[30%] left-[15%] w-80 h-80 rounded-full bg-amber-500/10 blur-[100px]"></div>
          <div className="absolute top-[40%] left-[25%] w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60 z-5"></div>
          
          {/* Background image */}
          <img 
            src="attached_assets/CurtisDoveProfilePicture.jpg" 
            alt="Curtis Dove" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Hero content */}
        <div className="container mx-auto px-6 relative z-10 mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative mb-6">
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 via-amber-500 to-orange-500 blur-xl opacity-30 rounded-lg"></div>
              <h1 className="relative text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-400 to-amber-500">
                CURTIS DOVE
              </h1>
            </div>
            
            <div className="relative inline-block mb-12">
              <span className="absolute -inset-1 -z-10 bg-gradient-to-r from-purple-600 via-amber-500 to-orange-500 blur-sm opacity-50 rounded-lg"></span>
              <h2 className="relative text-2xl md:text-3xl text-white font-medium tracking-wider py-2 px-6 rounded-lg backdrop-blur-sm">
                BOUNDARY-BREAKING ARTIST
              </h2>
            </div>
            
            <div className="w-full max-w-2xl mx-auto mb-10 bg-black/40 backdrop-blur-sm rounded-md p-4">
              <div className="flex flex-wrap justify-center text-xl md:text-2xl text-white/90 mb-3">
                <span className="text-amber-400 font-semibold mx-1">8 ALBUMS</span>
                <span className="mx-1">,</span>
                <span className="text-purple-400 font-semibold mx-1">33 SINGLES</span>
                <span className="mx-1">,</span>
                <span className="text-blue-400 font-semibold mx-1">1 COMPILATION</span>
                <span className="mx-1">,</span>
                <span className="text-green-400 font-semibold mx-1">141+ SONGS</span>
              </div>
              
              <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto my-3"></div>
              
              <h3 className="text-xl md:text-2xl text-white/90 text-center font-light">
                Available worldwide on all streaming platforms
              </h3>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {MUSIC_PLATFORMS.map((platform, index) => (
                <a 
                  key={index}
                  href={platform.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-zinc-800 transition-all transform hover:scale-105 group border border-transparent hover:border-amber-500/50"
                >
                  <i className={`${platform.icon} transition-all duration-300 group-hover:text-amber-500`} style={{color: platform.color}}></i>
                  <span className="text-sm font-medium group-hover:text-amber-400 transition-colors duration-300">{platform.name}</span>
                </a>
              ))}
            </div>
            
            <div>
              <button 
                onClick={() => scrollToSection('music')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold transition-all transform hover:scale-105"
              >
                <span className="flex items-center">
                  <i className="fas fa-headphones-alt mr-2"></i>
                  LISTEN NOW
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Removed the scroll indicator arrow that was positioned poorly on mobile devices */}
      </section>
      
      {/* Music Section */}
      <section id="music" className="py-24 bg-gradient-to-b from-black via-zinc-900/95 to-black">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
              MY <span className="text-amber-500">MUSIC</span>
            </h2>
            
            {/* No genre filters */}
            
            {/* Featured music with large player */}
            <div className="mb-16">
              <h3 className="text-4xl font-bold text-center mb-6">
                <span className="text-white">FEATURED </span>
                <span className="text-amber-500">PLAYLISTS</span>
              </h3>
              <div className="max-w-5xl mx-auto">
                {/* Top 5 Playlists Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {/* Featured Playlist - Lagos Nights & Island Lights */}
                  <div className="col-span-full bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <span className="w-2 h-8 bg-yellow-500 rounded-full mr-3"></span>
                        <h3 className="text-xl font-bold">Lagos Nights & Island Lights</h3>
                      </div>
                      <div className="aspect-video">
                        <iframe 
                          style={{ borderRadius: '12px' }} 
                          src="https://open.spotify.com/embed/playlist/0OMB5854ceBpFP6vtT1uHn?utm_source=generator" 
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          allowFullScreen={true}
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                          loading="lazy">
                        </iframe>
                      </div>
                    </div>
                  </div>
                  
                  {/* After Dark in Lagos */}
                  <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <span className="w-2 h-6 bg-yellow-500 rounded-full mr-2"></span>
                        <h3 className="text-lg font-bold">After Dark in Lagos</h3>
                      </div>
                      <p className="text-sm text-white/60 mb-4">The Explicit Side of Afrobeats</p>
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe 
                          style={{ borderRadius: '12px' }} 
                          src="https://open.spotify.com/embed/playlist/7qWyO3vNYIWRgiGcTQT9Bd?utm_source=generator" 
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          allowFullScreen={true}
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                          loading="lazy">
                        </iframe>
                      </div>
                    </div>
                  </div>
                  
                  {/* My Love Songs */}
                  <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <span className="w-2 h-6 bg-purple-500 rounded-full mr-2"></span>
                        <h3 className="text-lg font-bold">Curtis Dove - My Love Songs</h3>
                      </div>
                      <p className="text-sm text-white/60 mb-4">Heartfelt love songs across genres</p>
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe 
                          style={{ borderRadius: '12px' }} 
                          src="https://open.spotify.com/embed/playlist/13nhg6SPkxfMaAkj2Cra6M?utm_source=generator" 
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          allowFullScreen={true}
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                          loading="lazy">
                        </iframe>
                      </div>
                    </div>
                  </div>
                  
                  {/* The Ashes Trilogy */}
                  <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-red-500/20 hover:border-red-500/40 transition-all">
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <span className="w-2 h-6 bg-red-500 rounded-full mr-2"></span>
                        <h3 className="text-lg font-bold">The Ashes Trilogy</h3>
                      </div>
                      <p className="text-sm text-white/60 mb-4">A Journey of Renewal</p>
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe 
                          style={{ borderRadius: '12px' }} 
                          src="https://open.spotify.com/embed/playlist/7lUurLZ2vBhayCAc96tTp2?utm_source=generator" 
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          allowFullScreen={true}
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                          loading="lazy">
                        </iframe>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Removed Playlists link */}
              </div>
            </div>
            
            {/* Artist Pick - Featured Songs Section */}
            <section id="artist-picks" className="py-16 bg-gradient-to-b from-zinc-900/90 to-black relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
              
              {/* Background Elements */}
              <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-[#ffb703]/10 blur-[150px]"></div>
              <div className="absolute bottom-1/4 left-10 w-64 h-64 rounded-full bg-[#219ebc]/10 blur-[100px]"></div>
              
              <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-white">ARTIST </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb703] to-[#fb8500]">PICKS</span>
                      </h2>
                      <p className="text-lg text-white/70">Featured tracks from my top genre collections</p>
                    </div>

                  </div>
                  
                  {/* Collapsible Genre Sections */}
                  <div className="space-y-8">
                    {/* Afrosounds Collapsible */}
                    <CollapsibleGenre
                      title="Afrosounds"
                      genre="afrosounds"
                      description="My favorite Afrobeat, Afrofusion, and Afropop songs with tropical upbeat rhythms and feel-good dance vibes that capture the energy of Lagos nightlife"
                      songs={[
                        { number: "01", title: "Lagos Nights & Island Lights", genre: "Afrobeat" },
                        { number: "02", title: "Island Gal", genre: "Afrobeat" },
                        { number: "03", title: "Lagos Inferno", genre: "Afrobeat" }
                      ]}
                    />
                    
                    {/* Rock Collapsible */}
                    <CollapsibleGenre 
                      title="Rock"
                      genre="rock"
                      description="My favorite hard-hitting rock tracks featuring powerful guitar riffs, intense drums, and emotional vocals that range from alternative rock to metal elements"
                      songs={[
                        { number: "01", title: "The Ashes (Pt. 1)", genre: "Rock" },
                        { number: "02", title: "Falling", genre: "Rock" },
                        { number: "03", title: "The Burning (Pt. 2)", genre: "Rock" }
                      ]}
                    />
                    
                    {/* Pop Collapsible */}
                    <CollapsibleGenre 
                      title="Pop"
                      genre="pop"
                      description="My favorite catchy melodies, heartfelt lyrics, and radio-ready hooks with crisp contemporary pop production that blends emotion with uplifting beats"
                      songs={[
                        { number: "01", title: "One Wish", genre: "Pop" },
                        { number: "02", title: "Nobody Better", genre: "Pop" },
                        { number: "03", title: "Love in Letters", genre: "Pop" }
                      ]}
                    />
                    
                    {/* Hip-Hop Collapsible */}
                    <CollapsibleGenre 
                      title="Hip-Hop"
                      genre="hiphop"
                      description="My favorite contemporary hip-hop tracks with hard-hitting beats, smooth flows, and authentic urban storytelling that captures the essence of street culture"
                      songs={[
                        { number: "01", title: "Shorty You a Vibe", genre: "Hip-Hop" },
                        { number: "02", title: "Baller Life", genre: "Hip-Hop" },
                        { number: "03", title: "Detty December", genre: "Hip-Hop" }
                      ]}
                    />
                    
                    {/* Explicit Collapsible */}
                    <CollapsibleGenre 
                      title="Explicit"
                      genre="explicit"
                      description="My favorite raw, unfiltered tracks with mature themes and authentic street language that delivers uncompromising honesty for adult listeners"
                      songs={[
                        { number: "01", title: "Big Ashawo", genre: "Explicit" },
                        { number: "02", title: "Another Sad Story", genre: "Explicit" },
                        { number: "03", title: "King of Hearts", genre: "Explicit" }
                      ]}
                    />
                  </div>
                </div>
              </div>
            </section>
            
            {/* Top 20 Feature Removed */}
            
            {/* Listening options section */}
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-center mb-10">
                LISTEN <span className="text-amber-500">EVERYWHERE</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {MUSIC_PLATFORMS.map((platform, index) => (
                  <a 
                    key={index}
                    href={platform.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-xl bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-800 transition-all transform hover:scale-105 border border-transparent hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/20"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div 
                        className="w-16 h-16 flex items-center justify-center mb-4 rounded-full transition-transform duration-500 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-amber-500/20" 
                        style={{ backgroundColor: `${platform.color}20` }}
                      >
                        <i className={`${platform.icon} text-3xl transition-all duration-300 group-hover:text-amber-500`} style={{color: platform.color}}></i>
                      </div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors duration-300">{platform.name}</h4>
                      <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">Stream my complete catalog</p>
                      <div className="mt-4 flex items-center text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <span className="mr-2">Listen now</span>
                        <i className="fas fa-arrow-right text-sm animate-pulse"></i>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Videos Section */}
      <section id="videos" className="py-24 bg-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-600/5 blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-zinc-900/20 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-white">FEATURED </span>
            <span className="text-amber-500">VIDEOS</span>
          </h2>
          
          <div className="max-w-4xl mx-auto mb-20">
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                className="aspect-video rounded-xl"
                src="https://www.youtube.com/embed/bvyBlA0S4BA" 
                title="Curtis Dove Music Video" 
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="https://www.youtube.com/@curtisdovemusic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold transition-all transform hover:scale-105"
            >
              <i className="fab fa-youtube mr-2"></i>
              VIEW ALL VIDEOS
            </a>
          </div>
        </div>
      </section>
      
      {/* Press Section */}
      <section id="press" className="py-24 bg-zinc-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-amber-500/5 blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-white">IN THE </span>
            <span className="text-amber-500">PRESS</span>
          </h2>
          
          <div className="max-w-4xl mx-auto bg-zinc-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-amber-500/20 shadow-lg hover:border-amber-500/40 transition-all">
            {/* Banner image with hover effect */}
            <div className="group relative w-full overflow-hidden" style={{ height: "450px" }}>
              <img 
                src={PhoenixImage} 
                alt="Phoenix rising from ashes - symbolic imagery" 
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-zinc-900/80 backdrop-blur-sm py-2 px-4 rounded-lg border border-amber-500/30">
                <h3 className="text-xl font-bold text-white">Featured Artist Review</h3>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-amber-500/30 to-red-500/20 rounded-xl flex items-center justify-center shadow-lg border border-amber-500/30">
                  <div className="text-center">
                    <i className="fas fa-headphones-alt text-amber-500 text-2xl mb-2"></i>
                    <div className="text-sm font-bold text-white">MUSIC REVIEW</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">The Sounds Won't Stop</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-amber-500 text-lg">★</span>
                      ))}
                    </div>
                    <span className="text-white/60 ml-2 text-sm">Featured Review</span>
                  </div>
                  <p className="text-white/80 italic">
                    "Curtis Dove is a true artistic chameleon, moving effortlessly between genres while maintaining his authentic voice."
                  </p>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <blockquote className="border-l-4 border-amber-500/50 pl-4 italic text-white/70">
                  "...the range of talents and styles that Dove incorporates into his music is truly impressive. He's bringing a level of professionalism to his art that is setting him up for some bigger stages as his career continues."
                </blockquote>
                
                <p className="text-white/80 mt-6">
                  Curtis Dove's genre-spanning abilities were highlighted in a featured review by music publication The Sounds Won't Stop, praising his versatility and unique artistic voice across different styles of music.
                </p>
                
                <div className="mt-6 text-center">
                  <a 
                    href="https://www.thesoundswontstop.com/curtis-dove" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-4 py-2 rounded-md bg-amber-500 text-black font-medium hover:bg-amber-400 transition-colors"
                  >
                    Read Full Review
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bio Section */}
      <section id="bio" className="py-24 bg-zinc-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-amber-500/5 blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-white">ABOUT </span>
            <span className="text-amber-500">CURTIS DOVE</span>
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-500 via-purple-500 to-red-500 opacity-0 group-hover:opacity-50 blur-xl rounded-2xl transition-all duration-700"></div>
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src={ProfilePicture} 
                    alt="Curtis Dove portrait" 
                    className="w-full h-auto object-cover shadow-2xl transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 px-6 py-3 bg-zinc-800/90 backdrop-blur-sm rounded-xl border border-amber-500/30 shadow-xl transform group-hover:translate-y-2 group-hover:-translate-x-2 transition-transform duration-500">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-music text-amber-500"></i>
                    <div>
                      <div className="text-sm font-bold">141+ Songs</div>
                      <div className="text-xs text-white/60">Available on all platforms</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <p className="text-xl leading-relaxed text-white/90">
                  Curtis Dove is a boundary-pushing artist known for blending genres and creating a sound uniquely his own. With over 141+ songs released across major streaming platforms, Curtis has developed a diverse catalog that fuses elements from across the musical spectrum.
                </p>
                
                <p className="text-xl leading-relaxed text-white/90">
                  His music draws inspiration from a diverse range of influences, creating sonic experiences that resonate with listeners across the globe. Curtis has built a dedicated following with his authentic approach to songwriting and performance.
                </p>
                
                <p className="text-xl leading-relaxed text-white/90">
                  Having performed at venues around the country, Curtis continues to push creative boundaries with each new release, crafting songs that tell stories while keeping the audience moving.
                </p>
                
                <div className="pt-6">
                  <h3 className="text-2xl font-bold mb-6 text-white">Musical Influences</h3>
                  <div className="flex flex-wrap gap-3">
                    {/* Musical influences with glowing effect */}
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Afrobeat</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Afro-fusion</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Afropop</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">R&B</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Pop</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Alternative Rock</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Dance</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Club</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Tropical</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Tropical Pop</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Dance-pop</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Afro-house</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Darkwave</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Soul</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Hip-Hop</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Trap Soul</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Highlife</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Funk</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Reggae</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Indie</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">World Music</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Electronic</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Soft Rock</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-zinc-900 to-transparent opacity-80"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-amber-500/5 blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-white">CONTACT </span>
            <span className="text-amber-500">INFORMATION</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            {/* Social Media Links */}
            <div className="flex justify-center mb-16">
              <div className="flex flex-wrap justify-center gap-8">
                {SOCIAL_MEDIA.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-zinc-800 group-hover:bg-amber-500 transition-all transform group-hover:scale-110">
                      {social.customIcon ? 
                        <span className="text-2xl font-bold group-hover:text-black transition-colors">@</span> : 
                        <i className={`${social.icon} text-2xl group-hover:text-black transition-colors`}></i>
                      }
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* WhatsApp Section */}
            <div className="text-center bg-zinc-900 text-white py-12 px-4 rounded-xl mb-16">
              <h3 className="text-3xl font-bold mb-6">Stay Connected on WhatsApp 📲</h3>
              <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
                Whether you want to chat directly or join the community for updates, I've got you covered.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://wa.me/15712461177" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
                >
                  💬 Chat with Curtis
                </a>
                <a 
                  href="https://whatsapp.com/channel/0029Vb5ovLS8kyyEmh98OP2j" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
                >
                  📢 Join the Fan Channel
                </a>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="max-w-xl mx-auto">
              <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-xl text-center hover:bg-zinc-900 transition-all border border-amber-500/20">
                <div className="text-amber-500 text-3xl mb-4">
                  <i className="fas fa-envelope"></i>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Email</h4>
                <p className="text-white/70">CurtisDoveMusic@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-6">
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                className="text-3xl font-bold text-white hover:text-amber-500 transition-colors"
              >
                CURTIS DOVE
              </a>
            </div>
            
            <div className="max-w-xl mx-auto mb-8">
              <p className="text-white/60 text-sm">
                Boundary-pushing, genre-blending artist fusing Afrobeat, Afro-fusion, Afropop, R&B with Pop, Alternative Rock, Dance, Darkwave, and Club music. 20,000+ monthly Spotify listeners and counting.
              </p>
            </div>
            
            <div className="flex justify-center space-x-4 mb-8">
              {SOCIAL_MEDIA.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black transition-colors"
                >
                  {social.customIcon ? 
                    <span className="text-base font-bold">@</span> : 
                    <i className={social.icon}></i>
                  }
                </a>
              ))}
            </div>
            
            {/* Share buttons */}
            <ShareButtons className="mb-8" />
            
            <div className="flex justify-center mb-10">
              <nav className="flex flex-wrap justify-center gap-x-6">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-sm font-medium text-white/60 hover:text-amber-500 transition-colors px-2 py-1"
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <p className="text-white/40 text-xs">
              &copy; {new Date().getFullYear()} Curtis Dove Music. All rights reserved.
            </p>
            <p className="text-white/40 text-xs mt-1">
              Dove Music, LLC
            </p>
          </div>
        </div>
      </footer>
      
      {/* Add these animation classes to make them available */}
      <div className="hidden animate-fade-in animate-slide-up animate-slide-in-right animate-slide-in-left"></div>
    </div>
  );
}
