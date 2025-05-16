export default function Bio() {
  return (
    <section id="bio" className="py-20 bg-secondary">
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
              Curtis Dove is a boundary-pushing, genre-blending artist with 20,000+ monthly Spotify listeners and counting. He fuses the vibrant pulse of Afrobeat, the groove of Afro-fusion, the rhythm of Afropop, and the soul of R&B, with the edgy textures of Pop, Alternative Rock, Dance, Darkwave, and Club music.
            </p>
            
            <p className="text-[hsl(var(--light-text))] mb-6 leading-relaxed">
              Bringing global influences to his music, Curtis creates sonic experiences that transcend geographical and cultural boundaries. His music tells stories of life, love, identity, and the human experience through captivating melodies and meaningful lyrics.
            </p>
            
            <p className="text-[hsl(var(--light-text))] mb-8 leading-relaxed">
              With each release, Curtis continues to innovate and expand his artistic vision, creating a distinct sound that is both contemporary and timeless, familiar yet fresh, and always authentically his own.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
