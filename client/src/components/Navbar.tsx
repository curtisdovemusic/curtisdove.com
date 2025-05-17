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
          <button 
            onClick={() => scrollToSection('press')} 
            className="text-amber-500 hover:text-white border border-amber-500 px-4 py-1 rounded-md uppercase text-sm font-bold tracking-wider"
          >
            Press
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
          <button 
            onClick={() => scrollToSection('press')} 
            className="text-2xl font-bold text-amber-500 border-2 border-amber-500 px-6 py-2 rounded-lg uppercase transition duration-300"
          >
            Press
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.587 1.5 12.186c.48.868.982 1.725 1.574 2.493 1.528 1.997 3.858 3.159 6.54 3.275.206.008.435.016.677.016 1.666 0 3.85-.398 5.723-2.234 1.582-1.551 2.479-3.614 2.665-6.137.104-1.447-.142-2.517-2.608-3.018-1.35-.275-2.383-.847-3.172-1.748-.802-.915-1.225-2.01-1.225-3.233 0-2.406 1.061-4.384 3.069-5.712A9.354 9.354 0 0112.186 0c4.306 0 6.858 2.049 7.896 3.247.86.987 1.419 2.153 1.419 3.251 0 2.005-1.051 3.417-2.467 4.009-.216.092-.435.182-.661.264 1.635.709 2.858 1.885 3.442 3.523.521 1.469.583 3.215.174 5.144-.799 3.791-2.633 6.148-5.703 7.318-1.729.661-3.695.986-5.859.952-2.736-.024-5.047-.681-6.867-1.943-2.162-1.502-3.617-3.577-4.213-5.972-.197-.795-.323-1.625-.375-2.431-.015-.248-.023-.453-.023-.681V12l.036-.44c.052-1.747.248-3.564 1.238-5.313.723-1.287 1.713-2.419 2.949-3.371" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
