interface LoopingVideoProps extends React.HTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
}

export function LoopingVideo({ src, className = "", ...props}: LoopingVideoProps) {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={className}
      {...props}
    />
  );
}