"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("RED");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const servers = [
    { name:"RED", color:"#ef4444" },
    { name:"YELLOW", color:"#facc15" },
    { name:"GREEN", color:"#22c55e" },
    { name:"AZURE", color:"#075985" },
    { name:"SILVER", color:"#9ca3af" },
    { name:"ROSE", color:"#fb7185" },
    { name:"BLACK", color:"#000000" },
    { name:"SKY", color:"#0ea5e9" },
    { name:"TITAN", color:"#8b5cf6" },
    { name:"X", color:"#800020" },
    { name:"FIRE", color:"#f97316" },
    { name:"LIME", color:"#84cc16" }
  ];



  async function login(){

    setError("");

    if(!nickname || !password){

      setError("Введите никнейм и пароль");
      return;

    }


    try {

      setLoading(true);


      const response = await fetch("/api/auth/login",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          nickname,
          password,
          server

        })

      });



      const data = await response.json();



      if(!response.ok){

        setError(
          data.error || "Ошибка авторизации"
        );

        return;

      }



      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      router.push("/");


    } 
    
    catch(error){

      console.log(error);

      setError(
        "Сервер авторизации недоступен"
      );

    }

    finally{

      setLoading(false);

    }

  }



  return (

    <main

      className="
        relative
        h-screen
        overflow-hidden
        text-white
        flex
        items-center
        justify-center
        p-4
      "

    >



      <video

        autoPlay
        loop
        muted
        playsInline

        className="
          fixed
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



      <div

        className="
          fixed
          inset-0
          bg-black/60
          z-10
        "

      />





      <div

        className="
          relative
          z-20

          w-[450px]

          bg-black/80

          border
          border-white/20

          rounded-2xl

          p-7

          shadow-2xl

          backdrop-blur
        "

      >



        <button

          onClick={()=>router.push("/")}

          className="
            text-sm
            text-zinc-400
            hover:text-white
            mb-5
          "

        >

          ← Вернуться

        </button>





        <h1

          className="
            text-3xl
            text-center
            font-bold
            mb-2
          "

        >

          STORE — MODS

        </h1>




        <p

          className="
            text-center
            text-zinc-400
            mb-6
          "

        >

          Авторизация

        </p>





        <input

          value={nickname}

          onChange={
            e=>setNickname(e.target.value)
          }

          placeholder="Никнейм"

          className="
            w-full
            bg-black/60
            border
            border-white/20
            rounded-xl
            p-3
            mb-3
            outline-none
          "

        />





        <input

          type="password"

          value={password}

          onChange={
            e=>setPassword(e.target.value)
          }

          placeholder="Пароль"

          className="
            w-full
            bg-black/60
            border
            border-white/20
            rounded-xl
            p-3
            mb-5
            outline-none
          "

        />





        <p className="text-sm text-zinc-400 mb-3">

          Выберите сервер

        </p>




        <div

          className="
            grid
            grid-cols-2
            gap-2
            mb-5
          "

        >

          {

            servers.map(item=>(

              <button

                key={item.name}

                type="button"

                onClick={()=>setServer(item.name)}

                className={`
                  
                  flex
                  items-center
                  gap-3

                  px-3
                  py-2

                  rounded-xl

                  border

                  transition

                  ${
                    server===item.name

                    ?

                    "border-white bg-white/10"

                    :

                    "border-white/10 hover:bg-white/10"

                  }

                `}

              >

                <span

                  className="
                    w-3
                    h-3
                    rounded-full
                  "

                  style={{
                    background:item.color
                  }}

                />


                {item.name}


              </button>

            ))

          }


        </div>




        {
          error &&

          <p

            className="
              text-red-500
              text-sm
              mb-4
            "

          >

            {error}

          </p>

        }




        <button

          onClick={login}

          disabled={loading}

          className="
            w-full
            bg-white
            text-black
            font-bold
            py-3
            rounded-xl
            hover:bg-zinc-200
            transition
            disabled:opacity-50
          "

        >

          {
            loading
            ?
            "Вход..."
            :
            "Войти"
          }


        </button>




        <p

          className="
            text-center
            text-zinc-500
            mt-5
            text-sm
          "

        >

          Нет аккаунта?

          <a

            href="/register"

            className="
              text-white
              ml-2
              hover:underline
            "

          >

            Регистрация

          </a>


        </p>




      </div>



    </main>

  );

}