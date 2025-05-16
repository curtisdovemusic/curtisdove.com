export default function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-8 border-t border-accent/10">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <p className="text-[hsl(var(--light-text))] text-center mb-8 max-w-2xl mx-auto">
            Fusing Afrobeat, Afro-fusion, Afropop, and R&B with Pop, Alternative Rock, and Dance music. 20,000+ monthly Spotify listeners and counting.
          </p>
          
          <div className="flex justify-center space-x-4 mb-10">
            <a href="https://www.facebook.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="social-icon w-10 h-10 flex items-center justify-center bg-secondary rounded-full hover:bg-accent/20 transition-all duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="social-icon w-10 h-10 flex items-center justify-center bg-secondary rounded-full hover:bg-accent/20 transition-all duration-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://open.spotify.com/artist/5ZCP0tbgVY2Lx7JG0grqNR?si=S2VQDr7fSJu2NNjjjAuFxg" target="_blank" rel="noopener noreferrer" className="social-icon w-10 h-10 flex items-center justify-center bg-secondary rounded-full hover:bg-accent/20 transition-all duration-300">
              <i className="fab fa-spotify"></i>
            </a>
            <a href="https://www.youtube.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="social-icon w-10 h-10 flex items-center justify-center bg-secondary rounded-full hover:bg-accent/20 transition-all duration-300">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.tiktok.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="social-icon w-10 h-10 flex items-center justify-center bg-secondary rounded-full hover:bg-accent/20 transition-all duration-300">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="https://soundcloud.com/user-314281859" target="_blank" rel="noopener noreferrer" className="social-icon w-10 h-10 flex items-center justify-center bg-secondary rounded-full hover:bg-accent/20 transition-all duration-300">
              <i className="fab fa-soundcloud"></i>
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-bold mb-4">Site Links</h3>
              <ul className="space-y-3">
                <li><button onClick={() => { const el = document.getElementById('home'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Home</button></li>
                <li><button onClick={() => { const el = document.getElementById('bio'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Bio</button></li>
                <li><button onClick={() => { const el = document.getElementById('music'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Music</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Music</h3>
              <ul className="space-y-3">
                <li><a href="https://open.spotify.com/artist/5ZCP0tbgVY2Lx7JG0grqNR?si=S2VQDr7fSJu2NNjjjAuFxg" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Spotify</a></li>
                <li><a href="https://www.amazon.com/music/player/artists/B0DD4HQ6D3/curtis-dove" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Amazon Music</a></li>
                <li><a href="https://www.youtube.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">YouTube</a></li>
                <li><a href="https://soundcloud.com/user-314281859" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">SoundCloud</a></li>
                <li><a href="https://open.spotify.com/playlist/0OMB5854ceBpFP6vtT1uHn?si=4I0mTFrNTIOZBGfgZQu-fw" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">My Playlist</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Follow</h3>
              <ul className="space-y-3">
                <li><a href="https://www.instagram.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">TikTok</a></li>
                <li><a href="https://www.youtube.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--light-text))] hover:text-accent transition duration-300">YouTube</a></li>
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
