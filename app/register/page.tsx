"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterPage() {


  const router = useRouter();


  const [nickname, setNickname] = useState("");

  const [password, setPassword] = useState("");

  const [repeatPassword, setRepeatPassword] = useState("");

  const [server, setServer] = useState("RED");

  const [error, setError] = useState("");





  const servers = [

    {name:"RED", color:"#ef4444"},
    {name:"YELLOW", color:"#facc15"},
    {name:"GREEN", color:"#22c55e"},
    {name:"AZURE", color:"#075985"},
    {name:"SILVER", color:"#9ca3af"},
    {name:"ROSE", color:"#fb7185"},
    {name:"BLACK", color:"#000000"},
    {name:"SKY", color:"#0ea5e9"},
    {name:"TITAN", color:"#8b5cf6"},
    {name:"X", color:"#800020"},
    {name:"FIRE", color:"#f97316"},
    {name:"LIME", color:"#84cc16"}

  ];







  async function register(){


    setError("");



    if(!nickname || !password || !repeatPassword){

      setError("Заполните все поля");

      return;

    }





    if(password !== repeatPassword){

      setError("Пароли не совпадают");

      return;

    }






    const response = await fetch(

      "/api/auth/register",

      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          nickname,
          password,
          server

        })

      }

    );






    const data = await response.json();





    if(!response.ok){

      setError(data.error);

      return;

    }






    router.push("/login");


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





{/* VIDEO BACKGROUND */}

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








{/* DARK OVERLAY */}

<div

className="
fixed
inset-0
bg-black/60
z-10
"

/>









{/* REGISTER BOX */}

<div

className="

auth-scroll

relative

z-20


w-[450px]


max-h-[92vh]


overflow-y-auto



bg-black/70


backdrop-blur-md



border

border-white/20



rounded-2xl



p-6



shadow-2xl

"

>







<button

onClick={()=>router.push("/")}

className="
text-sm
text-zinc-400
hover:text-white
transition
mb-4
"

>

← Вернуться на главную

</button>









<h1

className="
text-3xl
font-bold
text-center
mb-5
"

>

STORE — MODS

</h1>









<p

className="
text-center
text-zinc-400
mb-5
"

>

Регистрация

</p>









<input

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

placeholder="Никнейм"

value={nickname}

onChange={(e)=>setNickname(e.target.value)}

 />









<input

type="password"

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

placeholder="Пароль"

value={password}

onChange={(e)=>setPassword(e.target.value)}

 />









<input

type="password"

className="
w-full
bg-black/60
border
border-white/20
rounded-xl
p-3
mb-4
outline-none
"

placeholder="Повторите пароль"

value={repeatPassword}

onChange={(e)=>setRepeatPassword(e.target.value)}

 />









<p

className="
text-sm
text-zinc-400
mb-2
"

>

Выберите сервер

</p>









<div

className="
grid
grid-cols-2
gap-2
mb-4
"

>

{

servers.map((item)=>(


<button

key={item.name}

type="button"

onClick={()=>setServer(item.name)}

className={`

flex
items-center
gap-3

py-1.5
px-2


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

backgroundColor:item.color

}}

/>







<span

className="
text-sm
font-semibold
"

>

{item.name}

</span>






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
mb-3
"

>

{error}

</p>

}









<button

onClick={register}

className="
w-full
bg-white
text-black
font-bold
py-3
rounded-xl
hover:bg-zinc-200
transition
"

>

Создать аккаунт

</button>









<p

className="
text-center
text-zinc-500
mt-4
text-sm
"

>

Уже есть аккаунт?


<a

href="/login"

className="
text-white
ml-2
hover:underline
"

>

Войти

</a>

</p>







</div>








</main>

);


}