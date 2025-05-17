import { useState } from "react";
import { Link } from "wouter";

// Define the playlist type
type Playlist = {
  id: string;
  title: string;
  description: string;
  category: string;
  embedUrl: string;
  image?: string;
};

// Playlists data
const PLAYLISTS: Playlist[] = [
  {
    id: "lagos-nights",
    title: "Lagos Nights & Island Lights",
    description: "Explore the vibrant sounds of Afrobeats with this collection of upbeat and soulful tracks.",
    category: "afrobeats",
    embedUrl: "https://open.spotify.com/embed/playlist/0OMB5854ceBpFP6vtT1uHn?utm_source=generator"
  },
  {
    id: "after-dark-lagos",
    title: "After Dark in Lagos: The Explicit Side",
    description: "The unfiltered, explicit side of Afrobeats - for mature audiences only.",
    category: "afrobeats",
    embedUrl: "https://open.spotify.com/embed/playlist/0OMB5854ceBpFP6vtT1uHn?utm_source=generator"
  },
  {
    id: "love-songs",
    title: "Curtis Dove - My Love Songs",
    description: "A collection of heartfelt love songs across different genres and styles.",
    category: "mixed",
    embedUrl: "https://open.spotify.com/embed/playlist/0OMB5854ceBpFP6vtT1uHn?utm_source=generator"
  },
  {
    id: "ashes-trilogy",
    title: "The Ashes Trilogy: A Journey of Renewal",
    description: "Experience the three-part rock journey through darkness into light.",
    category: "rock",
    embedUrl: "https://open.spotify.com/embed/playlist/0OMB5854ceBpFP6vtT1uHn?utm_source=generator"
  },
  {
    id: "ashes-anthems",
    title: "Ashes & Anthems: 90s Rock & Metal to Now",
    description: "A collection of rock and metal tracks inspired by the classics and modern anthems.",
    category: "rock",
    embedUrl: "https://open.spotify.com/embed/playlist/0OMB5854ceBpFP6vtT1uHn?utm_source=generator"
  }
];

// Category definitions with colors
const CATEGORIES = [
  { id: "all", label: "All Playlists", color: "amber" },
  { id: "afrobeats", label: "Afrobeats", color: "yellow" },
  { id: "mixed", label: "Mixed Genres", color: "purple" },
  { id: "rock", label: "Rock & Metal", color: "red" }
];

export default function Playlists() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Filter playlists based on selected category
  const filteredPlaylists = selectedCategory === "all" 
    ? PLAYLISTS 
    : PLAYLISTS.filter(playlist => playlist.category === selectedCategory);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900/80 to-black">
      <div className="pt-32 pb-16 container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-white">CURTIS DOVE </span>
          <span className="text-amber-500">PLAYLISTS</span>
        </h1>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? category.color === 'yellow' || category.color === 'amber' 
                    ? `bg-${category.color}-500 text-black` 
                    : `bg-${category.color}-500 text-white`
                  : `bg-white/10 text-white hover:bg-${category.color}-500/80`
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {filteredPlaylists.map(playlist => {
            const categoryObj = CATEGORIES.find(cat => cat.id === playlist.category) || CATEGORIES[0];
            return (
              <div 
                key={playlist.id}
                className={`rounded-xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border ${
                  playlist.category === 'afrobeats' ? 'border-yellow-500/20 hover:border-yellow-500/50' : 
                  playlist.category === 'rock' ? 'border-red-500/20 hover:border-red-500/50' : 
                  playlist.category === 'mixed' ? 'border-purple-500/20 hover:border-purple-500/50' : 
                  'border-amber-500/20 hover:border-amber-500/50'
                } transition-all`}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className={`w-2 h-8 ${
                      playlist.category === 'afrobeats' ? 'bg-yellow-500' : 
                      playlist.category === 'rock' ? 'bg-red-500' : 
                      playlist.category === 'mixed' ? 'bg-purple-500' : 
                      'bg-amber-500'
                    } rounded-full mr-3`}></span>
                    <h3 className="text-2xl font-bold">{playlist.title}</h3>
                  </div>
                  
                  <p className="text-white/70 mb-6">{playlist.description}</p>
                  
                  <div className="aspect-video mb-4">
                    <iframe 
                      style={{ borderRadius: '12px' }} 
                      src={playlist.embedUrl}
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy">
                    </iframe>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-white/60 text-sm">
                      {categoryObj.label}
                    </span>
                    
                    <div className="flex gap-2">
                      <a 
                        href={`https://open.spotify.com/playlist/0OMB5854ceBpFP6vtT1uHn`}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className={`w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all`}
                      >
                        <i className="fab fa-spotify"></i>
                      </a>
                      <a 
                        href={`https://audiomack.com/curtisdove`}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className={`w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all`}
                      >
                        <i className="fas fa-music"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Back to Home */}
        <div className="text-center">
          <Link href="/">
            <a className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold transition-all transform hover:scale-105">
              <i className="fas fa-home mr-2"></i>
              BACK TO HOME
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
