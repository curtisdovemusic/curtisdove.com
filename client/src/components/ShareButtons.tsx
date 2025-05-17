import { useState } from 'react';

interface ShareButtonsProps {
  className?: string;
}

// Define the share button type
type ShareButton = {
  name: string;
  icon?: string;
  color: string;
  isX?: boolean;
  url?: string;
  action?: () => void;
};

export default function ShareButtons({ 
  className = "" 
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const copyLink = () => {
    if (typeof navigator !== 'undefined') {
      const link = window.location.href;
      navigator.clipboard.writeText(link)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  const shareButtons: ShareButton[] = [
    {
      name: "Copy Link",
      icon: "fas fa-link",
      color: "#FFC107",
      action: copyLink
    },
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      color: "#1877f2",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`
    },
    {
      name: "X",
      icon: "", // We'll use a custom X symbol
      color: "#000000",
      isX: true,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent("Curtis Dove Music - Genre-Spanning Artist with 20,000+ Monthly Listeners")}`
    },
    {
      name: "Bluesky",
      icon: "fas fa-cloud",
      color: "#0085ff",
      url: `https://bsky.app/intent/compose?text=${encodeURIComponent("Check out Curtis Dove Music - Genre-Spanning Artist with 20,000+ Monthly Listeners\n\n" + (typeof window !== 'undefined' ? window.location.href : ''))}`
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
                aria-label={button.name}
              >
                {button.isX ? (
                  <span className="font-bold text-base" style={{ color: button.color }}>𝕏</span>
                ) : (
                  <i className={button.icon} style={{ color: button.color }}></i>
                )}
              </button>
            ) : (
              <a
                href={button.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                aria-label={`Share on ${button.name}`}
              >
                {button.isX ? (
                  <span className="font-bold text-base" style={{ color: button.color }}>𝕏</span>
                ) : (
                  <i className={button.icon} style={{ color: button.color }}></i>
                )}
              </a>
            )}
            {button.name === "Copy Link" && copied && (
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