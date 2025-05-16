import { useState, useEffect } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine which section is in view
      const sections = ['home', 'bio', 'music'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      }) || 'home';
      
      setActiveSection(current);
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
    <header className={`fixed top-0 left-0 right-0 z-50 bg-primary bg-opacity-80 backdrop-blur-md transition-all duration-300 ${scrolled ? 'py-2 shadow-lg' : 'py-4'}`}>
      <nav className="container mx-auto px-4 flex justify-center items-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 justify-center">
          <button 
            onClick={() => scrollToSection('home')} 
            className={`nav-link font-medium ${activeSection === 'home' ? 'text-accent' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('bio')} 
            className={`nav-link font-medium ${activeSection === 'bio' ? 'text-accent' : ''}`}
          >
            Bio
          </button>
          <button 
            onClick={() => scrollToSection('music')} 
            className={`nav-link font-medium ${activeSection === 'music' ? 'text-accent' : ''}`}
          >
            Music
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
        <div className={`fixed inset-0 bg-primary bg-opacity-95 flex flex-col items-center justify-center space-y-8 transform transition duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-2xl font-medium hover:text-accent transition duration-300"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('bio')} 
            className="text-2xl font-medium hover:text-accent transition duration-300"
          >
            Bio
          </button>
          <button 
            onClick={() => scrollToSection('music')} 
            className="text-2xl font-medium hover:text-accent transition duration-300"
          >
            Music
          </button>
          
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
