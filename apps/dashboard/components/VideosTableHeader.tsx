export default function VideosTableHeader () {
  const layout = "text-center font-bold py-2 whitespace-nowrap";
  return (
    <div className="flex mx-4 bg-blue-400/10 overflow-x-auto rounded-t-lg border border-gray-600/75 px-4">
      {["Video", "Views", "Likes", "Comments", "Shares", "Watch Hours"].map((item, index) => (
        <p 
          key={`item-${index}`}
          className={`${layout} ${index === 0 ? "w-[50%]" : "w-[10%]"}`}
        >
          {item}
        </p>
      ))}
    </div>
  )
}