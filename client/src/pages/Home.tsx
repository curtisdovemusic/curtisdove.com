import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

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
    url: "#"
  },
  {
    name: "Amazon Music",
    icon: "fab fa-amazon",
    color: "#232F3E",
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
    name: "AudioMack",
    icon: "fas fa-music",
    color: "#FFA500",
    url: "https://audiomack.com/curtisdove"
  }
];

// Social media profiles
const SOCIAL_MEDIA = [
  { name: "Instagram", icon: "fab fa-instagram", url: "https://www.instagram.com/curtisdovemusic" },
  { name: "Facebook", icon: "fab fa-facebook-f", url: "https://www.facebook.com/curtisdovemusic" },
  { name: "TikTok", icon: "fab fa-tiktok", url: "https://www.tiktok.com/@curtisdovemusic" },
  { name: "YouTube", icon: "fab fa-youtube", url: "https://www.youtube.com/@curtisdovemusic" }
];

// Navigation sections
const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "music", label: "Music" },
  { id: "videos", label: "Videos" },
  { id: "bio", label: "Bio" },
  { id: "contact", label: "Contact" },
  { id: "/playlists", label: "Playlists", isLink: true }
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
      {/* Custom cursor effect */}
      <div 
        ref={cursorRef}
        className="hidden md:block fixed w-8 h-8 rounded-full border-2 border-amber-500 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 opacity-70 mix-blend-difference"
        style={{ 
          transition: 'transform 0.15s ease-out, width 0.2s, height 0.2s',
        }}
      ></div>
      
      {/* Fixed Navigation */}
      <nav className={`fixed w-full top-0 z-40 transition-all duration-500 ${scrollY > 50 ? 'bg-black/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="text-2xl font-bold">
              CURTIS DOVE MUSIC
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {SECTIONS.map((section) => (
                section.isLink ? (
                  <Link 
                    key={section.id}
                    href={section.id}
                    className="relative px-2 py-1 uppercase tracking-wider text-sm font-medium transition-colors text-white hover:text-amber-500"
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
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-2xl uppercase font-bold hover:text-amber-500 transition-colors"
              >
                {section.label}
              </button>
            ))}
            
            <div className="flex space-x-6 mt-10">
              {SOCIAL_MEDIA.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 hover:bg-amber-500 hover:text-black transition-colors"
                >
                  <i className={social.icon}></i>
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
            src="/attached_assets/CurtisDoveProfilePicture.jpg" 
            alt="Curtis Dove" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Hero content */}
        <div className="container mx-auto px-6 relative z-10 mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              CURTIS DOVE MUSIC
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
              Boundary-pushing artist with over 135 songs across streaming platforms
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {MUSIC_PLATFORMS.map((platform, index) => (
                <a 
                  key={index}
                  href={platform.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all group"
                >
                  <i className={`${platform.icon}`} style={{color: platform.color}}></i>
                  <span className="text-sm font-medium">{platform.name}</span>
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
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => scrollToSection('music')}
            className="text-white text-3xl focus:outline-none"
          >
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
      </section>
      
      {/* Music Section */}
      <section id="music" className="py-24 bg-gradient-to-b from-black via-zinc-900/95 to-black">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
              MY <span className="text-amber-500">MUSIC</span>
            </h2>
            
            {/* Genre filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <button 
                onClick={() => setSelectedGenre("all")}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedGenre === "all" 
                    ? "bg-amber-500 text-black" 
                    : "bg-white/10 text-white hover:bg-amber-500/80 hover:text-black"
                }`}
              >
                All Genres
              </button>
              <button 
                onClick={() => setSelectedGenre("afrobeats")}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedGenre === "afrobeats" 
                    ? "bg-yellow-500 text-black" 
                    : "bg-white/10 text-white hover:bg-yellow-500/80 hover:text-black"
                }`}
              >
                Afrobeats
              </button>
              <button 
                onClick={() => setSelectedGenre("pop")}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedGenre === "pop" 
                    ? "bg-pink-500 text-black" 
                    : "bg-white/10 text-white hover:bg-pink-500/80 hover:text-black"
                }`}
              >
                Pop
              </button>
              <button 
                onClick={() => setSelectedGenre("rockMetal")}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedGenre === "rockMetal" 
                    ? "bg-red-600 text-white" 
                    : "bg-white/10 text-white hover:bg-red-600/80 hover:text-white"
                }`}
              >
                Rock/Metal
              </button>
              <button 
                onClick={() => setSelectedGenre("hiphop")}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedGenre === "hiphop" 
                    ? "bg-blue-500 text-white" 
                    : "bg-white/10 text-white hover:bg-blue-500/80 hover:text-white"
                }`}
              >
                Hip-Hop
              </button>
              <button 
                onClick={() => setSelectedGenre("rnb")}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedGenre === "rnb" 
                    ? "bg-purple-500 text-white" 
                    : "bg-white/10 text-white hover:bg-purple-500/80 hover:text-white"
                }`}
              >
                R&B
              </button>
            </div>
            
            {/* Featured music with large player */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-center mb-6">
                <span className="text-white">CURTIS DOVE </span>
                <span className="text-amber-500">COMPLETE</span>
              </h3>
              <div className="max-w-4xl mx-auto rounded-2xl bg-zinc-900/50 p-6 backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <iframe 
                    style={{ borderRadius: '12px' }} 
                    src="https://open.spotify.com/embed/playlist/0OMB5854ceBpFP6vtT1uHn?utm_source=generator" 
                    width="100%" 
                    height="352" 
                    frameBorder="0" 
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy">
                  </iframe>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 border-2 border-amber-500/30 rounded-xl pointer-events-none"></div>
                </div>
              </div>
            </div>
            
            {/* Top Songs Section */}
            <div className={`${selectedGenre !== "all" && selectedGenre !== "afrobeats" ? "hidden" : ""}`}>
              <div className="flex items-center mb-6">
                <span className="w-2 h-8 bg-yellow-500 rounded-full mr-3"></span>
                <h3 className="text-2xl font-bold">Afrobeats Hits</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {TOP_SONGS.afrobeats.map((song, index) => (
                  <div key={`afro-${index}`} className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/50 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-white mb-1">{song.title}</h4>
                        <p className="text-white/60 text-sm">{song.date}</p>
                      </div>
                      {song.tag && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-500 text-black rounded-full">
                          {song.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-white/60 text-sm">
                        <span className="flex items-center mr-3"><i className="fas fa-headphones text-xs mr-1"></i> {song.listeners.toLocaleString()}</span>
                        <span className="flex items-center"><i className="fas fa-play text-xs mr-1"></i> {song.streams.toLocaleString()}</span>
                      </div>
                      <a 
                        href={`https://open.spotify.com/search/${encodeURIComponent(`Curtis Dove ${song.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all"
                      >
                        <i className="fab fa-spotify"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pop Section */}
            <div className={`${selectedGenre !== "all" && selectedGenre !== "pop" ? "hidden" : ""}`}>
              <div className="flex items-center mb-6">
                <span className="w-2 h-8 bg-pink-500 rounded-full mr-3"></span>
                <h3 className="text-2xl font-bold">Pop Hits</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {TOP_SONGS.pop.map((song, index) => (
                  <div key={`pop-${index}`} className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-lg border border-pink-500/20 hover:border-pink-500/50 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-white mb-1">{song.title}</h4>
                        <p className="text-white/60 text-sm">{song.date}</p>
                      </div>
                      {song.tag && (
                        <span className="px-2 py-1 text-xs font-medium bg-pink-500 text-white rounded-full">
                          {song.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-white/60 text-sm">
                        <span className="flex items-center mr-3"><i className="fas fa-headphones text-xs mr-1"></i> {song.listeners.toLocaleString()}</span>
                        <span className="flex items-center"><i className="fas fa-play text-xs mr-1"></i> {song.streams.toLocaleString()}</span>
                      </div>
                      <a 
                        href={`https://open.spotify.com/search/${encodeURIComponent(`Curtis Dove ${song.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all"
                      >
                        <i className="fab fa-spotify"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rock/Metal Section */}
            <div className={`${selectedGenre !== "all" && selectedGenre !== "rockMetal" ? "hidden" : ""}`}>
              <div className="flex items-center mb-6">
                <span className="w-2 h-8 bg-red-600 rounded-full mr-3"></span>
                <h3 className="text-2xl font-bold">Rock & Metal</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {TOP_SONGS.rockMetal.map((song, index) => (
                  <div key={`rock-${index}`} className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-lg border border-red-600/20 hover:border-red-600/50 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-white mb-1">{song.title}</h4>
                        <p className="text-white/60 text-sm">{song.date}</p>
                      </div>
                      {song.tag && (
                        <span className="px-2 py-1 text-xs font-medium bg-red-600 text-white rounded-full">
                          {song.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-white/60 text-sm">
                        <span className="flex items-center mr-3"><i className="fas fa-headphones text-xs mr-1"></i> {song.listeners.toLocaleString()}</span>
                        <span className="flex items-center"><i className="fas fa-play text-xs mr-1"></i> {song.streams.toLocaleString()}</span>
                      </div>
                      <a 
                        href={`https://open.spotify.com/search/${encodeURIComponent(`Curtis Dove ${song.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                      >
                        <i className="fab fa-spotify"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hip-Hop Section */}
            <div className={`${selectedGenre !== "all" && selectedGenre !== "hiphop" ? "hidden" : ""}`}>
              <div className="flex items-center mb-6">
                <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                <h3 className="text-2xl font-bold">Hip-Hop</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {TOP_SONGS.hiphop.map((song, index) => (
                  <div key={`hiphop-${index}`} className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-white mb-1">{song.title}</h4>
                        <p className="text-white/60 text-sm">{song.date}</p>
                      </div>
                      {song.tag && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                          {song.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-white/60 text-sm">
                        <span className="flex items-center mr-3"><i className="fas fa-headphones text-xs mr-1"></i> {song.listeners.toLocaleString()}</span>
                        <span className="flex items-center"><i className="fas fa-play text-xs mr-1"></i> {song.streams.toLocaleString()}</span>
                      </div>
                      <a 
                        href={`https://open.spotify.com/search/${encodeURIComponent(`Curtis Dove ${song.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                      >
                        <i className="fab fa-spotify"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* R&B Section */}
            <div className={`${selectedGenre !== "all" && selectedGenre !== "rnb" ? "hidden" : ""}`}>
              <div className="flex items-center mb-6">
                <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
                <h3 className="text-2xl font-bold">R&B Vibes</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {TOP_SONGS.rnb.map((song, index) => (
                  <div key={`rnb-${index}`} className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-white mb-1">{song.title}</h4>
                        <p className="text-white/60 text-sm">{song.date}</p>
                      </div>
                      {song.tag && (
                        <span className="px-2 py-1 text-xs font-medium bg-purple-500 text-white rounded-full">
                          {song.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-white/60 text-sm">
                        <span className="flex items-center mr-3"><i className="fas fa-headphones text-xs mr-1"></i> {song.listeners.toLocaleString()}</span>
                        <span className="flex items-center"><i className="fas fa-play text-xs mr-1"></i> {song.streams.toLocaleString()}</span>
                      </div>
                      <a 
                        href={`https://open.spotify.com/search/${encodeURIComponent(`Curtis Dove ${song.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all"
                      >
                        <i className="fab fa-spotify"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
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
                    className="group p-6 rounded-xl bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-800 transition-all"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div 
                        className="w-16 h-16 flex items-center justify-center mb-4 rounded-full transition-transform duration-500 group-hover:scale-110" 
                        style={{ backgroundColor: `${platform.color}20` }}
                      >
                        <i className={`${platform.icon} text-3xl transition-all`} style={{color: platform.color}}></i>
                      </div>
                      <h4 className="text-xl font-bold mb-2">{platform.name}</h4>
                      <p className="text-white/60 text-sm">Stream my complete catalog</p>
                      <div className="mt-4 flex items-center text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="mr-2">Listen now</span>
                        <i className="fas fa-arrow-right text-sm"></i>
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
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-500 to-amber-600 opacity-20 blur-xl rounded-2xl"></div>
                <img 
                  src="/attached_assets/CurtisDoveProfilePicture.jpg" 
                  alt="Curtis Dove portrait" 
                  className="relative rounded-2xl w-full h-auto shadow-2xl object-cover"
                />
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 px-6 py-3 bg-zinc-800/90 backdrop-blur-sm rounded-xl border border-amber-500/20 shadow-xl">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-music text-amber-500"></i>
                    <div>
                      <div className="text-sm font-bold">135+ Songs</div>
                      <div className="text-xs text-white/60">Available on all platforms</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <p className="text-xl leading-relaxed text-white/90">
                  Curtis Dove is a boundary-pushing artist known for blending genres and creating a sound uniquely his own. With over 135 songs released across major streaming platforms, Curtis has developed a diverse catalog that fuses elements from across the musical spectrum.
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
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm">Afrobeat</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm">Afro-fusion</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm">Afropop</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm">R&B</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm">Pop</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm">Alternative Rock</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm">Dance</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm">Darkwave</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm">Club</span>
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
            <span className="text-white">CONNECT </span>
            <span className="text-amber-500">WITH ME</span>
          </h2>
          
          <div className="max-w-5xl mx-auto mb-16">
            <div className="flex justify-center mb-12">
              <div className="flex flex-wrap justify-center gap-6">
                {SOCIAL_MEDIA.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-zinc-800 group-hover:bg-amber-500 transition-colors">
                        <i className={`${social.icon} text-2xl group-hover:text-black transition-colors`}></i>
                      </div>
                      <span className="text-white/80 group-hover:text-white transition-colors">{social.name}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                <div className="space-y-6 text-white/80">
                  <div className="flex items-start gap-4">
                    <div className="text-amber-500 mt-1">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Email</h4>
                      <p>contact@curtisdove.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="text-amber-500 mt-1">
                      <i className="fas fa-briefcase"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Management</h4>
                      <p>manager@curtisdove.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="text-amber-500 mt-1">
                      <i className="fas fa-music"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Booking</h4>
                      <p>booking@curtisdove.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6">Send A Message</h3>
                <form className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full px-4 py-3 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full px-4 py-3 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <textarea 
                      rows={4}
                      placeholder="Your Message" 
                      className="w-full px-4 py-3 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    ></textarea>
                  </div>
                  <div>
                    <button 
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold rounded-lg transition-all"
                    >
                      SEND MESSAGE
                    </button>
                  </div>
                </form>
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
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
            
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
          </div>
        </div>
      </footer>
      
      {/* Add these animation classes to make them available */}
      <div className="hidden animate-fade-in animate-slide-up animate-slide-in-right animate-slide-in-left"></div>
    </div>
  );
}
