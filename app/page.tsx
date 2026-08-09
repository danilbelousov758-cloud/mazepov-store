import Header from "@/components/Header";

export default function Home() {

  const images = [
    "/images/mod1.png",
    "/images/mod2.png",
    "/images/mod3.png",
    "/images/mod4.png",
  ];

  return (

    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        text-white
      "
    >

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="
          fixed
          inset-0
          w-full
          h-full
          object-cover
          z-0
          pointer-events-none
        "
      >

        <source
          src="/videos/background.mp4"
          type="video/mp4"
        />

      </video>


      {/* DARK OVERLAY */}
      <div
        className="
          fixed
          inset-0
          bg-black/60
          z-10
          pointer-events-none
        "
      />


      {/* HEADER */}
      <div
        className="
          relative
          z-50
        "
      >
        <Header />
      </div>



      {/* CONTENT */}
      <section
        className="
          relative
          z-20
          pt-36
          w-[82%]
          max-w-6xl
          mx-auto
        "
      >


        {/* IMAGES BLOCK */}
        <div
          className="
            grid
            grid-cols-[0.75fr_1.25fr]
            gap-5
          "
        >


          {/* MAIN IMAGE */}
          <div
            className="
              rounded-2xl
              border
              border-zinc-700/50
              overflow-hidden
              bg-black
              shadow-xl
              h-[385px]
            "
          >

            <img
              src="/images/main.png"
              alt="Main"
              className="
                w-full
                h-full
                object-cover
              "
            />

          </div>




          {/* SMALL IMAGES */}
          <div
            className="
              grid
              grid-cols-2
              gap-4
            "
          >

            {
              images.map((image,index)=>(

                <div
                  key={index}
                  className="
                    rounded-xl
                    border
                    border-zinc-700/50
                    overflow-hidden
                    bg-black
                    shadow-lg
                    h-[185px]
                  "
                >

                  <img
                    src={image}
                    alt={`Mod ${index + 1}`}
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                </div>

              ))
            }

          </div>


        </div>





        {/* TEXT BLOCK */}
        <div
          className="
            mt-5
            rounded-2xl
            border
            border-zinc-700/50
            bg-black/60
            shadow-xl
            px-6
            py-4
          "
        >

          <h1
            className="
              text-xl
              font-semibold
              tracking-widest
            "
          >

            STORE — MODS

          </h1>



          <p
            className="
              mt-3
              text-gray-300
              leading-relaxed
              text-sm
              md:text-base
            "
          >

            Официальная площадка модификаций и игровых решений.

            <br />

            Здесь вы найдёте качественные моды, готовые сборки
            и эксклюзивные разработки для вашего проекта.
            STORE поможет быстро подобрать необходимые материалы,
            расширить возможности игры и сделать ваш игровой опыт
            ещё лучше.

          </p>


        </div>


      </section>


    </main>

  );

}