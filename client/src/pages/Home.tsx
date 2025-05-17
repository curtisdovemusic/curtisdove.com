import { useState } from "react";
import { Link } from "wouter";
import { albums } from "@/lib/data";

// Define sections/pages for the site
const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "bio", label: "Bio" },
  { id: "music", label: "Music" },
  { id: "videos", label: "Videos" },
  { id: "lyrics", label: "Lyrics" },
  { id: "contact", label: "Contact" }
];

// Music platforms information
const MUSIC_PLATFORMS = [
  {
    name: "Spotify",
    icon: "fab fa-spotify",
    color: "#1DB954",
    url: "#spotify-link"
  },
  {
    name: "Apple Music",
    icon: "fab fa-apple",
    color: "#fc3c44",
    url: "#apple-music-link"
  },
  {
    name: "Amazon Music",
    icon: "fab fa-amazon",
    color: "#232F3E",
    url: "#amazon-music-link"
  },
  {
    name: "YouTube Music",
    icon: "fab fa-youtube",
    color: "#FF0000",
    url: "#youtube-music-link"
  },
  {
    name: "SoundCloud",
    icon: "fab fa-soundcloud",
    color: "#FF7700",
    url: "#soundcloud-link"
  }
];

// Social media platforms
const SOCIAL_MEDIA = [
  { name: "Instagram", icon: "fab fa-instagram", url: "#instagram-link" },
  { name: "Twitter", icon: "fab fa-twitter", url: "#twitter-link" },
  { name: "Facebook", icon: "fab fa-facebook-f", url: "#facebook-link" },
  { name: "TikTok", icon: "fab fa-tiktok", url: "#tiktok-link" },
  { name: "YouTube", icon: "fab fa-youtube", url: "#youtube-link" }
];

// Sample albums
const ALBUMS = [
  {
    title: "Sunset Dreams",
    type: "Album",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop",
    spotifyUrl: "#album1-link"
  },
  {
    title: "Midnight Waves",
    type: "EP",
    year: "2022",
    cover: "https://images.unsplash.com/photo-1504782388400-07afbcebe30e?q=80&w=500&auto=format&fit=crop",
    spotifyUrl: "#album2-link"
  },
  {
    title: "Urban Soul",
    type: "Single",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=500&auto=format&fit=crop",
    spotifyUrl: "#album3-link"
  }
];

// Sample videos
const VIDEOS = [
  {
    title: "Music Video - Sunset Dreams",
    thumbnail: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=80&w=500&auto=format&fit=crop",
    url: "#video1-link"
  },
  {
    title: "Live Performance - Urban Soul",
    thumbnail: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=500&auto=format&fit=crop",
    url: "#video2-link"
  },
  {
    title: "Behind the Scenes - Studio Session",
    thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500&auto=format&fit=crop",
    url: "#video3-link"
  }
];

// Sample lyrics
const LYRICS = [
  {
    song: "Sunset Dreams",
    album: "Sunset Dreams",
    year: "2023",
    content: `Verse 1:
City lights fade in the distance
As the sun sets on another day
Memories flash through my mind
Wonder if you feel the same way

Chorus:
Under sunset dreams
Colors fill the sky
Under sunset dreams
Where our hearts collide`
  },
  {
    song: "Midnight Waves",
    album: "Midnight Waves EP",
    year: "2022",
    content: `Verse 1:
Ocean deep, stars align
Midnight waves crash in my mind
Thinking of what could have been
If only we had more time

Chorus:
Midnight waves, pull me under
Midnight waves, feel the thunder
Crashing down, washing away
Everything that keeps me under`
  }
];

