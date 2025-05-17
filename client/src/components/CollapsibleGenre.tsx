import { useState } from 'react';
import { Link } from 'wouter';

interface Song {
  number: string;
  title: string;
  genre: string;
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
        className="group relative bg-gradient-to-r from-[#023047]/80 to-[#219ebc]/40 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ffb703] to-[#fb8500] rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-[#8ecae6]/30 to-[#219ebc]/20 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500 group-hover:scale-105"></div>
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
              className="group relative bg-gradient-to-r from-[#023047]/60 to-[#219ebc]/20 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ffb703] to-[#fb8500] rounded-xl opacity-0 group-hover:opacity-70 blur-md transition-all duration-500"></div>
              <div className="relative flex items-center p-3 border border-[#219ebc]/10 rounded-xl bg-[#023047]/95 z-10">
                <div className="w-10 h-10 flex items-center justify-center shrink-0 mr-4">
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffb703] to-[#fb8500]">
                    {song.number}
                  </span>
                </div>
                <div className="flex-grow mr-4">
                  <h4 className="text-white font-medium">{song.title}</h4>
                  <p className="text-sm text-[#8ecae6]">{song.genre}</p>
                </div>
                <div className="shrink-0">
                  <button className="px-3 py-1.5 bg-gradient-to-r from-[#ffb703] to-[#fb8500] rounded-full text-xs font-bold text-[#023047]">
                    Listen Now
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-center mt-2">
            <Link 
              href={`/artist-picks?genre=${genre}`} 
              className="inline-flex items-center text-[#8ecae6] hover:text-[#ffb703] transition-colors p-2"
            >
              <span>View All Tracks</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}