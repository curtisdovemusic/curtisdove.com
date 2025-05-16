import AlbumCard from "@/components/AlbumCard";
import { albums } from "@/lib/data";

export default function Music() {
  return (
    <section id="music" className="py-20 bg-primary mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-montserrat mb-3">Latest <span className="gradient-text">Music</span></h2>
          <p className="text-[hsl(var(--light-text))] max-w-2xl mx-auto">Stream Curtis Dove's music on your favorite platforms</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album, index) => (
            <AlbumCard
              key={index}
              title={album.title}
              type={album.type}
              year={album.year}
              tracks={album.tracks}
              duration={album.duration}
              image={album.image}
              featured={album.featured}
              tag={album.tag}
              tagColor={album.tagColor}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Listen Everywhere</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-6 py-3 rounded-full bg-[#1DB954] bg-opacity-10 hover:bg-opacity-20 transition duration-300">
              <i className="fab fa-spotify text-xl mr-2"></i> Spotify
            </a>
            <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-6 py-3 rounded-full bg-[#FA57C1] bg-opacity-10 hover:bg-opacity-20 transition duration-300">
              <i className="fab fa-apple text-xl mr-2"></i> Apple Music
            </a>
            <a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-6 py-3 rounded-full bg-[#FF0000] bg-opacity-10 hover:bg-opacity-20 transition duration-300">
              <i className="fab fa-youtube text-xl mr-2"></i> YouTube Music
            </a>
            <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-6 py-3 rounded-full bg-[#FF7700] bg-opacity-10 hover:bg-opacity-20 transition duration-300">
              <i className="fab fa-soundcloud text-xl mr-2"></i> SoundCloud
            </a>
            <a href="https://bandcamp.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-6 py-3 rounded-full bg-[#629aa9] bg-opacity-10 hover:bg-opacity-20 transition duration-300">
              <i className="fab fa-bandcamp text-xl mr-2"></i> Bandcamp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
