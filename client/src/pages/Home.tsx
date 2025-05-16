import { Link } from "wouter";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <section id="home" className="relative min-h-screen bg-cover bg-center flex items-center justify-center mt-16" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`, backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/70 to-primary"></div>
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-montserrat mb-4 leading-tight">
          <span className="gradient-text">Curtis Dove</span>
          <span className="block md:inline"> Music</span>
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto text-[hsl(var(--light-text))]">
          Vibes from Lagos to Tokyo
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <Link href="/music" className="px-8 py-3 rounded-full bg-accent hover:bg-opacity-80 font-semibold transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
            <i className="fas fa-play mr-2"></i> Listen Now
          </Link>
          <Link href="/shows" className="px-8 py-3 rounded-full bg-secondary hover:bg-opacity-80 font-semibold transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center border border-accent/30">
            <i className="fas fa-ticket-alt mr-2"></i> Upcoming Shows
          </Link>
        </div>
        
        <SocialLinks size="md" />
      </div>
    </section>
  );
}
