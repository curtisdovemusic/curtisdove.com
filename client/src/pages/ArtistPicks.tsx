import { useState } from 'react';
import { Link } from 'wouter';
import SocialLinks from '../components/SocialLinks';
import ShareButtons from '../components/ShareButtons';

// Color palette
const COLORS = {
  lightBlue: '#8ecae6',
  blue: '#219ebc',
  darkBlue: '#023047',
  yellow: '#ffb703',
  orange: '#fb8500',
};

// Genre sections
const GENRES = [
  { id: 'afrosounds', name: 'Afrosounds', description: 'Vibrant Afrobeats and Afrofusion sounds' },
  { id: 'rock', name: 'Rock', description: 'Powerful rock anthems and alternative tracks' },
  { id: 'pop', name: 'Pop', description: 'Catchy and melodic pop hits' },
  { id: 'hiphop', name: 'Hip-Hop', description: 'Rhythm and flow with hard-hitting beats' },
  { id: 'explicit', name: 'Explicit', description: 'Raw and unfiltered musical expressions' },
];

// Music platforms
const PLATFORMS = [
  { name: 'Spotify', icon: 'fab fa-spotify', url: 'https://open.spotify.com/artist/5ZCP0tbgVY2Lx7JG0grqNR' },
  { name: 'Apple Music', icon: 'fab fa-apple', url: 'https://music.apple.com/us/artist/curtis-dove/1437816775' },
  { name: 'YouTube Music', icon: 'fab fa-youtube', url: 'https://music.youtube.com/channel/UCKUyeJqBx8zvLjcZQyRzZ2w' },
  { name: 'Amazon Music', icon: 'fab fa-amazon', url: 'https://music.amazon.com/artists/B07H5542DY/curtis-dove' },
  { name: 'SoundCloud', icon: 'fab fa-soundcloud', url: 'https://soundcloud.com/curtisdove' },
];

// Song type
interface Song {
  number: string;
  title: string;
  genre: string;
  image: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeMusicUrl?: string;
  amazonMusicUrl?: string;
  soundcloudUrl?: string;
}

