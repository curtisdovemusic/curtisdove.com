interface SocialLinksProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function SocialLinks({ size = 'md', className = '' }: SocialLinksProps) {
  const sizeClasses = {
    sm: 'text-lg space-x-4',
    md: 'text-2xl space-x-6',
    lg: 'text-3xl space-x-8',
  };

  return (
    <div className={`flex justify-center ${sizeClasses[size]} ${className}`}>
      <a 
        href="https://www.facebook.com/curtisdovemusic" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon"
        aria-label="Facebook"
      >
        <i className="fab fa-facebook"></i>
      </a>
      <a 
        href="https://www.instagram.com/curtisdovemusic" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon"
        aria-label="Instagram"
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a 
        href="https://open.spotify.com/artist/5ZCP0tbgVY2Lx7JG0grqNR?si=S2VQDr7fSJu2NNjjjAuFxg" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon"
        aria-label="Spotify"
      >
        <i className="fab fa-spotify"></i>
      </a>
      <a 
        href="https://www.amazon.com/music/player/artists/B0DD4HQ6D3/curtis-dove" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon"
        aria-label="Amazon Music"
      >
        <i className="fab fa-amazon"></i>
      </a>
      <a 
        href="https://www.youtube.com/@curtisdovemusic" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon"
        aria-label="YouTube"
      >
        <i className="fab fa-youtube"></i>
      </a>
      <a 
        href="https://www.tiktok.com/@curtisdovemusic" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon"
        aria-label="TikTok"
      >
        <i className="fab fa-tiktok"></i>
      </a>
    </div>
  );
}
