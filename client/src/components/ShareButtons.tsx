import { useState } from 'react';

interface ShareButtonsProps {
  className?: string;
}

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

  const shareButtons = [
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
      name: "Twitter",
      icon: "fab fa-twitter",
      color: "#1da1f2",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent("Curtis Dove Music - Genre-Spanning Artist with 20,000+ Monthly Listeners")}`
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
                <i className={button.icon} style={{ color: button.color }}></i>
              </button>
            ) : (
              <a
                href={button.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                aria-label={`Share on ${button.name}`}
              >
                <i className={button.icon} style={{ color: button.color }}></i>
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