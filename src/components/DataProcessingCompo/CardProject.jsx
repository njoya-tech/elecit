import React from "react";
import { HERO, ICONS, IMAGES } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors.js";
import CTAButton from "../CTA/CTAButton.jsx";

const CardProject = () => {
  // Static posts data (you can replace with your actual data)
  const visiblePosts = [
    {
      id: 1,
      title: " Logiciel de Content Management System (CMS)",
      excerpt:
        "Nous avons conçu et développé un système de gestion de contenu (CMS) sur mesure…",
    },
    {
      id: 2,
      title: "Logiciel de gestion de la relation client(CRM)",
      excerpt:
        "Développement d'un logiciel CRM entièrement adapté aux besoins de l’entreprise...",
    },
    {
      id: 3,
      title: "Logiciel de gestion de la relation client  (CRM)",
      excerpt:
        "Développement d'un logiciel CRM entièrement adapté aux besoins de l’entreprise...",
    },
  ];

  return (
    <>
      <section className="relative w-full lg:mb-30 lg:mt-10 overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <img
          src={HERO.dataProcessing}
          alt="Data processing background"
          className="w-full h-[75vh] md:h-[85vh] object-cover"
        />

        {/* DARK GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* ANGLED BLACK PNG MASK */}
        <img
          src={ICONS.formeSombre}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full max-h-[420px] object-cover pointer-events-none"
          style={{ objectFit: "cover" }}
        />

        {/* CENTERED TEXT CONTENT */}
        <div
          className="absolute inset-0 flex flex-col items-center
       justify-center px-6 md:px-12 text-center top-[-15px]"
        >
          {/* MAIN TITLE */}
          <h3
            style={{
              fontSize: "2.5em",
              color: MY_COLORS.secondaryGreen,
            }}
            className="text-white font-extrabold text-4xl md:text-5xl 
          lg:text-6xl leading-tight mb-10"
          >
            <span>Nos projects IT</span>
            <br />
            <span>innovation, performance et impact</span>
          </h3>

          {/* SUBTITLE */}
          <p className="text-white text-sm md:text-base lg:text-lg tracking-wide font-semibold mb-2">
            Chaque projet présenté reflète notre engagement envers l'innovation,
            la <br />
            rigueur et la satisfaction client.
          </p>

          {/* Cards grid */}
          <div className="relative mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {visiblePosts.map((post) => (
                <article
                  key={post.id}
                  className="relative bg-white/40 border border-transparent 
                rounded-md shadow-sm flex flex-col min-h-[350px] "
                >
                  {/* Number badge */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div
                      className="h-12 w-12 rounded-full bg-[#00729B]
                   text-white flex items-center justify-center text-lg font-bold"
                    >
                      {post.id}
                    </div>
                  </div>

                  {/* Image */}

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <h3
                      style={{
                        fontSize: "26px",
                      }}
                      className="font-bold text-base md:text-lg mb-10 text-center"
                    >
                      {post.title}
                    </h3>

                    <p className="text-sm text-black-600 mb-4 flex-1 text-center">
                      {post.excerpt}
                    </p>

                    <button
                      className="mt-auto inline-flex items-center 
                  justify-center px-6 py-2 rounded-full bg-[#000000]
                   text-white text-sm font-semibold hover:bg-[#f7f7f7] shadow-md hover:text-green-700"
                    >
                      Voir plus
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative mx-auto w-[90%] lg:w-6/6 max-w-6xl -mt-15 p-0">
        {/* BLACK BLOCK PNG - Background layer */}
        <div
          className="w-full overflow-hidden"
          style={{
            height: "440px",
          }}
        >
          <img
            src={ICONS.formePlan}
            className="w-full object-cover block"
            alt=""
          />
        </div>

        {/* CONTENT OVERLAY - Positioned absolutely on top of PNG */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16">
          {/* TECH PATTERN - Behind text */}
          <img
            style={{
              top: "12em",
              width: "85%",
            }}
            src={ICONS.formTech}
            alt=""
            aria-hidden="true"
            className="absolute z-0 pointer-events-none opacity-30 
             top-1/2 left-1/2 -translate-x-1/2 -translate-y-[12em]  // Use Tailwind transform
             w-[150%] md:w-full lg:w-[180%] h-auto"
          />

          {/* TEXT */}
          <h3
            className="relative z-20 text-center text-2xl 
            md:text-4xl lg:text-2xl xl:text-4xl font-bold leading-tight mb-8 md:mb-12"
            style={{ color: MY_COLORS.white, top: "10%" }}
          >
            Un projet <span style={{ color: MY_COLORS.green }}>data</span> ou{" "}
            <span style={{ color: MY_COLORS.green }}>IT</span>{" "}
            en tête ?
          </h3>

          {/* Subtitle/Description */}
      <p className="text-center md:text-lg lg:text-xl text-white/90 
      max-w-2xl mx-auto mt-15">
        Optimisez votre transformation digitale avec des solutions
        intelligentes et performantes !
      </p>

          {/* BUTTON */}
          <CTAButton
            className=" absolute top-10 "
            onClick={() => alert("Video clicked!")}
          >
            Contactez Nous
          </CTAButton>
        </div>

        {/* ROTATING GEAR - Top priority overlay */}
        <div
          className="absolute w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 z-40"
          style={{
            animation: "rotateClockwise 8s linear infinite",
            top: "65%",
            right: "1%",
          }}
          aria-hidden="true"
        >
          <img
            src={ICONS.Engrenage_plan}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div
          className="absolute w-24 h-24 md:w-16 md:h-16 lg:w-16 lg:h-16 z-40"
          style={{
            animation: "rotateClockwise 20s linear infinite",
            top: "23%",
            left: "10%",
          }}
          aria-hidden="true"
        >
          <img
            src={ICONS.Engrenage_plan}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default CardProject;
