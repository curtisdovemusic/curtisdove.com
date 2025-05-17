import SocialLinks from "@/components/SocialLinks";
import { albums } from "@/lib/data";
import { useEffect, useRef } from "react";

export default function Home() {
  const featuredPlaylist = albums.find(album => album.featured);
  const otherPlaylists = albums.filter(album => !album.featured);
  
  // Music platforms information
  const musicPlatforms = [
    {
      name: "Spotify",
      icon: "fab fa-spotify",
      color: "#1DB954",
      url: "https://open.spotify.com/artist/5ZCP0tbgVY2Lx7JG0grqNR?si=S2VQDr7fSJu2NNjjjAuFxg"
    },
    {
      name: "Apple Music",
      icon: "fab fa-apple",
      color: "#fc3c44",
      url: "#"
    },
    {
      name: "Amazon Music",
      icon: "fab fa-amazon",
      color: "#232F3E",
      url: "https://www.amazon.com/music/player/artists/B0DD4HQ6D3/curtis-dove"
    },
    {
      name: "YouTube",
      icon: "fab fa-youtube",
      color: "#FF0000",
      url: "https://www.youtube.com/@curtisdovemusic"
    },
    {
      name: "SoundCloud",
      icon: "fab fa-soundcloud",
      color: "#FF7700",
      url: "https://soundcloud.com/user-314281859"
    }
  ];

  return (
    <section id="home" className="min-h-screen overflow-hidden bg-black">
      {/* Hero Section - Full height with background video */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background video or image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black z-10"></div>
          <img 
            src="/attached_assets/CurtisDoveProfilePicture.jpg" 
            alt="Curtis Dove" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        {/* Hero content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in">
            CURTIS DOVE
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up">
            {musicPlatforms.map((platform, index) => (
              <a 
                key={index}
                href={platform.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <i className={`${platform.icon} text-xl mr-2`} style={{color: platform.color}}></i>
                <span className="text-white font-medium">{platform.name}</span>
              </a>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <a 
              href="#music" 
              className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 rounded-full text-lg font-medium text-white hover:from-amber-600 hover:to-amber-700 hover:shadow-lg transition-all duration-300 animate-pulse-slow" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              LISTEN NOW
            </a>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a 
            href="#music"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-white text-3xl opacity-75 hover:opacity-100 transition-opacity"
          >
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      </div>
      
      {/* Featured Music Section */}
      <div id="music" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">LATEST <span className="text-amber-500">MUSIC</span></h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Stream Curtis Dove's genre-blending sound featuring Afrobeat, R&B, Pop, and more
            </p>
          </div>
          
          {featuredPlaylist && (
            <div className="mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe 
                    src={`https://open.spotify.com/embed/playlist/${featuredPlaylist.spotifyUrl.split('/').pop()?.split('?')[0]}?utm_source=generator&theme=0`}
                    width="100%" 
                    height="100%" 
                    style={{minHeight: '380px'}}
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy">
                  </iframe>
                </div>
              </div>
            </div>
          )}
          
          {/* Other playlists in a grid */}
          {otherPlaylists.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center text-white">MORE MUSIC</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {otherPlaylists.map((playlist, index) => (
                  <div key={index} className="bg-zinc-900 rounded-lg overflow-hidden shadow-xl transform transition duration-500 hover:scale-[1.02] hover:shadow-amber-500/20">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={playlist.image}
                        alt={playlist.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-bold text-white mb-1">{playlist.title}</h3>
                        <p className="text-white/70 text-sm">
                          {playlist.type} • {playlist.tracks} tracks
                        </p>
                      </div>
                      <a 
                        href={playlist.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-4 bottom-4 w-12 h-12 flex items-center justify-center bg-green-500 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
                      >
                        <i className="fab fa-spotify text-xl text-white"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Video Section */}
      <div className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3 text-white">WATCH <span className="text-amber-500">VIDEO</span></h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/videoseries?list=PLtgK30nhYgGZlh7VavbT1wAUFABaIWVLW" 
                title="Curtis Dove Music Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      </div>
      
      {/* Connect Section */}
      <div className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10 text-white">CONNECT <span className="text-amber-500">WITH ME</span></h2>
          <SocialLinks size="lg" className="flex justify-center mb-10" />
          
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-white">STREAM MY MUSIC</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {musicPlatforms.map((platform, index) => (
                <a 
                  key={index}
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col items-center gap-2 group"
                >
                  <div 
                    className="w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110" 
                    style={{backgroundColor: `${platform.color}20`}}
                  >
                    <i className={`${platform.icon} text-3xl`} style={{color: platform.color}}></i>
                  </div>
                  <span className="text-white/80 font-medium group-hover:text-white transition-colors">{platform.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
