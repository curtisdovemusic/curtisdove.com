import { useState, useEffect } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <div className="w-10"></div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-white hover:text-amber-500 transition-colors duration-300 uppercase text-sm font-bold tracking-wider"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('music')} 
            className="text-white hover:text-amber-500 transition-colors duration-300 uppercase text-sm font-bold tracking-wider"
          >
            Music
          </button>
          <button 
            onClick={() => scrollToSection('video')} 
            className="text-white hover:text-amber-500 transition-colors duration-300 uppercase text-sm font-bold tracking-wider"
          >
            Video
          </button>
          <button 
            onClick={() => scrollToSection('connect')} 
            className="text-white hover:text-amber-500 transition-colors duration-300 uppercase text-sm font-bold tracking-wider"
          >
            Connect
          </button>
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
        <div className={`fixed inset-0 bg-black/95 flex flex-col items-center justify-center space-y-8 transform transition duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-2xl font-bold text-white hover:text-amber-500 uppercase transition duration-300"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('music')} 
            className="text-2xl font-bold text-white hover:text-amber-500 uppercase transition duration-300"
          >
            Music
          </button>
          <button 
            onClick={() => scrollToSection('video')} 
            className="text-2xl font-bold text-white hover:text-amber-500 uppercase transition duration-300"
          >
            Video
          </button>
          <button 
            onClick={() => scrollToSection('connect')} 
            className="text-2xl font-bold text-white hover:text-amber-500 uppercase transition duration-300"
          >
            Connect
          </button>
          
          <div className="flex space-x-6 mt-8">
            <a href="https://www.facebook.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-amber-500/20 hover:text-amber-500 transition-all duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-amber-500/20 hover:text-amber-500 transition-all duration-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://open.spotify.com/artist/5ZCP0tbgVY2Lx7JG0grqNR?si=S2VQDr7fSJu2NNjjjAuFxg" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-amber-500/20 hover:text-amber-500 transition-all duration-300">
              <i className="fab fa-spotify"></i>
            </a>
            <a href="https://www.youtube.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-amber-500/20 hover:text-amber-500 transition-all duration-300">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.threads.com/@curtisdovemusic?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-amber-500/20 hover:text-amber-500 transition-all duration-300">
              <i className="fab fa-threads"></i>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
