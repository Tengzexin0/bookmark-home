import { useEffect, useRef, type VideoHTMLAttributes } from 'react';
interface BackgroundVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  media?: string;
  className?: string;
}

export function BackgroundVideo({
  src,
  media,
  className = '',
  ...props
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playVideo = async () => {
        try {
          await video.play();
        } catch (err) {
          console.error('视频自动播放失败，可能是由于浏览器限制:', err);
        }
      };
      playVideo();
    }
  }, []);
  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={`fixed inset-0 w-full h-[calc(100dvh+60px)] object-cover -z-10 ${className}`}
      {...props}
    >
      <source media={media} src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
