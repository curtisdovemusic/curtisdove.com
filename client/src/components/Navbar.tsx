import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-primary bg-opacity-80 backdrop-blur-md transition-all duration-300 ${scrolled ? 'py-2 shadow-lg' : 'py-4'}`}>
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-montserrat text-white z-10">
          <span className="gradient-text">Curtis Dove</span>
          <span className="text-[hsl(var(--light-text))]"> Music</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="nav-link font-medium">Home</Link>
          <Link href="/bio" className="nav-link font-medium">Bio</Link>
          <Link href="/music" className="nav-link font-medium">Music</Link>
          <Link href="/playlists" className="nav-link font-medium">Playlists</Link>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button 
          onClick={toggleMobileMenu} 
          className="block md:hidden text-white focus:outline-none z-10"
          aria-label="Toggle navigation menu"
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
        
        {/* Mobile Navigation Menu */}
        <div className={`fixed inset-0 bg-primary bg-opacity-95 flex flex-col items-center justify-center space-y-8 transform transition duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <Link href="/" className="text-2xl font-medium hover:text-accent transition duration-300">Home</Link>
          <Link href="/bio" className="text-2xl font-medium hover:text-accent transition duration-300">Bio</Link>
          <Link href="/music" className="text-2xl font-medium hover:text-accent transition duration-300">Music</Link>
          <Link href="/playlists" className="text-2xl font-medium hover:text-accent transition duration-300">Playlists</Link>
          <div className="flex space-x-6 mt-8">
            <a href="https://www.facebook.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="social-icon text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="social-icon text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://open.spotify.com/artist/5ZCP0tbgVY2Lx7JG0grqNR?si=S2VQDr7fSJu2NNjjjAuFxg" target="_blank" rel="noopener noreferrer" className="social-icon text-2xl">
              <i className="fab fa-spotify"></i>
            </a>
            <a href="https://www.youtube.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="social-icon text-2xl">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.tiktok.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="social-icon text-2xl">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
