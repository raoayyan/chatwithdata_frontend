import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/about-image-2.svg"
                alt="chat with data UI"
                fill
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl">
                  Natural Language Interface
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg">
                  Ask complex questions like Show me the top 5 products sold
                  last month and get accurate results instantly—no SQL knowledge
                  needed.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl">
                  Intelligent Agents with LangChain
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg">
                  Our agents leverage LLMs and LangChain to handle context,
                  refine queries, and provide smart, dynamic answers.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl">
                  Developer Friendly
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg">
                  Built with Next.js, Tailwind CSS, Python, and Django for a
                  clean and scalable architecture. Fast, modern, and easy to
                  extend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
