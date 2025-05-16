import SocialLinks from "@/components/SocialLinks";
import { albums } from "@/lib/data";

export default function Home() {
  const featuredPlaylist = albums.find(album => album.featured);
  const otherPlaylists = albums.filter(album => !album.featured);
  
  return (
    <section id="home" className="min-h-screen py-24 pt-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-montserrat mb-8 leading-tight gradient-text">
          Curtis Dove
        </h1>
        <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto text-[hsl(var(--light-text))]">
          Boundary-pushing, genre-blending artist with 20,000+ monthly Spotify listeners
        </p>
        
        {featuredPlaylist && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">{featuredPlaylist.title}</h2>
            <div className="flex justify-center mb-8">
              <iframe 
                src={`https://open.spotify.com/embed/playlist/${featuredPlaylist.spotifyUrl.split('/').pop()?.split('?')[0]}?utm_source=generator&theme=0`}
                width="100%" 
                height="352" 
                style={{maxWidth: '700px'}}
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy">
              </iframe>
            </div>
            
            <div className="flex justify-center mb-16">
              <a 
                href={featuredPlaylist.spotifyUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(to right, #f59e0b, #e11d48)",
                  color: "white"
                }}
              >
                <i className="fab fa-spotify mr-2"></i> Save to Spotify
              </a>
            </div>
          </div>
        )}
        
        {otherPlaylists.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">More Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {otherPlaylists.map((playlist, index) => (
                <div key={index} className="bg-secondary rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{playlist.title}</h3>
                    <p className="text-sm text-[hsl(var(--light-text))] mb-4">{playlist.type} • {playlist.tracks} tracks</p>
                    <iframe 
                      src={`https://open.spotify.com/embed/playlist/${playlist.spotifyUrl.split('/').pop()?.split('?')[0]}?utm_source=generator&theme=0`}
                      width="100%" 
                      height="80" 
                      frameBorder="0" 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy">
                    </iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <h3 className="text-2xl font-bold mb-6">Follow Me</h3>
        <SocialLinks size="lg" className="mb-8" />
      </div>
    </section>
  );
}
