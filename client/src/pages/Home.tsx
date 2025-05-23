import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import ProfilePicture from "../assets/CurtisDoveProfilePicture.jpg";
import PhoenixImage from "../assets/phoenix_image.webp";
import ShareButtons from "../components/ShareButtons";
import CollapsibleGenre from "../components/CollapsibleGenre";
import SimpleAudioVisualizer from "../components/SimpleAudioVisualizer";
import IncrementingCounter from "../components/IncrementingCounter";

// Reference album artwork with CSS background classes instead
// We now get album covers directly from CollapsibleGenre

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

// Define different song types for different usage contexts
type StatSong = {
  title: string;
  streams: number;
  listeners: number;
  date: string;
  tag?: string;
  featured?: boolean;
};

// This is for the CollapsibleGenre component
interface Song {
  number: string;
  title: string;
  album: string;
}

// Top songs data from your spreadsheet 
const TOP_SONGS: Record<string, StatSong[]> = {
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
  const [isClicking, setIsClicking] = useState(false);
  const [cursorShape, setCursorShape] = useState(0); // Track which cursor shape to display
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position and click events for custom cursor effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleMouseDown = () => {
      setIsClicking(true);
      // Cycle to next cursor shape (0, 1, 2, 3, 4, then back to 0)
      setCursorShape((prevShape) => (prevShape + 1) % 5);
      // Reset click state after animation completes
      setTimeout(() => setIsClicking(false), 500);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
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
      {/* Custom music cursor effect with multiple shape-changing interactions */}
      <div 
        ref={cursorRef}
        className={`hidden md:block fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 ${isClicking ? 'opacity-100' : 'opacity-80'}`}
        style={{ 
          transition: 'transform 0.15s ease-out',
          width: '28px',
          height: '28px',
        }}
      >
        {!isClicking ? (
          // Default state: Music Note
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="text-amber-500 transform transition-all duration-500"
          >
            <path d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" />
          </svg>
        ) : (
          // Show different cursor shapes based on cursorShape value
          <>
            {/* Shape 0: Headphones */}
            {cursorShape === 0 && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="text-purple-500 scale-150 transform transition-all duration-500"
                style={{filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))'}}
              >
                <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
              </svg>
            )}
            
            {/* Shape 1: Microphone */}
            {cursorShape === 1 && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="text-blue-500 scale-150 rotate-12 transform transition-all duration-500"
                style={{filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))'}}
              >
                <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
              </svg>
            )}
            
            {/* Shape 2: Speaker */}
            {cursorShape === 2 && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="text-green-500 scale-150 -rotate-12 transform transition-all duration-500"
                style={{filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))'}}
              >
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 00-1.06 1.06 5.25 5.25 0 010 7.42.75.75 0 001.06 1.06 6.75 6.75 0 000-9.54z" />
                <path d="M15.932 7.757a.75.75 0 00-1.061 1.06 2.25 2.25 0 010 3.182.75.75 0 001.06 1.06 3.75 3.75 0 000-5.302z" />
              </svg>
            )}
            
            {/* Shape 3: Radio */}
            {cursorShape === 3 && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="text-red-500 scale-150 rotate-45 transform transition-all duration-500"
                style={{filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))'}}
              >
                <path fillRule="evenodd" d="M20.432 4.103a.75.75 0 00-.364-1.455L4.128 6.632l-.2.033C2.498 6.904 1.5 8.158 1.5 9.575v9.175a3 3 0 003 3h15a3 3 0 003-3V9.574c0-1.416-.997-2.67-2.429-2.909a49.016 49.016 0 00-7.255-.658l7.616-1.904zm-9.585 8.56a.75.75 0 010 1.06l-.666.667a.75.75 0 01-1.06 0l-.667-.667a.75.75 0 010-1.06l.667-.667a.75.75 0 011.06 0l.666.667zm2.329-2.33a.75.75 0 000-1.06l-.666-.667a.75.75 0 00-1.06 0l-.667.667a.75.75 0 000 1.06l.667.667a.75.75 0 001.06 0l.666-.667zm2.329 2.33a.75.75 0 010 1.06l-4 4a.75.75 0 01-1.06 0l-1.333-1.334a.75.75 0 010-1.06l4-4a.75.75 0 011.06 0l1.333 1.334zm2.329-2.33a.75.75 0 000-1.06l-1.334-1.333a.75.75 0 00-1.06 0l-4 4a.75.75 0 000 1.06l1.334 1.334a.75.75 0 001.06 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            
            {/* Shape 4: Guitar */}
            {cursorShape === 4 && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="text-yellow-500 scale-150 rotate-180 transform transition-all duration-500"
                style={{filter: 'drop-shadow(0 0 8px rgba(234, 179, 8, 0.8))'}}
              >
                <path d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-.938-4.333l2.662-.576a.75.75 0 00.591-.734V6.112l-8.968 1.94a.75.75 0 01-.921-.611l-.153-.9a.75.75 0 01.61-.92l9.592-2.07a.75.75 0 01.161-.017zM3.43 15.178a.75.75 0 01.906-.524l2.432.811a2.25 2.25 0 011.575 2.152v2.458a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v-2.909a2.25 2.25 0 011.087-1.922l-.001-.002zm13.5 3.322a.75.75 0 01.584.873l-.262 1.574a2.25 2.25 0 01-2.215 1.878h-1.8a2.25 2.25 0 01-2.13-1.515l-.704-2.113a.75.75 0 01.452-.956l3.369-1.226a2.249 2.249 0 012.491.489l.214.214.001-.001z" />
              </svg>
            )}
          </>
        )}
      </div>
      
      {/* Enhanced Fixed Navigation with gradient background and stylized elements */}
      <nav className={`fixed w-full top-0 z-40 transition-all duration-500 ${
        scrollY > 50 
          ? 'bg-gradient-to-r from-black/95 via-black/90 to-black/95 backdrop-blur-sm py-3 shadow-lg shadow-black/30' 
          : 'bg-gradient-to-r from-black/80 via-black/60 to-black/80 backdrop-blur-sm py-5'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Stylized Logo */}
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
              className="font-bold flex items-center gap-2 my-1 group"
            >
              {/* Animated Left Music Note */}
              <span className="text-amber-500 transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="musicNoteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#F5C033" />
                    </linearGradient>
                  </defs>
                  <path d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" fill="url(#musicNoteGradient)" />
                </svg>
              </span>
              
              {/* Stylized Name */}
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500 text-lg tracking-wide"
                style={{ 
                  fontFamily: "'Montserrat', sans-serif", 
                  fontWeight: "700",
                  letterSpacing: "0.05em",
                  textShadow: "0 0 20px rgba(245, 158, 11, 0.2)"
                }}
              >
                CURTIS DOVE MUSIC
              </span>
              
              {/* Animated Right Music Note */}
              <span className="text-amber-500 transform transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24">
                  <path d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" fill="url(#musicNoteGradient)" />
                </svg>
              </span>
            </a>
            
            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              {SECTIONS.map((section) => (
                section.isLink ? (
                  <Link 
                    key={section.id}
                    href={`/${section.id}`}
                    className="relative px-2 py-1 uppercase font-medium transition-all duration-300 text-amber-500 hover:text-amber-300 group"
                    style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em" }}
                  >
                    {/* Hover Glow Effect */}
                    <span className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 rounded-md blur-md transition-all duration-300"></span>
                    <span className="relative">{section.label}</span>
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                  </Link>
                ) : (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`relative px-2 py-1 uppercase transition-all duration-300 group`}
                    style={{ 
                      fontFamily: "'Montserrat', sans-serif", 
                      fontWeight: currentSection === section.id ? "600" : "500",
                      letterSpacing: "0.1em"
                    }}
                  >
                    {/* Hover Glow Effect */}
                    <span className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 rounded-md blur-md transition-all duration-300"></span>
                    
                    <span className={`relative ${
                      currentSection === section.id ? 'text-amber-500' : 'text-white group-hover:text-amber-300'
                    }`}>{section.label}</span>
                    
                    {/* Animated underline */}
                    {currentSection === section.id ? (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500/70 via-amber-500 to-amber-500/70"></span>
                    ) : (
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
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
        {/* Animated background with audio visualizer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10"></div>
          
          {/* Background gradient orbs */}
          <div className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-purple-500/10 blur-[100px]"></div>
          <div className="absolute bottom-[30%] left-[15%] w-80 h-80 rounded-full bg-amber-500/10 blur-[100px]"></div>
          <div className="absolute top-[40%] left-[25%] w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
          
          {/* Audio Visualizer */}
          <div className="absolute inset-0 z-[5]">
            <SimpleAudioVisualizer 
              barCount={80}
              minHeight={5}
              maxHeight={70}
              baseColor="rgba(255, 165, 0, 0.15)"
              accentColor="rgba(255, 165, 0, 0.6)"
              className="w-full h-1/3 bottom-0 absolute px-4"
            />
          </div>
          
          {/* Hidden audio element with Lagos Inferno */}
          <audio 
            id="background-audio" 
            loop 
            preload="auto" 
            className="hidden"
          >
            <source src="/music/lagos-inferno.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          
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
              <div className="absolute -inset-3 bg-black blur-xl opacity-30 rounded-lg"></div>
              <h1 className="relative text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight" style={{
                color: "#F5C033",
                letterSpacing: "0.02em"
              }}>
                CURTIS
                <br />
                DOVE
              </h1>
            </div>
            
            <div className="relative inline-block mb-6 w-full">
              <span className="absolute -inset-1 -z-10 bg-gradient-to-r from-black/30 via-amber-900/20 to-black/30 blur-md opacity-40 rounded-lg"></span>
              <h2 className="relative text-2xl md:text-3xl font-medium tracking-widest py-3 px-6 rounded-lg w-full" style={{
                letterSpacing: "0.25em",
                color: "rgba(255, 255, 255, 0.75)",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)"
              }}>
                BOUNDARY-BREAKING ARTIST
              </h2>
            </div>
            
            {/* Professional tagline */}
            <div className="max-w-2xl mx-auto mb-5 text-center">
              <h3 className="text-lg md:text-xl text-white/80 font-light tracking-wider" style={{ letterSpacing: "0.05em" }}>
                Songwriter | Music Producer | Digital Sound Architect
              </h3>
            </div>
            
            {/* Artist bio */}
            <div className="max-w-2xl mx-auto mb-10 text-center">
              <p className="text-white/70 leading-relaxed">
                Curtis Dove is a genre-bending songwriter and independent music producer, crafting emotionally rich, rhythm-forward tracks powered by cutting-edge digital production.
              </p>
            </div>
            
            {/* Featured tracks with glowing edges */}
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl mx-auto mb-8">
              {/* Latest Release - Vibration */}
              <div className="audio-player-container w-full relative">
                <div className="text-center mb-2">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600/30 to-purple-900/30 text-white text-sm font-medium rounded-full border border-purple-500/50">
                    LATEST RELEASE
                  </span>
                </div>
                {/* Multi-layered glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 via-purple-400/40 to-purple-600/30 rounded-xl blur-sm"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/15 via-purple-300/20 to-purple-500/15 rounded-xl blur-md"></div>
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-purple-600/10 via-purple-400/15 to-purple-600/10 rounded-xl blur-lg"></div>
                
                {/* Player container */}
                <div className="relative bg-[#121212] rounded-lg overflow-hidden">
                  <iframe 
                    src="https://open.spotify.com/embed/track/4GMOAFbPxGKeR06l3KukNo?utm_source=generator&theme=0" 
                    width="100%" 
                    height="80" 
                    frameBorder="0" 
                    allowFullScreen 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="rounded-lg"
                    style={{ background: "#121212" }}
                  ></iframe>
                </div>
              </div>
              
              {/* Featured Track - Lagos Inferno */}
              <div className="audio-player-container w-full relative">
                <div className="text-center mb-2">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-600/30 to-amber-900/30 text-white text-sm font-medium rounded-full border border-amber-500/50">
                    FEATURED TRACK
                  </span>
                </div>
                {/* Multi-layered glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600/20 via-amber-400/30 to-amber-600/20 rounded-xl blur-sm"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-amber-300/15 to-amber-500/10 rounded-xl blur-md"></div>
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-600/5 via-amber-400/10 to-amber-600/5 rounded-xl blur-lg"></div>
                
                {/* Player container */}
                <div className="relative bg-[#121212] rounded-lg overflow-hidden">
                  <iframe 
                    src="https://open.spotify.com/embed/track/2Jl963Qb99vuKanGnYaUeI?utm_source=generator&theme=0" 
                    width="100%" 
                    height="80" 
                    frameBorder="0" 
                    allowFullScreen 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="rounded-lg"
                    style={{ background: "#121212" }}
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Enhanced SEO Featured Playlist Section */}
            <div className="w-full max-w-3xl mx-auto mb-12 relative">
              <div className="text-center mb-4">
                <h3 className="text-3xl font-bold text-white mb-2">TOP TRENDING <span className="text-amber-500">AFROBEAT PLAYLIST 2025</span></h3>
                <p className="text-white/80 mb-4 max-w-2xl mx-auto">Discover the hottest Afrobeat tracks in our curated playlist featuring Lagos to Tokyo, Eko Island Beats, and more tropical dance hits. Already saved by thousands of music lovers.</p>
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-green-600/30 to-blue-900/30 text-white text-base font-medium rounded-full border border-green-500/50">
                  #1 AFROBEAT PLAYLIST
                </span>
              </div>
              
              {/* Playlist container with enhanced glow */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600/40 via-blue-400/50 to-green-600/40 rounded-xl blur-sm animate-pulse-slow"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-blue-300/25 to-green-500/20 rounded-xl blur-md"></div>
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-green-600/15 via-blue-400/20 to-green-600/15 rounded-xl blur-lg"></div>
                
                {/* Playlist embed */}
                <div className="relative bg-[#121212] rounded-lg overflow-hidden">
                  <iframe 
                    src="https://open.spotify.com/embed/playlist/0OMB5854ceBpFP6vtT1uHn?utm_source=generator&theme=0" 
                    width="100%" 
                    height="352" 
                    frameBorder="0" 
                    allowFullScreen 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="rounded-lg"
                    style={{ background: "#121212" }}
                    title="Curtis Dove's Top Trending Afrobeat Playlist 2025"
                  ></iframe>
                </div>
              </div>
              
              {/* Enhanced Call to action */}
              <div className="mt-6 text-center">
                <div className="bg-gradient-to-r from-green-900/70 via-blue-900/70 to-green-900/70 backdrop-blur-sm p-4 rounded-lg border border-green-500/40 shadow-lg">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                    <div className="flex items-center">
                      <span className="text-xl">🔥</span>
                      <p className="text-white text-lg ml-2 font-medium">
                        Over 50,000+ streams and growing every day!
                      </p>
                    </div>
                    <a 
                      href="https://open.spotify.com/playlist/0OMB5854ceBpFP6vtT1uHn?si=Av1ikmx1T3qcjSt0eBLiUw" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all transform hover:scale-105 flex items-center"
                    >
                      <i className="fab fa-spotify mr-2"></i>
                      SAVE PLAYLIST NOW
                    </a>
                  </div>
                </div>
                
                <div className="mt-3 text-white/60 text-sm">
                  Featuring top Afrobeat songs from Lagos to Tokyo, Sweet Poison, Fire & Wine, and more
                </div>
              
                {/* Spotify stream counter */}
                <div className="mt-3 flex items-center justify-center bg-black/40 py-2 px-4 rounded-full mx-auto inline-flex border border-green-500/20">
                  <i className="fab fa-spotify text-green-500 mr-2 text-lg"></i>
                  <IncrementingCounter startValue={637000} incrementIntervalMs={32500} />
                </div>
              </div>
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
            
            {/* Playlist Collection */}
            <div className="mb-16">
              <div className="max-w-5xl mx-auto">
                {/* Top 3 Playlists Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  
                  {/* After Dark in Lagos */}
                  <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600/30 to-yellow-400/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-zinc-900/70 backdrop-blur-sm rounded-xl overflow-hidden border border-yellow-500/30 hover:border-yellow-500/50 transition-all shadow-lg shadow-yellow-900/20">
                      <div className="p-5">
                        <div className="flex items-center mb-3">
                          <span className="w-2 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full mr-2"></span>
                          <h3 className="text-lg font-bold group-hover:text-yellow-400 transition-colors">After Dark in Lagos</h3>
                        </div>
                        <p className="text-sm text-white/60 mb-4">The Explicit Side of Afrobeats</p>
                        <div className="aspect-video rounded-lg overflow-hidden shadow-inner">
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
                        
                        {/* Links below player */}
                        <div className="mt-4 pt-3 border-t border-gray-700/50">
                          <p className="text-white text-sm mb-2 text-center">Visit playlist on:</p>
                          <div className="flex justify-center gap-6">
                            <a 
                              href="https://open.spotify.com/playlist/7qWyO3vNYIWRgiGcTQT9Bd?si=5DnfyoQySAOW-kghO-mdEg" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white hover:text-green-400 transition-colors transform hover:scale-110 flex items-center gap-1"
                            >
                              <i className="fab fa-spotify text-lg"></i>
                              <span className="text-sm">Spotify</span>
                            </a>
                            <a 
                              href="https://youtube.com/playlist?list=PLli7EgSWWodvRCs3OIS0vOEqsan96bOsP&si=26GYkZEuCgMrvIbo" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white hover:text-red-500 transition-colors transform hover:scale-110 flex items-center gap-1"
                            >
                              <i className="fab fa-youtube text-lg"></i>
                              <span className="text-sm">YouTube</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* My Love Songs */}
                  <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-pink-400/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-zinc-900/70 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/30 hover:border-purple-500/50 transition-all shadow-lg shadow-purple-900/20">
                      <div className="p-5">
                        <div className="flex items-center mb-3">
                          <span className="w-2 h-6 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full mr-2"></span>
                          <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors">Curtis Dove - My Love Songs</h3>
                        </div>
                        <p className="text-sm text-white/60 mb-4">Heartfelt love songs across genres</p>
                        <div className="aspect-video rounded-lg overflow-hidden shadow-inner">
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
                        
                        {/* Links below player */}
                        <div className="mt-4 pt-3 border-t border-gray-700/50">
                          <p className="text-white text-sm mb-2 text-center">Visit playlist on:</p>
                          <div className="flex justify-center gap-6">
                            <a 
                              href="https://open.spotify.com/playlist/13nhg6SPkxfMaAkj2Cra6M?si=J6YxCxITQVuaLEHunXBZRA" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white hover:text-green-400 transition-colors transform hover:scale-110 flex items-center gap-1"
                            >
                              <i className="fab fa-spotify text-lg"></i>
                              <span className="text-sm">Spotify</span>
                            </a>
                            <a 
                              href="https://youtu.be/MTJ1gIenisg?si=XctmuL0lx2aFyuiK" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white hover:text-red-500 transition-colors transform hover:scale-110 flex items-center gap-1"
                            >
                              <i className="fab fa-youtube text-lg"></i>
                              <span className="text-sm">YouTube</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* The Ashes Trilogy */}
                  <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/30 to-orange-400/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-zinc-900/70 backdrop-blur-sm rounded-xl overflow-hidden border border-red-500/30 hover:border-red-500/50 transition-all shadow-lg shadow-red-900/20">
                      <div className="p-5">
                        <div className="flex items-center mb-3">
                          <span className="w-2 h-6 bg-gradient-to-b from-red-400 to-red-600 rounded-full mr-2"></span>
                          <h3 className="text-lg font-bold group-hover:text-red-400 transition-colors">The Ashes Trilogy</h3>
                        </div>
                        <p className="text-sm text-white/60 mb-4">A Journey of Renewal</p>
                        <div className="aspect-video rounded-lg overflow-hidden shadow-inner">
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
                        
                        {/* Links below player */}
                        <div className="mt-4 pt-3 border-t border-gray-700/50">
                          <p className="text-white text-sm mb-2 text-center">Visit playlist on:</p>
                          <div className="flex justify-center gap-6">
                            <a 
                              href="https://open.spotify.com/playlist/7lUurLZ2vBhayCAc96tTp2?si=8inNft5JT9uZ0j8Mxy5RSg" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white hover:text-green-400 transition-colors transform hover:scale-110 flex items-center gap-1"
                            >
                              <i className="fab fa-spotify text-lg"></i>
                              <span className="text-sm">Spotify</span>
                            </a>
                            <a 
                              href="https://youtu.be/XvrDGxfMeGc?si=IWP89hlaIZxEETxJ" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white hover:text-red-500 transition-colors transform hover:scale-110 flex items-center gap-1"
                            >
                              <i className="fab fa-youtube text-lg"></i>
                              <span className="text-sm">YouTube</span>
                            </a>
                          </div>
                        </div>
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
                        { 
                          number: "01", 
                          title: "The Lounge Love", 
                          album: "Lagos to Kano",
                          spotifyUrl: "https://open.spotify.com/track/5pazCXbJAALjOPcsuvNwoj?context=spotify:playlist:0OMB5854ceBpFP6vtT1uHn&si=Cwyc-KLEQoKWEsptzs-3oQ",
                          appleUrl: "https://music.apple.com/us/album/lagos-to-kano-ep/1795739852",
                          amazonUrl: "https://www.amazon.com/Lagos-Kano-Curtis-Dove/dp/B0DWTF2ZCQ",
                          youtubeUrl: "https://www.youtube.com/watch?v=kpLowI-DSBM"
                        },
                        { 
                          number: "02", 
                          title: "Lagos Inferno", 
                          album: "Eko Island Beats",
                          spotifyUrl: "https://open.spotify.com/track/2Jl963Qb99vuKanGnYaUeI?context=spotify:playlist:0OMB5854ceBpFP6vtT1uHn&si=Cwyc-KLEQoKWEsptzs-3oQ",
                          appleUrl: "https://music.apple.com/ug/song/lagos-inferno/1788734416",
                          amazonUrl: "https://www.amazon.com/Eko-Island-Beats-Curtis-Dove/dp/B0DS9JR9V8",
                          youtubeUrl: "https://www.youtube.com/watch?v=aEDOnJLXgJs"
                        },
                        { 
                          number: "03", 
                          title: "Wine & Kiss", 
                          album: "Lagos to Tokyo",
                          spotifyUrl: "https://open.spotify.com/track/2u5TqSfucAvxvgc7BnIU5x?context=spotify:playlist:0OMB5854ceBpFP6vtT1uHn&si=Cwyc-KLEQoKWEsptzs-3oQ",
                          appleUrl: "https://music.apple.com/us/album/lagos-to-kano-ep/1795739852",
                          amazonUrl: "https://www.amazon.com/Lagos-Tokyo-Curtis-Dove/dp/B0F1CXRSX4",
                          youtubeUrl: "https://www.youtube.com/watch?v=ZEkjydHHJTU"
                        },
                        { 
                          number: "04", 
                          title: "Lagos Islands", 
                          album: "Eko Island Beats",
                          spotifyUrl: "https://open.spotify.com/track/5OjzxlwXLT0Sp19VnKRgVV?context=spotify:playlist:0OMB5854ceBpFP6vtT1uHn&si=Cwyc-KLEQoKWEsptzs-3oQ",
                          appleUrl: "https://music.apple.com/in/song/lagos-islands/1788734402",
                          amazonUrl: "https://www.amazon.com/Eko-Island-Beats-Curtis-Dove/dp/B0DS9JR9V8",
                          youtubeUrl: "https://www.youtube.com/watch?v=0Lv-N1fYx7E"
                        },
                        { 
                          number: "05", 
                          title: "Island Breeze Serenade", 
                          album: "Lagos to Tokyo",
                          spotifyUrl: "https://open.spotify.com/track/5xy7MHBAPFvZZwAZt8F9gf?context=spotify:playlist:0OMB5854ceBpFP6vtT1uHn&si=Cwyc-KLEQoKWEsptzs-3oQ",
                          appleUrl: "https://music.apple.com/us/album/lagos-to-tokyo/1795739853",
                          amazonUrl: "https://www.amazon.com/Lagos-Tokyo-Curtis-Dove/dp/B0F1CXRSX4",
                          youtubeUrl: "https://www.youtube.com/watch?v=YcZQHn0GXhM"
                        },
                        { 
                          number: "06", 
                          title: "Beachside Fire", 
                          album: "Lagos to Kano",
                          spotifyUrl: "https://open.spotify.com/track/0TN5vTY58EquEYYrfWJsEa?context=spotify:playlist:0OMB5854ceBpFP6vtT1uHn&si=Cwyc-KLEQoKWEsptzs-3oQ",
                          appleUrl: "https://music.apple.com/us/album/lagos-to-kano-ep/1795739852",
                          amazonUrl: "https://www.amazon.com/Lagos-Kano-Curtis-Dove/dp/B0DWTF2ZCQ",
                          youtubeUrl: "https://www.youtube.com/watch?v=0Lv-N1fYx7E"
                        },
                        { 
                          number: "07", 
                          title: "Sweet Poison", 
                          album: "Sweet Poison",
                          spotifyUrl: "https://open.spotify.com/track/3XN6m6KD0IsiLGfpam19y0?context=spotify:playlist:0OMB5854ceBpFP6vtT1uHn&si=Cwyc-KLEQoKWEsptzs-3oQ",
                          appleUrl: "https://music.apple.com/us/album/lagos-to-kano-ep/1795739852",
                          amazonUrl: "https://www.amazon.com/Sweet-Poison-Curtis-Dove/dp/B0F6KYWYM2",
                          youtubeUrl: "https://www.youtube.com/playlist?list=OLAK5uy_mEnEXXDGWMmqGN_QSwdsd6qx4EqsXtOGI"
                        },
                        { 
                          number: "08", 
                          title: "Fire & Wine", 
                          album: "Fire & Wine",
                          spotifyUrl: "https://open.spotify.com/track/1uZC71fpV6uPtmP6XFBBgb?context=spotify:playlist:0OMB5854ceBpFP6vtT1uHn&si=Cwyc-KLEQoKWEsptzs-3oQ",
                          appleUrl: "https://music.apple.com/us/album/fire-wine-single/1798774371",
                          amazonUrl: "https://www.amazon.com/Fire-Wine-Curtis-Dove/dp/B0DYKY5FS1",
                          youtubeUrl: "https://www.youtube.com/watch?v=mu6j90DfHdQ"
                        },
                        { 
                          number: "09", 
                          title: "Lose Myself in You", 
                          album: "Lagos to Tokyo",
                          spotifyUrl: "https://open.spotify.com/track/6LUwOmBa1aKU7xEnu2aTKF?context=spotify:playlist:0OMB5854ceBpFP6vtT1uHn&si=Cwyc-KLEQoKWEsptzs-3oQ",
                          appleUrl: "https://music.apple.com/us/album/lagos-to-kano-ep/1795739852",
                          amazonUrl: "https://www.amazon.com/Lagos-Tokyo-Curtis-Dove/dp/B0F1CXRSX4",
                          youtubeUrl: "https://www.youtube.com/watch?v=zfhlJMJhRFs"
                        },
                        { 
                          number: "10", 
                          title: "Kano Love", 
                          album: "Lagos to Kano",
                          spotifyUrl: "https://open.spotify.com/track/23V2Z2R5wcWDHMbqg5zDXx?context=spotify:playlist:0OMB5854ceBpFP6vtT1uHn&si=Cwyc-KLEQoKWEsptzs-3oQ",
                          appleUrl: "https://music.apple.com/us/album/lagos-to-kano-ep/1795739852",
                          amazonUrl: "https://www.amazon.com/Lagos-Kano-Curtis-Dove/dp/B0DWTF2ZCQ",
                          youtubeUrl: "https://www.youtube.com/watch?v=kpLowI-DSBM"
                        }
                      ]}
                    />
                    
                    {/* Rock Collapsible */}
                    <CollapsibleGenre
                      title="Rock"
                      genre="rock"
                      description="My rock and metal tracks spanning from melodic rock to nu metal, featuring heavy guitars and emotional themes about personal struggles and renewal"
                      songs={[
                        { 
                          number: "01", 
                          title: "Burn it Down", 
                          album: "Rise From Ashes",
                          spotifyUrl: "https://open.spotify.com/track/1dPzDtp6EFHkLrtmbehVx4",
                          appleUrl: "https://music.apple.com/us/album/burn-it-down/1805412296?i=1805412297",
                          amazonUrl: "https://www.amazon.com/dp/B0DWTF2ZCQ",
                          youtubeUrl: "https://www.youtube.com/watch?v=6HP5HRGqlZE"
                        },
                        { 
                          number: "02", 
                          title: "Whispers in the Wind", 
                          album: "Rise From Ashes",
                          spotifyUrl: "https://open.spotify.com/track/5B4RtvM6NOyMNRCfLai2ez",
                          appleUrl: "https://music.apple.com/us/album/whispers-in-the-wind/1805412296?i=1805412298",
                          amazonUrl: "https://www.amazon.com/dp/B0DWTF2ZCQ",
                          youtubeUrl: "https://www.youtube.com/watch?v=wQ85OXHBD3E"
                        },
                        { 
                          number: "03", 
                          title: "Brother Eternal", 
                          album: "Beyond the Ashes",
                          spotifyUrl: "https://open.spotify.com/track/2J3dRxGzT1nh6PnBIyd6Sn",
                          appleUrl: "https://music.apple.com/us/album/brother-eternal/1787170020?i=1787170022",
                          amazonUrl: "https://www.amazon.com/dp/B0DWTF2ZCQ",
                          youtubeUrl: "https://www.youtube.com/watch?v=ZEkjydHHJTU"
                        },
                        { 
                          number: "04", 
                          title: "Fading Echoes", 
                          album: "Rise From Ashes",
                          spotifyUrl: "https://open.spotify.com/track/3DDOb1fYZkHAcjNZKICVWF",
                          appleUrl: "https://music.apple.com/us/album/fading-echoes/1805412296?i=1805412299",
                          amazonUrl: "https://www.amazon.com/dp/B0DWTF2ZCQ",
                          youtubeUrl: "https://www.youtube.com/watch?v=wQ85OXHBD3E"
                        },
                        { 
                          number: "05", 
                          title: "Rebuild", 
                          album: "Rise From Ashes",
                          spotifyUrl: "https://open.spotify.com/track/5xy7MHBAPFvZZwAZt8F9gf",
                          appleUrl: "https://music.apple.com/us/album/rebuild/1805412296?i=1805412300",
                          amazonUrl: "https://www.amazon.com/dp/B0DWTF2ZCQ",
                          youtubeUrl: "https://www.youtube.com/watch?v=YcZQHn0GXhM"
                        },
                        { 
                          number: "06", 
                          title: "Reflections of Us", 
                          album: "Rise From Ashes",
                          spotifyUrl: "https://open.spotify.com/track/0TN5vTY58EquEYYrfWJsEa",
                          appleUrl: "https://music.apple.com/us/album/reflections-of-us/1805412296?i=1805412301",
                          amazonUrl: "https://www.amazon.com/dp/B0DWTF2ZCQ",
                          youtubeUrl: "https://www.youtube.com/watch?v=0Lv-N1fYx7E"
                        },
                        { 
                          number: "07", 
                          title: "Safe Haven", 
                          album: "Rise From Ashes",
                          spotifyUrl: "https://open.spotify.com/track/3XN6m6KD0IsiLGfpam19y0",
                          appleUrl: "https://music.apple.com/us/album/safe-haven/1805412296?i=1805412302",
                          amazonUrl: "https://www.amazon.com/dp/B0DWTF2ZCQ",
                          youtubeUrl: "https://www.youtube.com/watch?v=kpLowI-DSBM"
                        },
                        { 
                          number: "08", 
                          title: "Behind the Mask", 
                          album: "Behind the Mask - Single",
                          spotifyUrl: "https://open.spotify.com/track/0c5LutD2com768w39h5OGp",
                          appleUrl: "https://music.apple.com/us/album/behind-the-mask/1775675672?i=1775675673",
                          amazonUrl: "https://www.amazon.com/dp/B0DYKY5FS1",
                          youtubeUrl: "https://www.youtube.com/watch?v=mu6j90DfHdQ"
                        },
                        { 
                          number: "09", 
                          title: "Ashes of Us", 
                          album: "Beyond the Ashes",
                          spotifyUrl: "https://open.spotify.com/track/6LUwOmBa1aKU7xEnu2aTKF",
                          appleUrl: "https://music.apple.com/us/album/ashes-of-us/1787170020?i=1787170021",
                          amazonUrl: "https://www.amazon.com/dp/B0DWTF2ZCQ",
                          youtubeUrl: "https://www.youtube.com/watch?v=zfhlJMJhRFs"
                        },
                        { 
                          number: "10", 
                          title: "Beyond the Ashes", 
                          album: "Beyond the Ashes",
                          spotifyUrl: "https://open.spotify.com/track/23V2Z2R5wcWDHMbqg5zDXx",
                          appleUrl: "https://music.apple.com/us/album/beyond-the-ashes/1787170020?i=1787170023",
                          amazonUrl: "https://www.amazon.com/dp/B0DWTF2ZCQ",
                          youtubeUrl: "https://www.youtube.com/watch?v=kpLowI-DSBM"
                        }
                      ]}
                    />
                    
                    <CollapsibleGenre
                      title="Hip-Hop"
                      genre="hiphop"
                      description="My hip-hop tracks featuring trap beats, catchy hooks, and energetic flows that capture the urban vibe and celebration of lifestyle"
                      songs={[
                        { 
                          number: "01", 
                          title: "Shorty You a Vibe", 
                          album: "Shorty You a Vibe – Single",
                          spotifyUrl: "https://open.spotify.com/track/7zbnWqfsR2GM8Aty2j6eJg",
                          appleUrl: "https://music.apple.com/us/album/shorty-you-a-vibe-single/1812762443",
                          amazonUrl: "https://www.amazon.com/dp/B0DZZW4TT7",
                          youtubeUrl: "https://www.youtube.com/watch?v=z3uy0UTbYHc"
                        },
                        { 
                          number: "02", 
                          title: "Baller Life", 
                          album: "Baller Life – Single",
                          spotifyUrl: "https://open.spotify.com/track/6uWoGEuBywjh6xHcBSyl5k",
                          appleUrl: "https://music.apple.com/us/album/baller-life-single/1811572653",
                          amazonUrl: "https://www.amazon.com/dp/B0DZW7S12M",
                          youtubeUrl: "https://www.youtube.com/watch?v=IevWuvM7NFU"
                        },
                        { 
                          number: "03", 
                          title: "Detty December", 
                          album: "Detty December – Single",
                          spotifyUrl: "https://open.spotify.com/track/3Tx9L3rqISDq1nyJq8H5Eq",
                          appleUrl: "https://music.apple.com/us/album/detty-december-single/1811572652",
                          amazonUrl: "https://www.amazon.com/dp/B0DZW7R2HR",
                          youtubeUrl: "https://www.youtube.com/watch?v=HruHqY8vMGQ"
                        }
                      ]}
                    />
                    
                    {/* Pop Collapsible */}
                    <CollapsibleGenre 
                      title="Pop"
                      genre="pop"
                      description="My favorite catchy melodies, heartfelt lyrics, and radio-ready hooks with crisp contemporary pop production that blends emotion with uplifting beats"
                      songs={[
                        { 
                          number: "01", 
                          title: "One Wish", 
                          album: "One Wish – Single",
                          spotifyUrl: "https://open.spotify.com/track/6n97QoeYhQr7hAKiDeWYL4?context=spotify:playlist:13nhg6SPkxfMaAkj2Cra6M",
                          appleUrl: "https://music.apple.com/us/album/one-wish-single/1805412296",
                          amazonUrl: "https://www.amazon.com/dp/B0F2ZRKMYS",
                          youtubeUrl: "https://www.youtube.com/watch?v=FDAvAFSviMk"
                        },
                        { 
                          number: "02", 
                          title: "Nobody Better", 
                          album: "Nobody Better – Single",
                          spotifyUrl: "https://open.spotify.com/track/35kZw8I3ixENRmkh3y2KY1?context=spotify:playlist:13nhg6SPkxfMaAkj2Cra6M",
                          appleUrl: "https://music.apple.com/us/album/nobody-better-single/1811572653",
                          amazonUrl: "https://www.amazon.com/dp/B0DZW7S12M",
                          youtubeUrl: "https://www.youtube.com/watch?v=FeRSmN-OV7o"
                        },
                        { 
                          number: "03", 
                          title: "Love in Letters", 
                          album: "Love in Letters – Single",
                          spotifyUrl: "https://open.spotify.com/track/07bvTEDnvb1Hti4dRD8Z1H?context=spotify:playlist:13nhg6SPkxfMaAkj2Cra6M",
                          appleUrl: "https://music.apple.com/us/album/love-in-letters-single/1812762443",
                          amazonUrl: "https://www.amazon.com/dp/B0DZZW4TT7",
                          youtubeUrl: "https://www.youtube.com/watch?v=MTJ1gIenisg"
                        },
                        { 
                          number: "04", 
                          title: "Find My Way Back to You", 
                          album: "Find My Way Back to You – Single",
                          spotifyUrl: "https://open.spotify.com/track/4CQqjRr0ANHOjKSzcUbZdC?context=spotify:playlist:13nhg6SPkxfMaAkj2Cra6M",
                          appleUrl: "https://music.apple.com/us/album/find-my-way-back-to-you-single/1811572652",
                          amazonUrl: "https://www.amazon.com/dp/B0DZW7R2HR",
                          youtubeUrl: "https://www.youtube.com/watch?v=FKDEYgeNiIU"
                        },
                        { 
                          number: "05", 
                          title: "The Letter That Started It All", 
                          album: "The Letter That Started It All – Single",
                          spotifyUrl: "https://open.spotify.com/track/1ls9cJUAf9DLC2DMNRBYSo?context=spotify:playlist:13nhg6SPkxfMaAkj2Cra6M",
                          appleUrl: "https://music.apple.com/us/album/the-letter-that-started-it-all-single/1812762793",
                          amazonUrl: "https://www.amazon.com/dp/B0DZZW6LXD",
                          youtubeUrl: "https://www.youtube.com/watch?v=bFezSDPgnzI"
                        },
                        { 
                          number: "06", 
                          title: "XOXO", 
                          album: "XOXO – Single",
                          spotifyUrl: "https://open.spotify.com/track/3LruWhD9FaUdgnqVINknn1?context=spotify:playlist:13nhg6SPkxfMaAkj2Cra6M",
                          appleUrl: "https://music.apple.com/us/album/xoxo-single/1811572652",
                          amazonUrl: "https://www.amazon.com/dp/B0DZW7R2HR",
                          youtubeUrl: "https://www.youtube.com/watch?v=sVp9uGcbLNs"
                        },
                        { 
                          number: "07", 
                          title: "Still Your Boy", 
                          album: "Still Your Boy – Single",
                          spotifyUrl: "https://open.spotify.com/track/6Rd8C2h7LuUhFliaFeIQ41?context=spotify:playlist:13nhg6SPkxfMaAkj2Cra6M",
                          appleUrl: "https://music.apple.com/us/album/still-your-boy-single/1811572652",
                          amazonUrl: "https://www.amazon.com/dp/B0DZW7R2HR",
                          youtubeUrl: "https://www.youtube.com/watch?v=IFBa-n4k-YI"
                        },
                        { 
                          number: "08", 
                          title: "I'm Coming Home", 
                          album: "I'm Coming Home – Single",
                          spotifyUrl: "https://open.spotify.com/track/0kSA6wt1gdxhu4Vqk1OI7R?context=spotify:playlist:13nhg6SPkxfMaAkj2Cra6M",
                          appleUrl: "https://music.apple.com/us/album/im-coming-home-single/1811572652",
                          amazonUrl: "https://www.amazon.com/dp/B0DZW7R2HR",
                          youtubeUrl: "https://www.youtube.com/watch?v=mu6j90DfHdQ"
                        }
                      ]}
                    />

                    
                    {/* Explicit Collapsible */}
                    <CollapsibleGenre 
                      title="Explicit"
                      genre="explicit"
                      description="My favorite raw, unfiltered tracks with mature themes and authentic street language that delivers uncompromising honesty for adult listeners"
                      songs={[
                        { 
                          number: "01", 
                          title: "Big Ashawo", 
                          album: "Eko Island Beats",
                          spotifyUrl: "https://open.spotify.com/track/3Ma0MUPr5OvHo7lGbZVker",
                          appleUrl: "https://music.apple.com/tj/album/eko-island-beats/1788734401",
                          amazonUrl: "https://www.amazon.com/dp/B0DZZW6LXD",
                          youtubeUrl: "https://www.youtube.com/playlist?list=OLAK5uy_mpvh23PrrVItc2r2i4MCZomat8P7JLD0U"
                        },
                        { 
                          number: "02", 
                          title: "Another Sad Story", 
                          album: "Another Sad Story – Single",
                          spotifyUrl: "https://open.spotify.com/track/5B1qljjDKR1HMpBNyqqiDR",
                          appleUrl: "https://music.apple.com/us/album/another-sad-story-single/1810912581",
                          amazonUrl: "https://www.amazon.com/dp/B0DZZW73ZN",
                          youtubeUrl: "https://www.youtube.com/playlist?list=OLAK5uy_ksX8toSfWMxe_w2W0J7B_p6jSCXCZmt7U"
                        },
                        { 
                          number: "03", 
                          title: "King of Hearts", 
                          album: "King of Hearts – Single",
                          spotifyUrl: "https://open.spotify.com/track/0RkOJ10BFpwOT24iQmcNFb",
                          appleUrl: "https://music.apple.com/gb/album/king-of-hearts-single/1767830745",
                          amazonUrl: "https://www.amazon.com/dp/B0DZZW3PSM",
                          youtubeUrl: "https://www.youtube.com/watch?v=QUJJlFiA_hU"
                        },
                        { 
                          number: "04", 
                          title: "Sticky", 
                          album: "Sticky – Single",
                          spotifyUrl: "https://open.spotify.com/track/1AdPAdWMH0afTWVWmZEj0Z",
                          appleUrl: "https://music.apple.com/us/album/sticky-single/1765943457",
                          amazonUrl: "https://www.amazon.com/dp/B0DZZW7MLR",
                          youtubeUrl: "https://www.youtube.com/watch?v=AiRxVhrWMD0"
                        }
                      ]}
                    />
                  </div>
                </div>
              </div>
            </section>
            

                
            {/* Trending Tracks Section */}
            <section className="py-16 mb-10">
              <div className="container mx-auto px-6">
                <h3 className="text-3xl font-bold text-center mb-3">
                  TRENDING <span className="text-amber-500">TRACKS</span>
                </h3>
                <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
                  These standout tracks are getting serious attention. Listen directly from this page or click to stream on your favorite platform.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {/* Trending Track 1: One Wish */}
                  <div className="bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 rounded-xl p-5 border border-zinc-700/30 hover:border-amber-500/30 transition-all group">
                    <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
                      <img 
                        src="https://i.ytimg.com/vi/FDAvAFSviMk/maxresdefault.jpg" 
                        alt="One Wish Album Cover" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-1 text-xs font-semibold bg-green-500/90 text-white rounded-full">HOT 🔥</span>
                      </div>

                      <a 
                        href="https://youtu.be/FDAvAFSviMk?si=aS-x64dELs_CqGJr" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center bg-amber-500/90 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-600"
                      >
                        <i className="fas fa-play text-xl pl-1"></i>
                      </a>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">One Wish</h4>
                    <p className="text-white/60 text-sm mb-3">Album: One Wish – Single</p>
                    <div className="flex items-center justify-between">
                      <a 
                        href="https://open.spotify.com/track/6n97QoeYhQr7hAKiDeWYL4?context=spotify:playlist:13nhg6SPkxfMaAkj2Cra6M&si=mmahD9sCQVaS0zRZO8Z6Vw" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-white/70 hover:text-green-500 transition-colors"
                      >
                        <i className="fab fa-spotify text-green-500 mr-2"></i>
                        <span className="text-sm">7,978 streams</span>
                      </a>
                      <a 
                        href="https://youtu.be/FDAvAFSviMk?si=aS-x64dELs_CqGJr" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-white/70 hover:text-red-500 transition-colors"
                      >
                        <i className="fab fa-youtube text-lg mr-1"></i>
                        <span className="text-sm">110,000+ streams</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Trending Track 2: Lagos Islands */}
                  <div className="bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 rounded-xl p-5 border border-zinc-700/30 hover:border-amber-500/30 transition-all group">
                    <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
                      <img 
                        src="https://i.ytimg.com/vi/bvyBlA0S4BA/maxresdefault.jpg" 
                        alt="Lagos Islands Album Cover" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-1 text-xs font-semibold bg-amber-500/90 text-white rounded-full">FEATURED</span>
                      </div>

                      <a 
                        href="https://youtu.be/bvyBlA0S4BA?si=oxrhhVzI_4exuD9E" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center bg-amber-500/90 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-600"
                      >
                        <i className="fas fa-play text-xl pl-1"></i>
                      </a>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">Lagos Islands</h4>
                    <p className="text-white/60 text-sm mb-3">Album: Eko Island Beats</p>
                    <div className="flex items-center justify-between">
                      <a 
                        href="https://open.spotify.com/track/5OjzxlwXLT0Sp19VnKRgVV?context=spotify:playlist:0OMB5854ceBpFP6vtT1uHn&si=9AWp_0uFTeO2MBiVc-DASQ" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-white/70 hover:text-green-500 transition-colors"
                      >
                        <i className="fab fa-spotify text-green-500 mr-2"></i>
                        <span className="text-sm">39,000+ streams</span>
                      </a>
                      <a 
                        href="https://youtu.be/bvyBlA0S4BA?si=oxrhhVzI_4exuD9E" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-white/70 hover:text-red-500 transition-colors"
                      >
                        <i className="fab fa-youtube text-lg mr-1"></i>
                        <span className="text-sm">98,000+ streams</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Trending Track 3: Whispers in the Wind */}
                  <div className="bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 rounded-xl p-5 border border-zinc-700/30 hover:border-amber-500/30 transition-all group">
                    <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
                      <img 
                        src="https://i.ytimg.com/vi/Q7Gc7HMnm8Q/maxresdefault.jpg" 
                        alt="Whispers in the Wind Album Cover" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-1 text-xs font-semibold bg-blue-500/90 text-white rounded-full">TRENDING</span>
                      </div>

                      <a 
                        href="https://youtu.be/Q7Gc7HMnm8Q?si=4cn4uM26nsuJgcWI" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center bg-amber-500/90 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-600"
                      >
                        <i className="fas fa-play text-xl pl-1"></i>
                      </a>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">Whispers in the Wind</h4>
                    <p className="text-white/60 text-sm mb-3">Album: Rise From Ashes</p>
                    <div className="flex items-center justify-between">
                      <a 
                        href="https://open.spotify.com/track/00w41xZw4ODLx7YbvOh4fc?context=spotify:playlist:7lUurLZ2vBhayCAc96tTp2&si=8LhTiVtxS_qxAr1W9KgIIg" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-white/70 hover:text-green-500 transition-colors"
                      >
                        <i className="fab fa-spotify text-green-500 mr-2"></i>
                        <span className="text-sm">34,000+ streams</span>
                      </a>
                      <a 
                        href="https://youtu.be/Q7Gc7HMnm8Q?si=4cn4uM26nsuJgcWI" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-white/70 hover:text-red-500 transition-colors"
                      >
                        <i className="fab fa-youtube text-lg mr-1"></i>
                        <span className="text-sm">22,000+ streams</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
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
                    "Curtis Dove is a true artistic chameleon, moving effortlessly between genres."
                  </p>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <blockquote className="border-l-4 border-amber-500/50 pl-4 italic text-white/70">
                  "...the range of talents and styles that Dove incorporates into his music is truly impressive. He's bringing a level of professionalism to his art that is setting him up for continued success as his career progresses."
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
          
          <div className="flex flex-col lg:flex-row items-start gap-16 pt-8">
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative group w-3/4 md:w-2/3">
                {/* Slower, thicker amber glow */}
                <div className="absolute -inset-3 rounded-full bg-amber-500/30 blur-xl animate-pulse-slow"></div>
                
                {/* Thicker elegant border */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/50 to-amber-600/50 animate-pulse-slow"></div>
                
                {/* Inner content container */}
                <div className="relative mx-1.5 my-1.5 overflow-hidden rounded-full border-4 border-zinc-900">
                  {/* Image */}
                  <img 
                    src={ProfilePicture} 
                    alt="Curtis Dove portrait" 
                    className="w-full h-auto aspect-square object-cover shadow-2xl transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity"></div>
                </div>
                
                {/* Signature with glow effect */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full">
                  <div className="relative">
                    {/* Glow layer */}
                    <div 
                      className="absolute inset-0 blur-md opacity-70 animate-pulse-slow"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(192, 202, 211, 0.2), rgba(192, 202, 211, 0.4), rgba(192, 202, 211, 0.2), transparent)',
                        transform: 'translateY(2px)'
                      }}
                    ></div>
                    
                    {/* Clean, elegant signature with less glow */}
                    <div className="flex flex-col items-center mt-3">
                      <div 
                        className="font-signature text-6xl text-center whitespace-nowrap group-hover:scale-105 transition-transform duration-700"
                        style={{
                          color: '#a0a8b1',
                          fontFamily: "'Great Vibes', cursive",
                          fontWeight: "400",
                          letterSpacing: "0.01em",
                          transform: 'scale(1.15)'
                        }}
                      >
                        Curtis Dove
                      </div>
                      
                      {/* Owner line */}
                      <div
                        className="mt-2 text-sm whitespace-nowrap"
                        style={{
                          color: '#7a8695',
                          fontFamily: "'Great Vibes', cursive",
                          letterSpacing: "0.03em",
                        }}
                      >
                        Owner of Dove Music, LLC
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <p className="text-xl leading-relaxed text-white/90">
                  Curtis Dove is a recording artist, songwriter, and digital sound architect known for blending Afrobeat, Pop, and Rock. His music fuses heartfelt storytelling with cutting-edge sound design, crafting immersive experiences across cultures and genres.
                </p>
                
                <p className="text-xl leading-relaxed text-white/90">
                  With over 141+ songs released across major streaming platforms, Curtis has developed a diverse catalog that resonates with listeners worldwide. His genre-bending approach creates a sound uniquely his own while pushing creative boundaries.
                </p>
                
                <p className="text-xl leading-relaxed text-white/90">
                  As an independent music producer, Curtis crafts emotionally rich, rhythm-forward tracks powered by cutting-edge digital production, delivering captivating musical experiences that tell authentic stories.
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
                      <span className="relative z-10">Rock</span>
                    </span>
                    
                    <span className="group relative px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-500/30 rounded-full text-sm transition-all duration-300 hover:border-amber-500/50">
                      <span className="absolute -inset-px bg-gradient-to-r from-amber-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
                      <span className="relative z-10">Metal</span>
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
            <div className="mb-4">
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                className="text-3xl font-bold text-white hover:text-amber-500 transition-colors"
              >
                CURTIS DOVE
              </a>
            </div>
            
            <div className="mb-3">
              <p className="text-amber-400/90 font-medium tracking-wider">
                🎶 Songwriter • Producer • Digital Sound Architect
              </p>
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