export default function Home() {
  const [currentSection, setCurrentSection] = useState("home");
  
  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="bg-zinc-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-4 px-6">
            <div className="text-2xl font-bold text-white">CURTIS DOVE</div>
            
            <div className="hidden md:flex items-center space-x-8">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                    currentSection === section.id ? 'text-amber-500' : 'text-white hover:text-amber-500'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
            
            <div className="md:hidden">
              <button className="text-white focus:outline-none">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="relative w-full h-screen">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-zinc-900 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1520483601560-389dff434fdf?q=80&w=1000&auto=format&fit=crop" 
              alt="Artist performing on stage" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Hero content */}
          <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              CURTIS DOVE
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-xl mb-10">
              Boundary-pushing artist blending genres with a unique sound
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {MUSIC_PLATFORMS.map((platform, index) => (
                <a 
                  key={index}
                  href={platform.url} 
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                >
                  <i className={`${platform.icon}`} style={{color: platform.color}}></i>
                  <span className="text-sm font-medium">{platform.name}</span>
                </a>
              ))}
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => scrollToSection('music')}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-full transition-all"
              >
                MUSIC
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 bg-transparent border border-white hover:border-amber-500 hover:text-amber-500 font-bold rounded-full transition-all"
              >
                CONTACT
              </button>
            </div>
          </div>
          
          {/* Scroll down indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white">
            <button 
              onClick={() => scrollToSection('bio')}
              className="text-2xl focus:outline-none"
            >
              <i className="fas fa-chevron-down"></i>
            </button>
          </div>
        </div>
      </section>
      
      {/* Bio Section */}
      <section id="bio" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-white">ABOUT </span>
            <span className="text-amber-500">CURTIS</span>
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-amber-600 opacity-20 blur-xl rounded-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1615247644823-a5f0d3b5f795?q=80&w=1000&auto=format&fit=crop" 
                  alt="Curtis Dove portrait" 
                  className="relative rounded-2xl w-full h-auto shadow-2xl object-cover"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="space-y-6 text-white/80">
                <p className="text-lg leading-relaxed">
                  Curtis Dove is a boundary-pushing artist known for blending genres and creating a sound uniquely his own. With a passion for music that began at a young age, Curtis has developed a style that fuses elements from across the musical spectrum.
                </p>
                
                <p className="text-lg leading-relaxed">
                  His music draws inspiration from a diverse range of influences, creating sonic experiences that resonate with listeners across the globe. Curtis has built a dedicated following with his authentic approach to songwriting and performance.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Having performed at venues around the country, Curtis continues to push creative boundaries with each new release, crafting songs that tell stories while keeping the audience moving.
                </p>
                
                <div className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Musical Influences</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">R&B</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Soul</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Pop</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Electronic</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Hip Hop</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Alternative</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Music Section */}
      <section id="music" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-white">LATEST </span>
            <span className="text-amber-500">MUSIC</span>
          </h2>
          
          <div className="mb-16">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center text-white">FEATURED RELEASE</h3>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <iframe 
                  src="https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT?utm_source=generator" 
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy">
                </iframe>
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-8 text-center text-white">DISCOGRAPHY</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALBUMS.map((album, index) => (
              <div key={index} className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all group">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={album.cover} 
                    alt={album.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h4 className="text-xl font-bold text-white">{album.title}</h4>
                    <p className="text-white/70">
                      {album.type} • {album.year}
                    </p>
                  </div>
                  
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={album.spotifyUrl} 
                      className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full shadow-lg hover:scale-110 transition-all"
                    >
                      <i className="fab fa-spotify text-white"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold mb-8 text-center text-white">STREAMING PLATFORMS</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {MUSIC_PLATFORMS.map((platform, index) => (
                <a 
                  key={index}
                  href={platform.url} 
                  className="flex flex-col items-center gap-3 group" 
                >
                  <div 
                    className="w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110" 
                    style={{backgroundColor: `${platform.color}30`}}
                  >
                    <i className={`${platform.icon} text-2xl`} style={{color: platform.color}}></i>
                  </div>
                  <span className="text-white/80 group-hover:text-white transition-colors">{platform.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Videos Section */}
      <section id="videos" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-white">MUSIC </span>
            <span className="text-amber-500">VIDEOS</span>
          </h2>
          
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">FEATURED VIDEO</h3>
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Featured Music Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-8 text-center text-white">MORE VIDEOS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VIDEOS.map((video, index) => (
              <div key={index} className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all group">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-play text-black text-xl"></i>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-medium text-white">{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Lyrics Section */}
      <section id="lyrics" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-white">SONG </span>
            <span className="text-amber-500">LYRICS</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {LYRICS.map((lyric, index) => (
                  <div key={index} className="bg-zinc-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold mb-2 text-white">{lyric.song}</h3>
                    <p className="text-amber-500 mb-4">{lyric.album} ({lyric.year})</p>
                    <div className="text-white/80 whitespace-pre-line font-light">
                      {lyric.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-white">GET IN </span>
            <span className="text-amber-500">TOUCH</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">CONTACT INFO</h3>
                <div className="space-y-4 text-white/80">
                  <div className="flex items-start gap-4">
                    <div className="text-amber-500 mt-1">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Email</h4>
                      <p>contact@curtisdove.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="text-amber-500 mt-1">
                      <i className="fas fa-briefcase"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Management</h4>
                      <p>manager@curtisdove.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="text-amber-500 mt-1">
                      <i className="fas fa-music"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Booking</h4>
                      <p>booking@curtisdove.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-6 text-white">FOLLOW ME</h3>
                  <div className="flex gap-4">
                    {SOCIAL_MEDIA.map((social, index) => (
                      <a 
                        key={index}
                        href={social.url}
                        className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-amber-500 hover:text-black transition-all"
                      >
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">MESSAGE ME</h3>
                <form className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full px-4 py-3 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full px-4 py-3 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <textarea 
                      rows={5}
                      placeholder="Your Message" 
                      className="w-full px-4 py-3 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    ></textarea>
                  </div>
                  <div>
                    <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-all">
                      SEND MESSAGE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-black border-t border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6">CURTIS DOVE</h3>
            <div className="flex justify-center gap-6 mb-8">
              {SOCIAL_MEDIA.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  className="w-10 h-10 flex items-center justify-center bg-zinc-800 rounded-full hover:bg-amber-500 hover:text-black transition-all"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
            
            <div className="flex justify-center mb-8">
              <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-sm text-white/70 hover:text-amber-500 transition-colors"
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Curtis Dove Music. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
