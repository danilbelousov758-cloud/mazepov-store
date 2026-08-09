"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Header() {


  const [user, setUser] = useState<any>(null);



  const servers:any = {

    RED:"#ef4444",
    YELLOW:"#facc15",
    GREEN:"#22c55e",
    AZURE:"#075985",
    SILVER:"#9ca3af",
    ROSE:"#fb7185",
    BLACK:"#000000",
    SKY:"#0ea5e9",
    TITAN:"#8b5cf6",
    X:"#800020",
    FIRE:"#f97316",
    LIME:"#84cc16",

  };




  useEffect(()=>{


    const savedUser = localStorage.getItem("user");


    if(savedUser){

      setUser(
        JSON.parse(savedUser)
      );

    }


  },[]);





return (

<header
className="
fixed
top-6
left-1/2
-translate-x-1/2

z-[999]

w-[82%]
max-w-5xl

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

backdrop-blur
"
>


{/* LOGO */}

<Link
href="/"
className="
flex
items-center
gap-3
text-xl
font-bold
tracking-widest
"
>


<Image
src="/images/logo.png"
alt="Logo"
width={40}
height={40}
className="rounded-lg"
/>


MAZEPOV


</Link>





{/* MENU */}

<nav
className="
flex
items-center
gap-8
text-base
"
>


<Link
href="/"
className="
hover:text-gray-400
transition
"
>
Главная
</Link>



<Link
href="/mods"
className="
hover:text-gray-400
transition
"
>
Моды
</Link>



<Link
href="/support"
className="
hover:text-gray-400
transition
"
>
Поддержка
</Link>





{

user ? (


<Link
href="/profile"

className="
flex
items-center
gap-2
bg-white
text-black
px-4
py-2
rounded-xl
font-semibold
hover:bg-zinc-200
transition
"

>


<span
className="
w-3
h-3
rounded-full
"
style={{
backgroundColor:
servers[user.server] || "white"
}}
/>



{user.nickname}



</Link>


) : (


<Link
href="/login"

className="
bg-white
text-black
px-4
py-2
rounded-xl
font-semibold
hover:bg-zinc-200
transition
"
>

Войти

</Link>


)



}


</nav>


</header>

);

}