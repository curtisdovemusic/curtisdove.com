import { Link } from "wouter";

export default function Bio() {
  return (
    <section id="bio" className="py-20 bg-secondary mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Artist portrait with gradient effect */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent to-[hsl(var(--purple))] opacity-70 blur-md rounded-xl"></div>
              <img 
                src="https://pixabay.com/get/gc16c79ed96f50a1173d6135a6653b32b99e235dac46e1755b6c4afb1e6ff0afaa13e5dc884b3bbba059f892acb11124c52512014140eca5b88f02b2704fc81f4_1280.jpg" 
                alt="Curtis Dove portrait" 
                className="relative w-full h-auto rounded-xl shadow-2xl object-cover" 
              />
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-3">About <span className="gradient-text">Curtis Dove</span></h2>
              <div className="h-1 w-20 bg-accent rounded"></div>
            </div>
            
            <p className="text-[hsl(var(--light-text))] mb-6 leading-relaxed">
              Curtis Dove is an innovative artist blending Afrobeat, Soul, and electronic elements into a vibrant sonic experience. With roots spanning multiple continents, his music creates a bridge between traditional African rhythms and modern production techniques.
            </p>
            
            <p className="text-[hsl(var(--light-text))] mb-6 leading-relaxed">
              Having performed in venues across Nigeria, Japan, and the United States, Curtis brings a global perspective to his craft. His lyrics explore themes of cultural identity, personal growth, and the universal language of rhythm.
            </p>
            
            <p className="text-[hsl(var(--light-text))] mb-8 leading-relaxed">
              Influenced by pioneers like Fela Kuti, Sade, and contemporary artists like Burna Boy, Curtis continues to push boundaries with each release while staying true to his authentic voice.
            </p>
            
            <Link href="/contact" className="inline-block px-6 py-3 bg-secondary border border-accent/50 rounded-full hover:bg-accent/10 transition duration-300 font-medium">
              Get in Touch <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
