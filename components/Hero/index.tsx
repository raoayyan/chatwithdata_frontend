import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-4xl md:leading-tight">
                  Chat with Data - Natural Language Interaction with SQL and
                  NoSQL Databases
                </h1>
                <p className="mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-lg">
                  "Chat with Data" allows users to interact seamlessly with
                  multiple types of databases, including SQL and NoSQL, using
                  simple natural language. Perfect for users who want powerful
                  database queries without complex coding, our platform makes
                  data accessible like never before.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="#get-started"
                    className="py- rounded-md border-2 border-transparent bg-green px-8 text-base font-semibold text-white duration-300 ease-in-out hover:border-2 hover:border-green hover:bg-white hover:text-black"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 z-[-1] opacity-40 lg:opacity-100">
          {/* New Green Gradient Background with Updated SVG Design */}
          <svg
            width="500"
            height="600"
            viewBox="0 0 500 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="350" cy="100" r="200" fill="url(#greenGradient)" />
            <circle cx="50" cy="300" r="25" fill="url(#greenRadial1)" />
            <circle cx="100" cy="400" r="50" fill="url(#greenRadial2)" />
            <path
              d="M0 500 C100 400, 300 400, 500 500"
              stroke="url(#greenPath)"
              strokeWidth="4"
              fill="none"
            />
            <defs>
              <linearGradient
                id="greenGradient"
                x1="0"
                y1="0"
                x2="400"
                y2="400"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#38b26b" />
                <stop offset="1" stopColor="#38b26b" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="greenRadial1"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(50 300) rotate(90) scale(25)"
              >
                <stop offset="0.1" stopColor="#38b26b" stopOpacity="0" />
                <stop offset="1" stopColor="#38b26b" stopOpacity="0.1" />
              </radialGradient>
              <radialGradient
                id="greenRadial2"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(100 400) rotate(90) scale(50)"
              >
                <stop offset="0.1" stopColor="#38b26b" stopOpacity="0" />
                <stop offset="1" stopColor="#38b26b" stopOpacity="0.1" />
              </radialGradient>
              <linearGradient
                id="greenPath"
                x1="0"
                y1="500"
                x2="500"
                y2="500"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#38b26b" />
                <stop offset="1" stopColor="#38b26b" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;
