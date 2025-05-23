interface AlbumCardProps {
  title: string;
  type: string;
  year: string;
  tracks: number;
  duration: string;
  image: string;
  featured?: boolean;
  tag?: string;
  tagColor?: string;
  spotifyUrl?: string;
}

export default function AlbumCard({ 
  title, 
  type, 
  year, 
  tracks, 
  duration, 
  image, 
  featured = false,
  tag = '', 
  tagColor = 'text-accent',
  spotifyUrl = 'https://open.spotify.com/artist/5ZCP0tbgVY2Lx7JG0grqNR?si=S2VQDr7fSJu2NNjjjAuFxg'
}: AlbumCardProps) {
  return (
    <div className="album-card bg-secondary rounded-xl overflow-hidden shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img src={image} alt={`${title} album cover`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
          <div>
            <h3 className="font-bold text-xl mb-1">{title}</h3>
            <p className="text-sm text-[hsl(var(--light-text))]">{type} • {year}</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between mb-4">
          <span className="text-sm text-[hsl(var(--light-text))]">{tracks} tracks • {duration}</span>
          {featured && <span className={`${tagColor} text-sm font-medium`}>{tag}</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-2 rounded-full bg-[#1DB954] bg-opacity-10 hover:bg-opacity-20 transition duration-300">
            <i className="fab fa-spotify mr-2"></i> Spotify
          </a>
          <a href="https://www.amazon.com/music/player/artists/B0DD4HQ6D3/curtis-dove" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-2 rounded-full bg-[#232F3E] bg-opacity-10 hover:bg-opacity-20 transition duration-300">
            <i className="fab fa-amazon mr-2"></i> Amazon
          </a>
          <a href="https://www.youtube.com/@curtisdovemusic" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-2 rounded-full bg-[#FF0000] bg-opacity-10 hover:bg-opacity-20 transition duration-300">
            <i className="fab fa-youtube mr-2"></i> YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
