export default function About() {
  return (
    <article className="flex flex-col items-center h-full text-white">
       <h1 className="head1">About Me</h1>
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <p className="text-lg text-gray-300 mb-4">
          Hello! My name is Arcky. I&#39;m 28 years old and I live in Belgium.
          I currently work full-time at a factory that specializes in developing
          and building public transport buses, primarily for the European market,
          with Belgium, France, the Netherlands, and Germany as key customers.
        </p>

        <p className="text-lg text-gray-300 mb-4">
          In my free time, I work on various personal projects. These include my
          own Discord bot called <strong>Doggo Bot</strong>, this website, several
          plugins for the Essentials project, and more recently, a PBS editor
          built specifically for Essentials.
        </p>

        <p className="text-lg text-gray-300">
          Outside of development, I enjoy staying active through fitness, gaming,
          and building LEGO sets. I&#39;m also a fan of anime and have started learning
          Japanese out of curiosity and appreciation for the culture. Most of my
          hobbies revolve around building, learning, or improving — whether
          that&#39;s through code, fitness, or studying a new language.
        </p>
      </section>
    </article>
  );
}
