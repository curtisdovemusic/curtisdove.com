import AlbumCard from "@/components/AlbumCard";
import { albums } from "@/lib/data";
import { useEffect, useRef, useState } from "react";

export default function Music() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const albumsRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);
  
  // Music platforms information
  const musicPlatforms = [
    {
      name: "Spotify",
      icon: "fab fa-spotify",
      color: "#1DB954",
      url: "https://open.spotify.com/artist/5ZCP0tbgVY2Lx7JG0grqNR?si=S2VQDr7fSJu2NNjjjAuFxg",
      description: "Stream all of Curtis Dove's music including exclusive playlists"
    },
    {
      name: "Amazon Music",
      icon: "fab fa-amazon",
      color: "#232F3E",
      url: "https://www.amazon.com/music/player/artists/B0DD4HQ6D3/curtis-dove",
      description: "Play Curtis Dove's tracks on Amazon Music with Prime subscription"
    },
    {
      name: "YouTube",
      icon: "fab fa-youtube",
      color: "#FF0000",
      url: "https://www.youtube.com/@curtisdovemusic",
      description: "Watch music videos and live performances"
    },
    {
      name: "SoundCloud",
      icon: "fab fa-soundcloud",
      color: "#FF7700",
      url: "https://soundcloud.com/user-314281859",
      description: "Discover exclusive mixes and unreleased tracks"
    },
    {
      name: "TikTok",
      icon: "fab fa-tiktok",
      color: "#000000",
      url: "https://www.tiktok.com/@curtisdovemusic",
      description: "Short clips and viral challenges featuring Curtis Dove's music"
    }
  ];

  useEffect(() => {
    // Animate elements on scroll
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
              } else if (entry.target.classList.contains('scale-in')) {
                entry.target.classList.add('animate-scale-in');
              }
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe elements
    if (titleRef.current) observer.observe(titleRef.current);
    if (descRef.current) observer.observe(descRef.current);
    if (albumsRef.current) observer.observe(albumsRef.current);
    if (platformsRef.current) observer.observe(platformsRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="music" className="py-24 bg-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div className="absolute top-0 right-0 w-full h-24 bg-gradient-to-b from-accent/5 to-transparent"></div>
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-52 h-52 rounded-full bg-amber-600/5 blur-3xl"></div>
        <div className="absolute -bottom-10 left-1/4 w-40 h-40 rounded-full bg-amber-400/5 blur-3xl"></div>
        
        {/* Music notes and symbols */}
        <div className="absolute top-20 left-10 text-4xl text-accent/10 animate-float" style={{animationDelay: '0s'}}>♪</div>
        <div className="absolute top-40 right-20 text-5xl text-amber-500/10 animate-float" style={{animationDelay: '1.5s'}}>♫</div>
        <div className="absolute bottom-20 left-1/3 text-3xl text-amber-600/10 animate-float" style={{animationDelay: '0.7s'}}>♩</div>
        <div className="absolute bottom-40 right-1/4 text-6xl text-accent/10 animate-float" style={{animationDelay: '2s'}}>♬</div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl font-bold font-montserrat mb-3 opacity-0 animate-ready slide-up"
          >
            Latest <span className="gradient-text">Music</span>
          </h2>
          <p 
            ref={descRef}
            className="text-[hsl(var(--light-text))] max-w-2xl mx-auto opacity-0 animate-ready slide-up"
            style={{animationDelay: '0.2s'}}
          >
            Stream Curtis Dove's music on your favorite platforms
          </p>
        </div>
        
        <div 
          ref={albumsRef}
          className="opacity-0 animate-ready fade-in"
          style={{animationDelay: '0.3s'}}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 staggered-children">
            {albums.map((album, index) => (
              <div key={index} className="transform transition-all duration-500 hover:scale-[1.03]">
                <AlbumCard
                  title={album.title}
                  type={album.type}
                  year={album.year}
                  tracks={album.tracks}
                  duration={album.duration}
                  image={album.image}
                  featured={album.featured}
                  tag={album.tag}
                  tagColor={album.tagColor}
                  spotifyUrl={album.spotifyUrl}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div 
          ref={platformsRef}
          className="mt-20 opacity-0 animate-ready slide-up"
          style={{animationDelay: '0.5s'}}
        >
          <div className="glassmorphism rounded-xl p-6 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Listen to Curtis Dove</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {musicPlatforms.map((platform, index) => (
                <a 
                  key={index}
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center p-6 rounded-lg transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg glow-effect animated-gradient-border"
                  style={{
                    backgroundColor: "#121212",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: `${platform.color}40`
                  }}
                >
                  <div className="mr-4 text-4xl" style={{ color: platform.color }}>
                    <i className={platform.icon}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-1">{platform.name}</h4>
                    <p className="text-sm text-[hsl(var(--light-text))]">{platform.description}</p>
                  </div>
                  <div className="ml-2">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300">
                      <i className="fas fa-external-link-alt"></i>
                    </span>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="bg-black/20 rounded-xl p-8 mb-10">
              <h3 className="text-xl font-bold mb-6 text-center">Featured Music Player</h3>
              
              <div className="flex justify-center">
                <div className="w-full max-w-3xl animated-gradient-border rounded-lg overflow-hidden">
                  <iframe 
                    src="https://open.spotify.com/embed/artist/5ZCP0tbgVY2Lx7JG0grqNR?utm_source=generator&theme=0" 
                    width="100%" 
                    height="352" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="rounded-lg">
                  </iframe>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => setSelectedPlatform(selectedPlatform ? null : "YouTube")}
                className="spotify-button px-8 py-3 rounded-full font-semibold shadow-lg flex items-center justify-center"
              >
                <span>
                  <i className="fab fa-youtube mr-2"></i> {selectedPlatform === "YouTube" ? "Hide Video" : "Watch Music Video"}
                </span>
              </button>
            </div>
            
            {selectedPlatform === "YouTube" && (
              <div className="mt-8 animate-fade-in">
                <div className="max-w-4xl mx-auto bg-black/30 p-4 rounded-xl overflow-hidden">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/videoseries?list=PLtgK30nhYgGZlh7VavbT1wAUFABaIWVLW" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="rounded-lg">
                    </iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
