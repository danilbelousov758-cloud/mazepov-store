"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";

export default function SupportPage() {


const [user,setUser] = useState<any>(null);



const tickets = [
{
id:1,
title:"Проблема с аккаунтом",
status:"Открыто",
date:"10.08.2026"
},
{
id:2,
title:"Ошибка загрузки",
status:"Закрыто",
date:"08.08.2026"
}
];



useEffect(()=>{

const data = localStorage.getItem("user");

if(data){
setUser(JSON.parse(data));
}

},[]);



return (

<main
className="
relative
h-screen
overflow-hidden
text-white
"
>


{/* BACKGROUND */}

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



{/* DARK */}

<div
className="
fixed
inset-0
bg-black/70
z-10
"
/>




<div
className="
relative
z-50
"
>

<Header />

</div>





<div
className="
relative
z-20
pt-28
w-[85%]
max-w-7xl
mx-auto
grid
grid-cols-[300px_1fr]
gap-6
h-[calc(100vh-120px)]
"
>



{/* LEFT */}

<aside
className="
rounded-2xl
border
border-white/10
bg-black/60
backdrop-blur-xl
p-5
overflow-hidden
"
>


<h2
className="
text-lg
font-semibold
tracking-wide
"
>

Мои обращения

</h2>



<p
className="
text-xs
text-gray-400
mt-1
"
>

История запросов

</p>



<div
className="
mt-5
space-y-3
"
>


{
tickets.map(ticket=>(


<div
key={ticket.id}

className="
rounded-xl
border
border-white/10
bg-white/5
p-4
hover:bg-white/10
transition
cursor-pointer
"

>


<div
className="
flex
justify-between
"
>


<span
className="
text-sm
font-medium
"
>

{ticket.title}

</span>


<span
className="
text-[11px]
text-gray-400
"
>

{ticket.status}

</span>


</div>



<p
className="
text-xs
text-gray-500
mt-2
"
>

{ticket.date}

</p>


</div>


))

}


</div>


</aside>






{/* CENTER */}


<section
className="
space-y-5
"
>



{/* ACCOUNT */}

<div
className="
rounded-2xl
border
border-white/10
bg-black/60
backdrop-blur-xl
p-6
flex
justify-between
"
>


<div>


<h1
className="
text-2xl
font-semibold
"
>

Центр поддержки

</h1>


<p
className="
mt-2
text-gray-400
text-sm
max-w-xl
"
>

Получайте помощь по вопросам аккаунта,
игры и технических проблем.
Создайте обращение и дождитесь ответа администрации.

</p>


</div>




<div
className="
rounded-xl
border
border-white/10
bg-white/5
px-5
py-4
min-w-[220px]
"
>


<p
className="
text-xs
text-gray-400
"
>

Аккаунт

</p>


<p
className="
mt-2
font-semibold
"
>

{user?.nickname || "Пользователь"}

</p>



<p
className="
text-xs
text-gray-500
mt-1
"
>

{user?.email || "Email не указан"}

</p>


</div>


</div>







{/* CREATE */}

<div
className="
rounded-2xl
border
border-white/10
bg-black/60
backdrop-blur-xl
p-6
"
>


<h2
className="
text-lg
font-semibold
"
>

Новая проблема?

</h2>



<p
className="
text-sm
text-gray-400
mt-2
"
>

Опишите проблему подробно.
Администрация рассмотрит ваше обращение.

</p>



<button

className="
mt-5
px-6
py-3
rounded-xl
bg-white
text-black
font-medium
hover:scale-105
transition
"

>

Создать обращение

</button>



</div>








{/* BOTTOM */}

<div
className="
grid
grid-cols-2
gap-5
"
>



<div
className="
rounded-2xl
border
border-white/10
bg-black/60
backdrop-blur-xl
p-5
"
>


<h3
className="
font-semibold
"
>

🕒 Время ответа

</h3>


<p
className="
mt-3
text-sm
text-gray-300
"
>

Поддержка работает ежедневно.

</p>



<div
className="
mt-4
rounded-xl
bg-white/5
border
border-white/10
p-3
"
>

12:00 — 00:00

</div>



</div>






<div
className="
rounded-2xl
border
border-white/10
bg-black/60
backdrop-blur-xl
p-5
"
>


<h3
className="
font-semibold
"
>

💬 Ответы поддержки

</h3>



<div
className="
mt-3
space-y-2
text-sm
text-gray-300
"
>


<p>
✓ Ответ приходит в чат обращения
</p>


<p>
✓ Можно отслеживать статус заявки
</p>


<p>
✓ История сохраняется
</p>



</div>



</div>



</div>





</section>




</div>



</main>

);


}