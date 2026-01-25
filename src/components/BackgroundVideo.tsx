interface BackgroundVideoProps {
  src: string;
  media?: string;
  className?: string;
}

export function BackgroundVideo({
  src,
  media,
  className = '',
}: BackgroundVideoProps) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className={`absolute inset-0 w-full h-full object-cover -z-10 ${className}`}
    >
      <source media={media} src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
