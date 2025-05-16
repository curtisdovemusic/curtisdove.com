import { albums } from "@/lib/data";
import AlbumCard from "@/components/AlbumCard";

export default function Playlists() {
  // Filter only playlists
  const playlists = albums.filter(album => album.type.includes('Playlist') || album.type.includes('Collection'));

  return (
    <section id="playlists" className="py-20 bg-primary relative overflow-hidden mt-16">
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')` }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-montserrat mb-3">Featured <span className="gradient-text">Playlists</span></h2>
          <p className="text-[hsl(var(--light-text))] max-w-2xl mx-auto">Curated collections of my music</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playlists.map((playlist, index) => (
            <AlbumCard
              key={index}
              title={playlist.title}
              type={playlist.type}
              year={playlist.year}
              tracks={playlist.tracks}
              duration={playlist.duration}
              image={playlist.image}
              featured={playlist.featured}
              tag={playlist.tag}
              tagColor={playlist.tagColor}
              spotifyUrl={playlist.spotifyUrl}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Save to Your Platform</h3>
          <p className="text-[hsl(var(--light-text))] max-w-2xl mx-auto mb-8">
            Follow these playlists on your favorite streaming platform to listen anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
