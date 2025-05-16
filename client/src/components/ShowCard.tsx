interface ShowCardProps {
  day: string;
  month: string;
  year: string;
  time: string;
  venue: string;
  location: string;
  tag?: string;
  tagColor?: string;
  ticketLink?: string;
}

export default function ShowCard({
  day,
  month,
  year,
  time,
  venue,
  location,
  tag = '',
  tagColor = 'text-accent bg-accent/10',
  ticketLink = '#'
}: ShowCardProps) {
  return (
    <div className="show-card bg-secondary mb-6 rounded-xl overflow-hidden shadow-xl transition-all duration-300">
      <div className="p-6 flex flex-col md:flex-row md:items-center">
        <div className="md:w-1/4 mb-4 md:mb-0 md:border-r md:border-accent/20 md:pr-6">
          <div className="text-center md:text-left">
            <span className="text-3xl font-bold text-accent">{day}</span>
            <div className="text-[hsl(var(--light-text))]">{month} {year}</div>
            <div className="text-sm mt-1">{time}</div>
          </div>
        </div>
        
        <div className="md:w-2/4 mb-4 md:mb-0 md:px-6">
          <h3 className="text-xl font-bold mb-1">{venue}</h3>
          <p className="text-[hsl(var(--light-text))] mb-2">{location}</p>
          {tag && (
            <div className={`inline-block px-3 py-1 ${tagColor} rounded-full text-xs font-medium`}>
              {tag}
            </div>
          )}
        </div>
        
        <div className="md:w-1/4 flex justify-center md:justify-end items-center">
          <a 
            href={ticketLink} 
            className="px-5 py-2 rounded-full border border-accent hover:bg-accent hover:text-white transition duration-300 font-medium text-sm inline-block"
          >
            Get Tickets
          </a>
        </div>
      </div>
    </div>
  );
}
