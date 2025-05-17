import { useState } from 'react';
import { Link } from 'wouter';
import { FaSpotify, FaAmazon, FaYoutube, FaApple } from 'react-icons/fa';

// Color schemes for album visuals

// Fallback color gradients for each album in case image fails to load
const getAlbumColor = (album: string) => {
  // Create color mapping for each album
  const colors: Record<string, string> = {
    'Lagos to Kano': 'from-orange-500 to-yellow-500',
    'Eko Island Beats': 'from-blue-500 to-cyan-400',
    'Lagos to Tokyo': 'from-pink-500 to-purple-500',
    'Sweet Poison': 'from-red-500 to-pink-500',
    'Fire & Wine': 'from-amber-500 to-red-500'
  };
  
  return colors[album] || 'from-gray-600 to-gray-800';
};

interface Song {
  number: string;
  title: string;
  album: string;
  spotifyUrl?: string;
  appleUrl?: string;
  amazonUrl?: string;
  youtubeUrl?: string;
}

interface CollapsibleGenreProps {
  title: string;
  genre: string;
  description: string;
  songs: Song[];
}

export default function CollapsibleGenre({
  title,
  genre,
  description,
  songs
}: CollapsibleGenreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group">
      {/* Main Clickable Tile */}
      <div 
        onClick={toggleExpand}
        className="group relative bg-gradient-to-r from-[#023047]/80 to-[#219ebc]/40 rounded-xl overflow-visible hover:shadow-2xl transition-all duration-700 cursor-pointer hover:scale-[1.01] hover:translate-y-[-6px] transform"
      >
        <div className="absolute inset-0 -bottom-2 bg-gradient-to-r from-[#ffb703] to-[#fb8500] rounded-xl opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-700"></div>
        <div className="absolute inset-x-0 bottom-[-4px] h-3 bg-gradient-to-r from-[#8ecae6] to-[#219ebc] rounded-b-xl opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-700"></div>
        <div className="relative flex items-center justify-between p-6 border border-[#219ebc]/20 rounded-xl bg-[#023047]/95 z-10">
          <div className="flex items-center w-full md:pr-4">
            <div className="w-24 md:w-32 lg:w-36 shrink-0 text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffb703] to-[#fb8500]">
              {title}
            </div>
            <div className="flex-1 pl-6 md:pl-8">
              <p className="text-[#8ecae6] text-sm md:text-base text-left line-clamp-2 leading-relaxed py-1">{description}</p>
            </div>
          </div>
          
          <div className="flex items-center shrink-0 ml-2">
            <Link 
              href={`/artist-picks?genre=${genre}`} 
              className="text-[#ffb703] hover:text-white transition-colors text-xs md:text-sm flex items-center mr-2 md:mr-4 font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <span>See All</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#219ebc]/20 transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Collapsible Content */}
      <div 
        className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? 'max-h-[1000px] mt-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-3 pl-4 pr-2 py-2">
          {songs.map((song, index) => (
            <div 
              key={index} 
              className="relative bg-gradient-to-r from-[#023047]/60 to-[#219ebc]/20 rounded-xl overflow-hidden transition-all duration-300 mb-2 transform hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-[#8ecae6]/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center p-2 sm:p-3 border border-[#219ebc]/10 hover:border-[#8ecae6]/50 rounded-xl bg-[#023047]/95 z-10">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 mr-2 sm:mr-3">
                  <span className="text-base sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffb703] to-[#fb8500]">
                    {song.number}
                  </span>
                </div>

                <div className="flex-grow mr-2 sm:mr-4 min-w-0">
                  <h4 className="text-white font-medium text-sm sm:text-base truncate">{song.title}</h4>
                  <p className="text-xs sm:text-sm text-[#8ecae6] truncate">{song.album}</p>
                </div>
                <div className="shrink-0">
                  <div className="relative" 
                    onMouseLeave={(e) => {
                      const dropdown = e.currentTarget.querySelector('div[role="menu"]');
                      if (dropdown) dropdown.classList.add('hidden');
                    }}
                  >
                    <button 
                      className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-[#ffb703] to-[#fb8500] rounded-full text-xs font-bold text-[#023047] flex items-center"
                      onClick={(e) => {
                        const dropdown = e.currentTarget.nextElementSibling;
                        if (dropdown) dropdown.classList.toggle('hidden');
                      }}
                    >
                      Listen <span className="ml-1">▾</span>
                    </button>
                    <div 
                      role="menu"
                      className="absolute right-0 top-full mt-2 w-60 bg-[#023047] border border-[#219ebc]/30 rounded-md shadow-lg z-20 hidden"
                    >
                      <div className="p-2">
                        <div className="text-center py-1 mb-2 text-white text-sm border-b border-[#219ebc]/30">
                          Listen on Your Platform
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <a 
                            href={song.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(song.title + ' ' + 'Curtis Dove')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex flex-col items-center justify-center p-2 rounded-md bg-[#1DB954]/10 hover:bg-[#1DB954]/20 transition-colors"
                          >
                            <FaSpotify className="text-[#1DB954] text-xl mb-1" />
                            <span className="text-xs text-white">Spotify</span>
                          </a>
                          <a 
                            href={song.appleUrl || `https://music.apple.com/search?term=${encodeURIComponent(song.title + ' ' + 'Curtis Dove')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex flex-col items-center justify-center p-2 rounded-md bg-[#fa57c1]/10 hover:bg-[#fa57c1]/20 transition-colors"
                          >
                            <FaApple className="text-[#fa57c1] text-xl mb-1" />
                            <span className="text-xs text-white">Apple Music</span>
                          </a>
                          <a 
                            href={song.amazonUrl || `https://music.amazon.com/search/${encodeURIComponent(song.title + ' ' + 'Curtis Dove')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex flex-col items-center justify-center p-2 rounded-md bg-[#FF9900]/10 hover:bg-[#FF9900]/20 transition-colors"
                          >
                            <FaAmazon className="text-[#FF9900] text-xl mb-1" />
                            <span className="text-xs text-white">Amazon</span>
                          </a>
                          <a 
                            href={song.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(song.title + ' ' + 'Curtis Dove')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex flex-col items-center justify-center p-2 rounded-md bg-[#FF0000]/10 hover:bg-[#FF0000]/20 transition-colors"
                          >
                            <FaYoutube className="text-[#FF0000] text-xl mb-1" />
                            <span className="text-xs text-white">YouTube</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          

        </div>
      </div>
    </div>
  );
}