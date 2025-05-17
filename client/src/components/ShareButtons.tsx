import { useState } from 'react';

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export default function ShareButtons({ 
  url = typeof window !== 'undefined' ? window.location.href : '', 
  title = "Curtis Dove Music - Genre-Spanning Artist", 
  description = "Discover Curtis Dove's vibrant musical journey spanning Afrobeats, Pop, Rock, Hip-Hop and R&B.",
  className = "" 
}: ShareButtonsProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const shareButtons = [
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      color: "#1877f2",
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      color: "#1da1f2",
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: "WhatsApp",
      icon: "fab fa-whatsapp",
      color: "#25d366",
      shareUrl: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`
    },
    {
      name: "Copy Link",
      icon: "fas fa-link",
      color: "#FFC107",
      action: () => {
        navigator.clipboard.writeText(url);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
      }
    }
  ];

  return (
    <div className={`${className}`}>
      <h3 className="text-white/80 text-sm mb-3 text-center">SHARE THIS PAGE</h3>
      <div className="flex justify-center gap-3">
        {shareButtons.map((button, index) => (
          <div key={index} className="relative">
            {button.action ? (
              <button
                onClick={button.action}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                aria-label={`Share on ${button.name}`}
              >
                <i className={`${button.icon}`} style={{ color: button.color }}></i>
              </button>
            ) : (
              <a
                href={button.shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                aria-label={`Share on ${button.name}`}
              >
                <i className={`${button.icon}`} style={{ color: button.color }}></i>
              </a>
            )}
            {button.name === "Copy Link" && showTooltip && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Link copied!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}