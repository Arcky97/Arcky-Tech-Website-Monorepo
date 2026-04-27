export function YouTubeEmbed({ videoId, title }: { videoId: string, title: string } ) {
  return (
    <div className="aspect-video my-4">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-xl mx-auto w-full lg:w-[75%] h-[133.5%] lg:h-full"
      />
    </div>
  )
}