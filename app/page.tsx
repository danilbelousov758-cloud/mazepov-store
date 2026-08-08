import Image from "next/image";
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
        h-screen
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

        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          z-0
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
          absolute
          inset-0
          bg-black/60
          z-10
        "
      />



      {/* HEADER */}
      <Header />





      {/* CONTENT */}
      <section
        className="
          relative
          z-20

          pt-28

          w-[82%]
          max-w-6xl

          mx-auto
        "
      >




        {/* PHOTOS */}
        <div
          className="
            grid

            grid-cols-[0.65fr_1.35fr]

            gap-5
          "
        >




          {/* LEFT IMAGE */}
          <div
            className="
              rounded-2xl

              border
              border-zinc-700/50

              overflow-hidden

              bg-black

              shadow-xl

              h-[420px]

              flex
              items-center
              justify-center
            "
          >

            <Image
              src="/images/main.png"

              alt="Main"

              width={1200}
              height={1200}

              className="
                w-full
                h-full
                object-cover
              "
            />

          </div>








          {/* RIGHT IMAGES */}
          <div
            className="
              grid

              grid-cols-2

              gap-4
            "
          >

            {images.map((image,index)=>(


              <div
                key={index}

                className="
                  rounded-xl

                  border
                  border-zinc-700/50

                  overflow-hidden

                  bg-black

                  shadow-lg

                  h-[200px]

                  flex
                  items-center
                  justify-center
                "
              >


                <Image
                  src={image}

                  alt={`Mod ${index + 1}`}

                  width={1200}
                  height={700}

                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />


              </div>


            ))}


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

            text-left
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