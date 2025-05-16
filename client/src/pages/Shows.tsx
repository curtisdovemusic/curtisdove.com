import { Link } from "wouter";
import ShowCard from "@/components/ShowCard";
import { shows } from "@/lib/data";

export default function Shows() {
  return (
    <section id="shows" className="py-20 bg-primary relative overflow-hidden mt-16">
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')` }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-montserrat mb-3">Upcoming <span className="gradient-text">Shows</span></h2>
          <p className="text-[hsl(var(--light-text))] max-w-2xl mx-auto">Come experience the music live</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {shows.length > 0 ? (
            shows.map((show, index) => (
              <ShowCard
                key={index}
                day={show.day}
                month={show.month}
                year={show.year}
                time={show.time}
                venue={show.venue}
                location={show.location}
                tag={show.tag}
                tagColor={show.tagColor}
                ticketLink={show.ticketLink}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-secondary/50 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">No Shows Scheduled</h3>
              <p className="text-[hsl(var(--light-text))]">Check back soon for upcoming performances!</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/contact" className="inline-block px-8 py-3 bg-secondary hover:bg-secondary/80 rounded-full transition duration-300 font-medium border border-accent/30">
              Book For Private Events <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
