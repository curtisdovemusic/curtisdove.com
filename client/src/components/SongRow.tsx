import React from 'react';

// Import album artwork directly
import LagosKano from '../../attached_assets/Lagos to Kano.jpeg';
import EkoBeats from '../../attached_assets/Eko Island Beats.jpeg';
import LagosTokyoImg from '../../attached_assets/Lagos to Tokyo.webp';
import SweetPoisonImg from '../../attached_assets/Sweet Poison.png';
import FireWineImg from '../../attached_assets/Fire & Wine.jpeg';

// Map album names to their imported images
const albumImages: Record<string, string> = {
  'Lagos to Kano': LagosKano,
  'Eko Island Beats': EkoBeats,
  'Lagos to Tokyo': LagosTokyoImg,
  'Sweet Poison': SweetPoisonImg,
  'Fire & Wine': FireWineImg
};

interface SongRowProps {
  number: string;
  title: string;
  album: string;
}

export default function SongRow({ number, title, album }: SongRowProps) {
  // Get the image for this album or use a fallback
  const albumImage = albumImages[album] || '';

  return (
    <div className="group relative bg-gradient-to-r from-[#023047]/60 to-[#219ebc]/20 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 mb-2">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ffb703] to-[#fb8500] rounded-xl opacity-0 group-hover:opacity-70 blur-md transition-all duration-500"></div>
      <div className="relative flex items-center p-2 sm:p-3 border border-[#219ebc]/10 rounded-xl bg-[#023047]/95 z-10">
        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 mr-2 sm:mr-3">
          <span className="text-base sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffb703] to-[#fb8500]">
            {number}
          </span>
        </div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden shrink-0 mr-3 border border-[#219ebc]/30">
          <img 
            src={albumImage}
            alt={`${album} album cover`}
            className="w-full h-full object-cover aspect-square"
            loading="lazy"
          />
        </div>
        <div className="flex-grow mr-2 sm:mr-4 min-w-0">
          <h4 className="text-white font-medium text-sm sm:text-base truncate">{title}</h4>
          <p className="text-xs sm:text-sm text-[#8ecae6] truncate">{album}</p>
        </div>
        <div className="shrink-0">
          <button className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-[#ffb703] to-[#fb8500] rounded-full text-xs font-bold text-[#023047]">
            Listen
          </button>
        </div>
      </div>
    </div>
  );
}