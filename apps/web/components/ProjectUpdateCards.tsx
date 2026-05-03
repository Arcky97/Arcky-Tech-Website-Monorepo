import { getProjectUpdateData } from "@/lib/getProjectUpdateData";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function ProjectUpdateCards() {
  const updates = await getProjectUpdateData();
  const mdxComponents = useMDXComponents({});

  return (
    <section className="w-7/8 lg:w-6/8">
      <h2 className="head2 sticky top-0 w-full bg-gray-900 px-2 pb-2 z-75">Recent Project Updates</h2>
      <div className="flex flex-wrap justify-center gap-8 p-4">
        {updates.map((data, index) => (
          <div
            key={`project-${index}`}
            className="w-full md:w-[45%] 2xl:w-[31%] bg-gray-800 p-4 rounded-lg shadow"
          >
            <h3 className="text-2xl font-semibold">{data.title}</h3>
            <p className="text-md text-gray-400 italic pt-2">
              {data.date} • {data.project}
            </p>
            <div className="prose prose-invert px-4">
              <MDXRemote source={data.excerpt} components={mdxComponents} />
            </div>
            <a href={data.slug} className="inline-block mt-1 text-blue-500 hover:font-bold">Read more</a>
          </div>
        ))}
      </div>
      <br/>
      <hr className="horRule"/>
    </section>
  )
}