export default function ArtistPicks() {
  const [activeGenre, setActiveGenre] = useState<string>('afrosounds');

  // Data for Afrosounds - from Lagos Nights & Island Lights
  const afrosoundsSongs: Song[] = [
    { 
      number: '01', 
      title: 'Lagos Nights & Island Lights',
      genre: 'Afrobeat',
      image: 'https://i.scdn.co/image/ab67616d00001e02dc2326d4cf2a74f904fa25f2',
      spotifyUrl: 'https://open.spotify.com/track/1oQSwvKUjgZXdYVGoxI8GC',
      appleMusicUrl: 'https://music.apple.com/us/album/lagos-nights-island-lights/1649991374?i=1649991375'
    },
    { 
      number: '02', 
      title: 'Island Gal',
      genre: 'Afrobeat',
      image: 'https://i.scdn.co/image/ab67616d00001e02dc2326d4cf2a74f904fa25f2',
      spotifyUrl: 'https://open.spotify.com/track/4Q7jEQO53QMwNsbG3LqAEF'
    },
    { 
      number: '03', 
      title: 'Lagos Inferno',
      genre: 'Afrobeat',
      image: 'https://i.scdn.co/image/ab67616d00001e02dc2326d4cf2a74f904fa25f2',
      spotifyUrl: 'https://open.spotify.com/track/01OFSCvArQLyA9XO0ZDrT4'
    },
    { 
      number: '04', 
      title: 'Sweet Melody',
      genre: 'Afrobeat',
      image: 'https://i.scdn.co/image/ab67616d00001e02dc2326d4cf2a74f904fa25f2',
      spotifyUrl: 'https://open.spotify.com/track/5kcaPD9eXqMOgKdvfT3x6j'
    },
    { 
      number: '05', 
      title: 'Bend Down Low',
      genre: 'Afrobeat',
      image: 'https://i.scdn.co/image/ab67616d00001e02dc2326d4cf2a74f904fa25f2',
      spotifyUrl: 'https://open.spotify.com/track/0j0HkGj0sKR6uyTQWIZKYo'
    },
    { 
      number: '06', 
      title: 'Wait For Me',
      genre: 'Afrobeat',
      image: 'https://i.scdn.co/image/ab67616d00001e02dc2326d4cf2a74f904fa25f2',
      spotifyUrl: 'https://open.spotify.com/track/7qz5l2vZGmFLZTulLgOC6x'
    },
    { 
      number: '07', 
      title: 'Sope',
      genre: 'Afrobeat',
      image: 'https://i.scdn.co/image/ab67616d00001e02dc2326d4cf2a74f904fa25f2',
      spotifyUrl: 'https://open.spotify.com/track/5ckkqPNXHTlKX1hL85VKvj'
    },
    { 
      number: '08', 
      title: 'All On Me',
      genre: 'Afrobeat',
      image: 'https://i.scdn.co/image/ab67616d00001e02dc2326d4cf2a74f904fa25f2',
      spotifyUrl: 'https://open.spotify.com/track/31tODz1a02aCDGQHOjKBaY'
    },
    { 
      number: '09', 
      title: 'Outside (Lagos)',
      genre: 'Afrobeat',
      image: 'https://i.scdn.co/image/ab67616d00001e02dc2326d4cf2a74f904fa25f2',
      spotifyUrl: 'https://open.spotify.com/track/1mRGC9E6FBfJbXBGjkwkww'
    },
    { 
      number: '10', 
      title: 'Fire & Wine',
      genre: 'Afrobeat',
      image: 'https://i.scdn.co/image/ab67616d00001e02dc2326d4cf2a74f904fa25f2',
      spotifyUrl: 'https://open.spotify.com/track/6yCbO1OWL5NM8QvBfxwmLt'
    },
  ];

  // Data for Rock - from The Ashes Trilogy
  const rockSongs: Song[] = [
    { 
      number: '01', 
      title: 'The Ashes (Pt. 1)',
      genre: 'Rock',
      image: 'https://i.scdn.co/image/ab67616d00001e02a1ae78001825a3ed8925a2cc',
      spotifyUrl: 'https://open.spotify.com/track/4qGhGAhBS5yFwDUyzTUrTl'
    },
    { 
      number: '02', 
      title: 'Falling',
      genre: 'Rock',
      image: 'https://i.scdn.co/image/ab67616d00001e02a1ae78001825a3ed8925a2cc',
      spotifyUrl: 'https://open.spotify.com/track/1r1X6jvkX0MLyRcI31vXUJ'
    },
    { 
      number: '03', 
      title: 'The Burning (Pt. 2)',
      genre: 'Rock',
      image: 'https://i.scdn.co/image/ab67616d00001e02a1ae78001825a3ed8925a2cc',
      spotifyUrl: 'https://open.spotify.com/track/03lKLp8kPNbzOPYwOJpdF8'
    },
    { 
      number: '04', 
      title: 'The Phoenix (Pt. 3)',
      genre: 'Rock',
      image: 'https://i.scdn.co/image/ab67616d00001e02a1ae78001825a3ed8925a2cc',
      spotifyUrl: 'https://open.spotify.com/track/67uUbBWOjQyBOIanxkfxHC'
    },
    { 
      number: '05', 
      title: 'Walk Through Fire',
      genre: 'Rock',
      image: 'https://i.scdn.co/image/ab67616d00001e02a1ae78001825a3ed8925a2cc',
      spotifyUrl: 'https://open.spotify.com/track/5YRp77J73FUoMzUVQZEJ1I'
    },
    { 
      number: '06', 
      title: 'Find Yourself',
      genre: 'Rock',
      image: 'https://i.scdn.co/image/ab67616d00001e02a1ae78001825a3ed8925a2cc',
      spotifyUrl: 'https://open.spotify.com/track/1VqYgXPPRPh5Jq4qsShJFv'
    },
    { 
      number: '07', 
      title: 'Resurgence',
      genre: 'Rock',
      image: 'https://i.scdn.co/image/ab67616d00001e02a1ae78001825a3ed8925a2cc',
      spotifyUrl: 'https://open.spotify.com/track/0jfnxA5DJt01S8MIulNrhl'
    },
    { 
      number: '08', 
      title: 'Through The Ashes',
      genre: 'Rock',
      image: 'https://i.scdn.co/image/ab67616d00001e02a1ae78001825a3ed8925a2cc',
      spotifyUrl: 'https://open.spotify.com/track/7rGl4AxpfzY6eGPrqlWqHc'
    },
    { 
      number: '09', 
      title: 'Come Alive',
      genre: 'Rock',
      image: 'https://i.scdn.co/image/ab67616d00001e02a1ae78001825a3ed8925a2cc',
      spotifyUrl: 'https://open.spotify.com/track/6ZsBMWYT3sxOBpjmDCKAQa'
    },
    { 
      number: '10', 
      title: 'Rise (Final Ascension)',
      genre: 'Rock',
      image: 'https://i.scdn.co/image/ab67616d00001e02a1ae78001825a3ed8925a2cc',
      spotifyUrl: 'https://open.spotify.com/track/2bNZUkL4x5m3EPdQQYaBUU'
    },
  ];

  // Data for Pop songs
  const popSongs: Song[] = [
    { 
      number: '01', 
      title: 'One Wish',
      genre: 'Pop',
      image: 'https://i.scdn.co/image/ab67616d00001e021d6def8e11407d4c4c6ef10e',
      spotifyUrl: 'https://open.spotify.com/track/1oQSwvKUjgZXdYVGoxI8GC'
    },
    { 
      number: '02', 
      title: 'Nobody Better',
      genre: 'Pop',
      image: 'https://i.scdn.co/image/ab67616d00001e021d6def8e11407d4c4c6ef10e',
      spotifyUrl: 'https://open.spotify.com/track/4Q7jEQO53QMwNsbG3LqAEF'
    },
    { 
      number: '03', 
      title: 'Love in Letters',
      genre: 'Pop',
      image: 'https://i.scdn.co/image/ab67616d00001e021d6def8e11407d4c4c6ef10e',
      spotifyUrl: 'https://open.spotify.com/track/01OFSCvArQLyA9XO0ZDrT4'
    },
    { 
      number: '04', 
      title: 'The Letter that Started it All',
      genre: 'Pop',
      image: 'https://i.scdn.co/image/ab67616d00001e021d6def8e11407d4c4c6ef10e',
      spotifyUrl: 'https://open.spotify.com/track/5kcaPD9eXqMOgKdvfT3x6j'
    },
    { 
      number: '05', 
      title: 'Find My Way Back to You',
      genre: 'Pop',
      image: 'https://i.scdn.co/image/ab67616d00001e021d6def8e11407d4c4c6ef10e',
      spotifyUrl: 'https://open.spotify.com/track/0j0HkGj0sKR6uyTQWIZKYo'
    },
    { 
      number: '06', 
      title: 'Sweet Poison',
      genre: 'Pop',
      image: 'https://i.scdn.co/image/ab67616d00001e021d6def8e11407d4c4c6ef10e',
      spotifyUrl: 'https://open.spotify.com/track/7qz5l2vZGmFLZTulLgOC6x'
    },
    { 
      number: '07', 
      title: 'O Di m MMa',
      genre: 'Pop',
      image: 'https://i.scdn.co/image/ab67616d00001e021d6def8e11407d4c4c6ef10e',
      spotifyUrl: 'https://open.spotify.com/track/5ckkqPNXHTlKX1hL85VKvj'
    },
    { 
      number: '08', 
      title: 'XOXO',
      genre: 'Pop',
      image: 'https://i.scdn.co/image/ab67616d00001e021d6def8e11407d4c4c6ef10e',
      spotifyUrl: 'https://open.spotify.com/track/31tODz1a02aCDGQHOjKBaY'
    },
    { 
      number: '09', 
      title: 'Still Your Boy',
      genre: 'Pop',
      image: 'https://i.scdn.co/image/ab67616d00001e021d6def8e11407d4c4c6ef10e',
      spotifyUrl: 'https://open.spotify.com/track/1mRGC9E6FBfJbXBGjkwkww'
    },
    { 
      number: '10', 
      title: "I'm Coming Home",
      genre: 'Pop',
      image: 'https://i.scdn.co/image/ab67616d00001e021d6def8e11407d4c4c6ef10e',
      spotifyUrl: 'https://open.spotify.com/track/6yCbO1OWL5NM8QvBfxwmLt'
    },
  ];

  // Data for Hip-Hop Top 3
  const hiphopSongs: Song[] = [
    { 
      number: '01', 
      title: 'Shorty You a Vibe',
      genre: 'Hip-Hop',
      image: 'https://i.scdn.co/image/ab67616d00001e02cb1763a89d4081e5e94c81a4',
      spotifyUrl: 'https://open.spotify.com/track/4qGhGAhBS5yFwDUyzTUrTl'
    },
    { 
      number: '02', 
      title: 'Baller Life',
      genre: 'Hip-Hop',
      image: 'https://i.scdn.co/image/ab67616d00001e02cb1763a89d4081e5e94c81a4',
      spotifyUrl: 'https://open.spotify.com/track/1r1X6jvkX0MLyRcI31vXUJ'
    },
    { 
      number: '03', 
      title: 'Detty December',
      genre: 'Hip-Hop',
      image: 'https://i.scdn.co/image/ab67616d00001e02cb1763a89d4081e5e94c81a4',
      spotifyUrl: 'https://open.spotify.com/track/03lKLp8kPNbzOPYwOJpdF8'
    },
  ];

  // Data for Explicit Top 5
  const explicitSongs: Song[] = [
    { 
      number: '01', 
      title: 'Big Ashawo',
      genre: 'Explicit',
      image: 'https://i.scdn.co/image/ab67616d00001e02a8919f2375d5bb87818add49',
      spotifyUrl: 'https://open.spotify.com/track/4qGhGAhBS5yFwDUyzTUrTl'
    },
    { 
      number: '02', 
      title: 'Another Sad Story',
      genre: 'Explicit',
      image: 'https://i.scdn.co/image/ab67616d00001e02a8919f2375d5bb87818add49',
      spotifyUrl: 'https://open.spotify.com/track/1r1X6jvkX0MLyRcI31vXUJ'
    },
    { 
      number: '03', 
      title: 'King of Hearts',
      genre: 'Explicit',
      image: 'https://i.scdn.co/image/ab67616d00001e02a8919f2375d5bb87818add49',
      spotifyUrl: 'https://open.spotify.com/track/03lKLp8kPNbzOPYwOJpdF8'
    },
    { 
      number: '04', 
      title: 'Sticky',
      genre: 'Explicit',
      image: 'https://i.scdn.co/image/ab67616d00001e02a8919f2375d5bb87818add49',
      spotifyUrl: 'https://open.spotify.com/track/67uUbBWOjQyBOIanxkfxHC'
    },
    { 
      number: '05', 
      title: 'Craving You',
      genre: 'Explicit',
      image: 'https://i.scdn.co/image/ab67616d00001e02a8919f2375d5bb87818add49',
      spotifyUrl: 'https://open.spotify.com/track/5YRp77J73FUoMzUVQZEJ1I'
    },
  ];

  // Get the active songs based on genre selection
  const getActiveSongs = () => {
    switch (activeGenre) {
      case 'afrosounds':
        return afrosoundsSongs;
      case 'rock':
        return rockSongs;
      case 'pop':
        return popSongs;
      case 'hiphop':
        return hiphopSongs;
      case 'explicit':
        return explicitSongs;
      default:
        return afrosoundsSongs;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">ARTIST </span>
              <span className="text-gradient bg-gradient-to-r from-[#ffb703] to-[#fb8500]">PICKS</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Curated collections of Curtis Dove's top tracks across various genres
            </p>
            
            {/* Genre Navigation */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8">
              {GENRES.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setActiveGenre(genre.id)}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                    activeGenre === genre.id
                      ? 'bg-gradient-to-r from-[#ffb703] to-[#fb8500] text-[#023047] shadow-lg'
                      : 'bg-[#023047]/50 text-white/90 hover:bg-[#219ebc]/30'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Songs Grid Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            {GENRES.map((genre) => (
              activeGenre === genre.id && (
                <div key={genre.id}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    <span className="text-white">Top </span>
                    <span className="text-[#ffb703]">{genre.name}</span>
                    <span className="text-white"> Tracks</span>
                  </h2>
                  <p className="text-white/70 text-lg mb-8">{genre.description}</p>
                </div>
              )
            ))}
          </div>
          
          {/* Songs List - Horizontal tiles like the example */}
          <div className="flex flex-col space-y-4">
            {getActiveSongs().map((song, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-r from-[#023047]/80 to-[#219ebc]/40 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-[1.01]"
              >
                {/* Glowing effect - enhanced yellow glow on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ffb703] to-[#fb8500] rounded-xl opacity-0 group-hover:opacity-70 blur-md transition-all duration-500"></div>
                
                <div className="relative flex items-center border border-[#219ebc]/20 rounded-xl bg-[#023047]/95 h-full z-10 p-3 md:p-4">
                  {/* Song number */}
                  <div className="w-16 h-16 flex items-center justify-center shrink-0 mr-4">
                    <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffb703] to-[#fb8500]">
                      {song.number}
                    </span>
                  </div>
                  
                  {/* Song title & genre */}
                  <div className="flex-grow mr-6">
                    <h3 className="text-lg md:text-xl font-semibold text-white">{song.title}</h3>
                    <div className="text-sm text-[#8ecae6] flex items-center">
                      <i className="fas fa-music mr-1 text-xs opacity-70"></i> {song.genre}
                    </div>
                  </div>
                  
                  {/* Listen Now Button */}
                  <div className="relative group/btn shrink-0 mr-2 md:mr-6">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-white via-[#ffb703] to-[#fb8500] rounded-full opacity-75 group-hover/btn:opacity-100 blur-sm transition-all duration-500"></div>
                    <button className="relative px-4 py-2 bg-gradient-to-r from-[#ffb703] to-[#fb8500] rounded-full text-sm font-bold text-[#023047] z-10 whitespace-nowrap">
                      Listen Now
                    </button>
                  </div>
                  
                  {/* Platform Icons */}
                  <div className="flex space-x-2 shrink-0">
                    {PLATFORMS.slice(0, 3).map((platform, i) => (
                      <a 
                        key={i}
                        href={song.spotifyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        title={`Listen on ${platform.name}`}
                      >
                        <i className={`${platform.icon}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Share Section */}
      <section className="py-12 bg-[#023047]/50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Share These Song Selections</h2>
            <p className="text-white/70 mb-8">
              Help others discover Curtis Dove's music by sharing these curated song selections
            </p>
            <ShareButtons />
            <div className="mt-10">
              <SocialLinks size="lg" className="justify-center" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}