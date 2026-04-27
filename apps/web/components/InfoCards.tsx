import { getHomeInfoCards } from "@/lib/getInfoCards";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";


export function InfoCards({ title, page }: { title: string; page: string }) {
  const infoCards = getHomeInfoCards(page);
  const mdxComponents = useMDXComponents({});

  return (
    <section className="w-7/8 lg:w-6/8">
      <h2 className="head2 sticky top-0 w-full bg-gray-900 px-2 pb-2 z-50">{title}</h2>
      <div className="flex flex-wrap justify-center gap-8 p-4">
        {infoCards.map((u, idx) => (
          <div
            key={`project-${idx}`}
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-[47%] xl:w-[31%] 2xl:w-[23%] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50 hover:ring-2 hover:ring-blue-500"
          >
            <MDXRemote source={u.content} components={mdxComponents}/>
          </div>
        ))}
      </div>
    </section>
  )
}