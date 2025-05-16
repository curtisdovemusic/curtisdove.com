import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-8 border-t border-accent/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="text-3xl font-bold font-montserrat text-white block mb-4">
              <span className="gradient-text">Curtis Dove</span>
              <span className="text-[hsl(var(--light-text))]">Music</span>
            </Link>
            <p className="text-[hsl(var(--light-text))] max-w-xs">Bringing vibrant sounds and rhythms from Lagos to Tokyo and beyond.</p>
            
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/CurtisDoveMusic" target="_blank" rel="noopener noreferrer" className="social-icon w-10 h-10 flex items-center justify-center bg-secondary rounded-full hover:bg-accent/20 transition-all duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="social-icon w-10 h-10 flex items-center justify-center bg-secondary rounded-full hover:bg-accent/20 transition-all duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="social-icon w-10 h-10 flex items-center justify-center bg-secondary rounded-full hover:bg-accent/20 transition-all duration-300">
                <i className="fab fa-spotify"></i>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon w-10 h-10 flex items-center justify-center bg-secondary rounded-full hover:bg-accent/20 transition-all duration-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Site Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Home</Link></li>
                <li><Link href="/bio" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Bio</Link></li>
                <li><Link href="/music" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Music</Link></li>
                <li><Link href="/shows" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Shows</Link></li>
                <li><Link href="/contact" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Music</h3>
              <ul className="space-y-3">
                <li><a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Spotify</a></li>
                <li><a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Apple Music</a></li>
                <li><a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">YouTube Music</a></li>
                <li><a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">SoundCloud</a></li>
                <li><a href="https://bandcamp.com" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Bandcamp</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li><a href="mailto:curtisdovemusic@gmail.com" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Email</a></li>
                <li><Link href="/contact" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Booking</Link></li>
                <li><Link href="/contact" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Press Kit</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-accent/10 pt-8 mt-8 text-center text-sm text-[hsl(var(--light-text))]">
          <p>&copy; {new Date().getFullYear()} Curtis Dove Music. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
