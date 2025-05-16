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
        href="https://www.facebook.com/CurtisDoveMusic" 
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
        href="https://open.spotify.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon"
        aria-label="Spotify"
      >
        <i className="fab fa-spotify"></i>
      </a>
      <a 
        href="https://music.apple.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon"
        aria-label="Apple Music"
      >
        <i className="fab fa-apple"></i>
      </a>
      <a 
        href="https://www.youtube.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon"
        aria-label="YouTube"
      >
        <i className="fab fa-youtube"></i>
      </a>
    </div>
  );
}
