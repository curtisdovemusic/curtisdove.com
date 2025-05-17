import { useEffect, useRef } from "react";

export default function Bio() {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            if (entry.target.classList.contains('animate-ready')) {
              if (entry.target.classList.contains('slide-up')) {
                entry.target.classList.add('animate-slide-up');
              } else if (entry.target.classList.contains('fade-in')) {
                entry.target.classList.add('animate-fade-in');
              } else if (entry.target.classList.contains('slide-in-right')) {
                entry.target.classList.add('animate-slide-in-right');
              } else if (entry.target.classList.contains('slide-in-left')) {
                entry.target.classList.add('animate-slide-in-left');
              }
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe elements
    if (imageRef.current) observer.observe(imageRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    paragraphRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Set up paragraphs with references for animation
  const setParagraphRef = (index: number) => (el: HTMLParagraphElement) => {
    paragraphRefs.current[index] = el;
  };
  
  return (
    <section id="bio" className="py-24 bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary to-transparent opacity-80"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-amber-600/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Artist portrait with advanced gradient effect */}
          <div 
            ref={imageRef} 
            className="md:w-1/2 mb-8 md:mb-0 opacity-0 animate-ready slide-in-left"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent via-[#FFD700] to-[hsl(var(--purple))] opacity-70 blur-md rounded-xl transition-all duration-700 group-hover:opacity-90 group-hover:blur-lg"></div>
              <div className="relative overflow-hidden rounded-xl">
                <div className="animated-gradient-border rounded-xl">
                  <div className="image-hover-zoom">
                    <img 
                      src="https://pixabay.com/get/gc16c79ed96f50a1173d6135a6653b32b99e235dac46e1755b6c4afb1e6ff0afaa13e5dc884b3bbba059f892acb11124c52512014140eca5b88f02b2704fc81f4_1280.jpg" 
                      alt="Curtis Dove portrait" 
                      className="relative w-full h-auto rounded-xl shadow-2xl object-cover" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Music labels/badges */}
              <div className="absolute -bottom-4 -right-4 bg-secondary/90 backdrop-blur-sm py-2 px-4 rounded-full text-sm font-medium shadow-lg border border-accent/30 animate-float">
                <span className="gradient-text">20,000+ Monthly Listeners</span>
              </div>
              
              <div className="absolute -top-4 -left-4 bg-secondary/90 backdrop-blur-sm py-2 px-4 rounded-full text-sm font-medium shadow-lg border border-accent/30" style={{animationDelay: '1.5s'}}>
                <span className="gradient-text">Genre-Blending Artist</span>
              </div>
            </div>
          </div>
          
          <div 
            ref={contentRef}
            className="md:w-1/2 opacity-0 animate-ready slide-in-right"
          >
            <div className="mb-6">
              <h2 
                ref={titleRef}
                className="text-3xl md:text-4xl font-bold font-montserrat mb-3">
                About <span className="gradient-text">Curtis Dove</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#FFA500] to-[#FFD700] rounded"></div>
            </div>
            
            <div className="space-y-6">
              <p 
                ref={setParagraphRef(0)}
                className="text-[hsl(var(--light-text))] leading-relaxed opacity-0 animate-ready fade-in"
                style={{animationDelay: '0.3s'}}
              >
                Curtis Dove is a boundary-pushing, genre-blending artist with 20,000+ monthly Spotify listeners and counting. He fuses the vibrant pulse of Afrobeat, the groove of Afro-fusion, the rhythm of Afropop, and the soul of R&B, with the edgy textures of Pop, Alternative Rock, Dance, Darkwave, and Club music.
              </p>
              
              <p 
                ref={setParagraphRef(1)}
                className="text-[hsl(var(--light-text))] leading-relaxed opacity-0 animate-ready fade-in"
                style={{animationDelay: '0.5s'}}
              >
                Bringing global influences to his music, Curtis creates sonic experiences that transcend geographical and cultural boundaries. His music tells stories of life, love, identity, and the human experience through captivating melodies and meaningful lyrics.
              </p>
              
              <p 
                ref={setParagraphRef(2)}
                className="text-[hsl(var(--light-text))] leading-relaxed opacity-0 animate-ready fade-in"
                style={{animationDelay: '0.7s'}}
              >
                With each release, Curtis continues to innovate and expand his artistic vision, creating a distinct sound that is both contemporary and timeless, familiar yet fresh, and always authentically his own.
              </p>
            </div>
            
            {/* Music genres pills */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-3 opacity-0 animate-ready fade-in" style={{animationDelay: '0.9s'}}>Musical Influences</h3>
              <div className="flex flex-wrap gap-2 opacity-0 animate-ready fade-in" style={{animationDelay: '1s'}}>
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Afrobeat</span>
                <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm">Afro-fusion</span>
                <span className="px-3 py-1 bg-amber-600/10 text-amber-600 rounded-full text-sm">Afropop</span>
                <span className="px-3 py-1 bg-[hsl(var(--purple))]/10 text-[hsl(var(--purple))] rounded-full text-sm">R&B</span>
                <span className="px-3 py-1 bg-[hsl(var(--cyan))]/10 text-[hsl(var(--cyan))] rounded-full text-sm">Pop</span>
                <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm">Alternative Rock</span>
                <span className="px-3 py-1 bg-amber-600/10 text-amber-600 rounded-full text-sm">Dance</span>
                <span className="px-3 py-1 bg-[hsl(var(--purple))]/10 text-[hsl(var(--purple))] rounded-full text-sm">Darkwave</span>
                <span className="px-3 py-1 bg-[hsl(var(--cyan))]/10 text-[hsl(var(--cyan))] rounded-full text-sm">Club</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
