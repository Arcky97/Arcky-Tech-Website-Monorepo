import { projects } from "@/config/projects";
import { ColorButton, TextColor } from "ui";

interface Project {
  title: string,
  content: string,
  button: {
    color?: string,
    text?: string,
    href: string
  };
};

export function InfoCards({ title }: { title: string; }) {
  const infoCards = projects as Project[];

  return (
    <section className="w-7/8 lg:w-6/8">
      <h2 className="head2 sticky top-0 w-full bg-gray-900 px-2 pb-2 z-75">{title}</h2>
      <div className="flex flex-wrap justify-center gap-8 p-4">
        {infoCards.map((u, idx) => (
          <div
            key={`project-${idx}`}
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-[47%] xl:w-[31%] 2xl:w-[23%] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50 hover:ring-2 hover:ring-blue-500"
          >
            <h3 className="head3">{u.title}</h3>
            <TextColor color="gray-300">{u.content}</TextColor>
            {u.button && (
              <div className="text-center mt-5">
                <ColorButton color={u.button?.color || "blue-600"} text={u.button?.text || "View Info"} href={u.button.href}/>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}