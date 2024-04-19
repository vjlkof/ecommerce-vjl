export const metadata = {
  description: "Acerca de la empresa",
  openGraph: {
    type: "website",
  },
};

export default function About() {
  return (
    <div>
      <div className="my-4">
        <div className="mx-4 max-w-2xl sm:mx-auto text-left">
          <h1 className="mb-8 text-5xl font-bold">Nosotros</h1>
          <p className="mx-auto max-w-6xl text-base leading-7 text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            perferendis hic quidem fugiat qui! Corrupti temporibus eum tempora
            voluptatem, recusandae rerum consequatur aliquid in odio facere
            maiores, labore, deleniti provident. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ratione fugiat laudantium consequatur,
            laboriosam eos nesciunt distinctio eligendi tenetur illo sequi
            itaque ullam fuga, voluptatum, suscipit velit necessitatibus vitae
            ut vero!
          </p>
        </div>
      </div>
    </div>
  );
}
