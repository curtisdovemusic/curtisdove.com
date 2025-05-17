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
            <span className="text-sm font-semibold">@</span>
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
          <p className="mt-1">Dove Music, LLC</p>
        </div>
      </div>
    </footer>
  );
}
