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
  isThreads?: boolean;
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
      name: "Threads",
      icon: "", // Using custom SVG icon in the component
      color: "#000000",
      isThreads: true,
      url: `https://www.threads.net/intent/post?text=${encodeURIComponent("Check out Curtis Dove Music - Genre-Spanning Artist with 20,000+ Monthly Listeners\n\n" + (typeof window !== 'undefined' ? window.location.href : ''))}`
    },
    {
      name: "Bluesky",
      icon: "fas fa-cloud",
      color: "#0085ff",
      url: `https://bsky.app/intent/compose?text=${encodeURIComponent("Check out Curtis Dove Music - Genre-Spanning Artist with 20,000+ Monthly Listeners\n\n" + (typeof window !== 'undefined' ? window.location.href : ''))}`
    }
  ];

  // Threads icon SVG
  const ThreadsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.587 1.5 12.186c.48.868.982 1.725 1.574 2.493 1.528 1.997 3.858 3.159 6.54 3.275.206.008.435.016.677.016 1.666 0 3.85-.398 5.723-2.234 1.582-1.551 2.479-3.614 2.665-6.137.104-1.447-.142-2.517-2.608-3.018-1.35-.275-2.383-.847-3.172-1.748-.802-.915-1.225-2.01-1.225-3.233 0-2.406 1.061-4.384 3.069-5.712A9.354 9.354 0 0112.186 0c4.306 0 6.858 2.049 7.896 3.247.86.987 1.419 2.153 1.419 3.251 0 2.005-1.051 3.417-2.467 4.009-.216.092-.435.182-.661.264 1.635.709 2.858 1.885 3.442 3.523.521 1.469.583 3.215.174 5.144-.799 3.791-2.633 6.148-5.703 7.318-1.729.661-3.695.986-5.859.952-2.736-.024-5.047-.681-6.867-1.943-2.162-1.502-3.617-3.577-4.213-5.972-.197-.795-.323-1.625-.375-2.431-.015-.248-.023-.453-.023-.681V12l.036-.44c.052-1.747.248-3.564 1.238-5.313.723-1.287 1.713-2.419 2.949-3.371" />
    </svg>
  );

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
                ) : button.isThreads ? (
                  <span style={{ color: button.color }}><ThreadsIcon /></span>
                ) : button.icon ? (
                  <i className={button.icon} style={{ color: button.color }}></i>
                ) : null}
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
                ) : button.isThreads ? (
                  <span style={{ color: button.color }}><ThreadsIcon /></span>
                ) : button.icon ? (
                  <i className={button.icon} style={{ color: button.color }}></i>
                ) : null}
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