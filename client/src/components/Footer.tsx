export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer id="connect" className="bg-black py-12 border-t border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">CURTIS <span className="text-amber-500">DOVE</span></h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-10">
            Boundary-pushing, genre-blending artist with 20,000+ monthly Spotify listeners.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a href="https://www.facebook.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-amber-500 hover:text-white transition-all duration-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-amber-500 hover:text-white transition-all duration-300">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.tiktok.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-amber-500 hover:text-white transition-all duration-300">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="https://www.youtube.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-amber-500 hover:text-white transition-all duration-300">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://open.spotify.com/artist/5ZCP0tbgVY2Lx7JG0grqNR?si=S2VQDr7fSJu2NNjjjAuFxg" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-amber-500 hover:text-white transition-all duration-300">
            <i className="fab fa-spotify"></i>
          </a>
          <a href="https://soundcloud.com/user-314281859" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-amber-500 hover:text-white transition-all duration-300">
            <i className="fab fa-soundcloud"></i>
          </a>
          <a href="https://www.amazon.com/music/player/artists/B0DD4HQ6D3/curtis-dove" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-amber-500 hover:text-white transition-all duration-300">
            <i className="fab fa-amazon"></i>
          </a>
          <a href="https://www.threads.com/@curtisdovemusic?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-amber-500 hover:text-white transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.587 1.5 12.186c.48.868.982 1.725 1.574 2.493 1.528 1.997 3.858 3.159 6.54 3.275.206.008.435.016.677.016 1.666 0 3.85-.398 5.723-2.234 1.582-1.551 2.479-3.614 2.665-6.137.104-1.447-.142-2.517-2.608-3.018-1.35-.275-2.383-.847-3.172-1.748-.802-.915-1.225-2.01-1.225-3.233 0-2.406 1.061-4.384 3.069-5.712A9.354 9.354 0 0112.186 0c4.306 0 6.858 2.049 7.896 3.247.86.987 1.419 2.153 1.419 3.251 0 2.005-1.051 3.417-2.467 4.009-.216.092-.435.182-.661.264 1.635.709 2.858 1.885 3.442 3.523.521 1.469.583 3.215.174 5.144-.799 3.791-2.633 6.148-5.703 7.318-1.729.661-3.695.986-5.859.952-2.736-.024-5.047-.681-6.867-1.943-2.162-1.502-3.617-3.577-4.213-5.972-.197-.795-.323-1.625-.375-2.431-.015-.248-.023-.453-.023-.681V12l.036-.44c.052-1.747.248-3.564 1.238-5.313.723-1.287 1.713-2.419 2.949-3.371" />
            </svg>
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-center">
          <div>
            <h3 className="text-sm uppercase tracking-wider font-bold mb-4 text-amber-500">Navigation</h3>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection('home')} className="text-white/70 hover:text-amber-500 transition duration-300">Home</button></li>
              <li><button onClick={() => scrollToSection('music')} className="text-white/70 hover:text-amber-500 transition duration-300">Music</button></li>
              <li><button onClick={() => scrollToSection('video')} className="text-white/70 hover:text-amber-500 transition duration-300">Video</button></li>
              <li><button onClick={() => scrollToSection('connect')} className="text-white/70 hover:text-amber-500 transition duration-300">Connect</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-wider font-bold mb-4 text-amber-500">Stream</h3>
            <ul className="space-y-3">
              <li><a href="https://open.spotify.com/artist/5ZCP0tbgVY2Lx7JG0grqNR?si=S2VQDr7fSJu2NNjjjAuFxg" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-amber-500 transition duration-300">Spotify</a></li>
              <li><a href="https://www.amazon.com/music/player/artists/B0DD4HQ6D3/curtis-dove" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-amber-500 transition duration-300">Amazon Music</a></li>
              <li><a href="https://soundcloud.com/user-314281859" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-amber-500 transition duration-300">SoundCloud</a></li>
              <li><a href="#" className="text-white/70 hover:text-amber-500 transition duration-300">Apple Music</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-wider font-bold mb-4 text-amber-500">Follow</h3>
            <ul className="space-y-3">
              <li><a href="https://www.instagram.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-amber-500 transition duration-300">Instagram</a></li>
              <li><a href="https://www.threads.com/@curtisdovemusic?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-amber-500 transition duration-300">Threads</a></li>
              <li><a href="https://www.tiktok.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-amber-500 transition duration-300">TikTok</a></li>
              <li><a href="https://www.facebook.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-amber-500 transition duration-300">Facebook</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-wider font-bold mb-4 text-amber-500">Watch</h3>
            <ul className="space-y-3">
              <li><a href="https://www.youtube.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-amber-500 transition duration-300">YouTube</a></li>
              <li><a href="https://open.spotify.com/playlist/0OMB5854ceBpFP6vtT1uHn?si=4I0mTFrNTIOZBGfgZQu-fw" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-amber-500 transition duration-300">Featured Playlist</a></li>
              <li><button onClick={() => scrollToSection('press')} className="text-white/70 hover:text-amber-500 transition duration-300">Press</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 mt-8 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Curtis Dove Music. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
