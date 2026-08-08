"use client";

import { ReactNode } from "react";


interface Props {

  title: string;

  children: ReactNode;

}



export default function AuthBox({
  title,
  children
}: Props) {


return (

<main

className="
h-screen
overflow-hidden
bg-black
text-white
flex
items-center
justify-center
p-4
"

>


<div

className="
w-[450px]
max-h-[90vh]
bg-[#111]
border
border-zinc-800
rounded-2xl
p-6
shadow-2xl
"

>


<a

href="/"

className="
text-sm
text-zinc-400
hover:text-white
transition
mb-4
inline-block
"

>

← Вернуться на главную

</a>





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

{title}

</p>





{children}



</div>


</main>

);


}