import SocialLinks from "@/components/SocialLinks";
import { albums } from "@/lib/data";
import { useEffect, useRef } from "react";

export default function Home() {
  const featuredPlaylist = albums.find(album => album.featured);
  const otherPlaylists = albums.filter(album => !album.featured);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const otherPlaylistsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate elements on load
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            if (entry.target.classList.contains('animate-ready')) {
              if (entry.target.classList.contains('slide-up')) {
                entry.target.classList.add('animate-slide-up');
              } else if (entry.target.classList.contains('fade-in')) {
                entry.target.classList.add('animate-fade-in');
              } else if (entry.target.classList.contains('slide-in-right')) {
                entry.target.classList.add('animate-slide-in-right');
              } else if (entry.target.classList.contains('slide-in-left')) {
                entry.target.classList.add('animate-slide-in-left');
              } else if (entry.target.classList.contains('scale-in')) {
                entry.target.classList.add('animate-scale-in');
              }
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe elements
    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (featuredRef.current) observer.observe(featuredRef.current);
    if (otherPlaylistsRef.current) observer.observe(otherPlaylistsRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section id="home" className="min-h-screen py-24 pt-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] right-[15%] w-64 h-64 rounded-full bg-amber-500/5 blur-3xl animate-float"></div>
        <div className="absolute top-[40%] left-[10%] w-72 h-72 rounded-full bg-amber-600/10 blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-[20%] right-[20%] w-56 h-56 rounded-full bg-amber-400/5 blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div ref={heroRef} className="mb-16">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold font-montserrat mb-8 leading-tight gradient-text opacity-0 animate-ready slide-up"
          >
            Curtis Dove
          </h1>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto text-[hsl(var(--light-text))] opacity-0 animate-ready slide-up"
            style={{animationDelay: '0.2s'}}
          >
            Boundary-pushing, genre-blending artist with 20,000+ monthly Spotify listeners
          </p>
        </div>
        
        {featuredPlaylist && (
          <div ref={featuredRef} className="mb-16 opacity-0 animate-ready fade-in">
            <div className="max-w-5xl mx-auto glassmorphism rounded-2xl p-6 md:p-8">
              <h2 className="text-3xl font-bold mb-6 gradient-text">{featuredPlaylist.title}</h2>
              <div className="flex justify-center mb-8 relative glow-effect rounded-xl overflow-hidden">
                <div className="animated-gradient-border rounded-xl w-full max-w-[700px]">
                  <iframe 
                    src={`https://open.spotify.com/embed/playlist/${featuredPlaylist.spotifyUrl.split('/').pop()?.split('?')[0]}?utm_source=generator&theme=0`}
                    width="100%" 
                    height="352" 
                    style={{maxWidth: '700px', borderRadius: '0.75rem'}}
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy">
                  </iframe>
                </div>
              </div>
              
              <div className="flex justify-center mb-6">
                <a 
                  href={featuredPlaylist.spotifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="spotify-button px-8 py-3 rounded-full font-semibold shadow-lg flex items-center justify-center"
                >
                  <span><i className="fab fa-spotify mr-2"></i> Save to Spotify</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {otherPlaylists.length > 0 && (
          <div ref={otherPlaylistsRef} className="mb-16 opacity-0 animate-ready slide-up">
            <h2 className="text-2xl font-bold mb-8">More Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto staggered-children">
              {otherPlaylists.map((playlist, index) => (
                <div key={index} className="playlist-card bg-secondary rounded-lg overflow-hidden shadow-lg">
                  <div className="p-5">
                    <div className="flex items-start mb-3">
                      <div className="image-hover-zoom w-16 h-16 rounded-md overflow-hidden mr-3 flex-shrink-0">
                        <img
                          src={playlist.image}
                          alt={playlist.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 truncate">{playlist.title}</h3>
                        <p className="text-sm text-[hsl(var(--light-text))]">
                          {playlist.type} • {playlist.tracks} tracks
                        </p>
                      </div>
                    </div>
                    <iframe 
                      src={`https://open.spotify.com/embed/playlist/${playlist.spotifyUrl.split('/').pop()?.split('?')[0]}?utm_source=generator&theme=0`}
                      width="100%" 
                      height="80" 
                      frameBorder="0" 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy">
                    </iframe>
                    <div className="mt-3 text-right">
                      <a 
                        href={playlist.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-[hsl(var(--light-text))] hover:text-accent transition-colors duration-300"
                      >
                        <span className="mr-1">Listen on Spotify</span>
                        <i className="fas fa-external-link-alt text-xs"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="opacity-0 animate-ready fade-in" style={{animationDelay: '0.4s'}}>
          <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
          <SocialLinks size="lg" className="mb-8" />
        </div>
      </div>
    </section>
  );
}
