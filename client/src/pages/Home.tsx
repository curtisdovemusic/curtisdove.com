import { Link } from "wouter";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center mt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/70 to-primary"></div>
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-montserrat mb-4 leading-tight">
          <span className="gradient-text">Curtis Dove</span>
          <span className="block md:inline"> Music</span>
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto text-[hsl(var(--light-text))]">
          Boundary-pushing, genre-blending artist with 15,000+ monthly Spotify listeners
        </p>
        
        <div className="flex justify-center mb-16">
          <iframe 
            src="https://open.spotify.com/embed/playlist/0OMB5854ceBpFP6vtT1uHn?utm_source=generator&theme=0" 
            width="100%" 
            height="352" 
            style={{maxWidth: '600px'}}
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
          </iframe>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <a href="https://open.spotify.com/playlist/0OMB5854ceBpFP6vtT1uHn?si=HcVK-hzNRrmMU_T1kgDoXA" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full bg-accent hover:bg-opacity-80 font-semibold transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
            <i className="fab fa-spotify mr-2"></i> Save to Spotify
          </a>
          <Link href="/music" className="px-8 py-3 rounded-full bg-secondary hover:bg-opacity-80 font-semibold transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center border border-accent/30">
            <i className="fas fa-music mr-2"></i> Browse Music
          </Link>
        </div>
        
        <h3 className="text-2xl font-bold mb-6">Follow Me</h3>
        <SocialLinks size="lg" className="mb-8" />
      </div>
    </section>
  );
}
