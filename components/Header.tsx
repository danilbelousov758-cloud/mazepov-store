import Image from "next/image";

export default function Header() {

  return (

    <header

      className="
        w-[82%]
        max-w-5xl
        mx-auto
        mt-6
        rounded-2xl
        bg-black/90
        border
        border-white/20
        px-7
        py-4
        flex
        items-center
        justify-between
        text-white
        shadow-xl
        backdrop-blur-md
      "

    >


      {/* LOGO */}

      <a

        href="/"

        className="
          flex
          items-center
          gap-3
        "

      >

        <span

          className="
            text-xl
            font-bold
            tracking-widest
          "

        >

          STORE

        </span>


      </a>






      {/* MENU */}

      <nav

        className="
          flex
          items-center
          gap-6
          text-sm
        "

      >


        <a

          href="/"

          className="
            hover:text-gray-400
            transition
          "

        >

          Главная

        </a>





        <a

          href="/mods"

          className="
            hover:text-gray-400
            transition
          "

        >

          Моды

        </a>





        <a

          href="/news"

          className="
            hover:text-gray-400
            transition
          "

        >

          Новости

        </a>





        <a

          href="/support"

          className="
            hover:text-gray-400
            transition
          "

        >

          Поддержка

        </a>





        <a

          href="/login"

          className="
            ml-2
            px-5
            py-2
            rounded-xl
            border
            border-white/20
            bg-white/10
            font-semibold
            hover:bg-white
            hover:text-black
            transition
          "

        >

          Войти

        </a>



      </nav>



    </header>

  );

}