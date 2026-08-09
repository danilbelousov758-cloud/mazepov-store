"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function ProfilePage(){

const router = useRouter();

const [user,setUser] = useState<any>(null);

const [active,setActive] = useState("profile");


const [oldPassword,setOldPassword] = useState("");
const [newPassword,setNewPassword] = useState("");
const [repeatPassword,setRepeatPassword] = useState("");

const [message,setMessage] = useState("");



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

const data = localStorage.getItem("user");


if(!data){

router.push("/login");

return;

}


setUser(JSON.parse(data));


},[]);






function logout(){

localStorage.removeItem("user");

router.push("/");

window.location.reload();

}







async function changePassword(){

setMessage("");



if(!oldPassword || !newPassword || !repeatPassword){

setMessage("Заполните все поля");

return;

}





if(newPassword !== repeatPassword){

setMessage("Новые пароли не совпадают");

return;

}






const response = await fetch(

"/api/auth/change-password",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id:user.id,

oldPassword,

newPassword

})

}

);





const data = await response.json();





if(!response.ok){

setMessage(data.error);

return;

}





setMessage("Пароль успешно изменён");


setOldPassword("");

setNewPassword("");

setRepeatPassword("");

}







if(!user){

return null;

}



return (

<main

className="
relative
min-h-screen
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





<div

className="
fixed
inset-0
bg-black/60
z-10
"

/>







<div className="relative z-[999]">

<Header />

</div>









<section

className="
relative
z-20

pt-32
pb-10

w-[82%]

max-w-5xl

mx-auto

flex

gap-6

items-start

"

>







{/* LEFT MENU */}



<aside

className="
w-64

min-h-[520px]

rounded-2xl

bg-black/70

border

border-zinc-800

p-5

"

>


<h2

className="
text-xl
font-bold
mb-5
"

>

Настройки

</h2>






<button

onClick={()=>setActive("profile")}

className="
block
w-full
text-left
py-3
text-gray-300
hover:text-white
transition
"

>

👤 Мой профиль

</button>







<button

onClick={()=>setActive("security")}

className="
block
w-full
text-left
py-3
text-gray-300
hover:text-white
transition
"

>

🔒 Безопасность

</button>







<button

onClick={logout}

className="
mt-10

block

w-full

text-left

py-3

text-red-400

hover:text-red-300

transition
"

>

🚪 Выйти

</button>





</aside>









{/* RIGHT BLOCK */}



<div

className="
flex-1

min-h-[520px]

rounded-2xl

bg-black/70

border

border-zinc-800

p-6

"

>








{
active==="profile" && (

<>


<h1

className="
text-2xl
font-bold
mb-6
"

>

Мой профиль

</h1>









<div

className="
flex

items-center

gap-5

"

>





<div

className="
w-24

h-24

rounded-full

flex

items-center

justify-center

text-3xl

font-bold

border

border-white/20

shadow-lg

"

style={{

backgroundColor:
servers[user.server]

}}

>


{user.nickname[0].toUpperCase()}


</div>









<div>


<h2

className="
text-xl
font-bold
"

>

{user.nickname}

</h2>





<p

className="
text-green-400
text-sm
mt-1
"

>

● Пользователь активен

</p>





</div>






</div>








<div

className="
grid

grid-cols-2

gap-4

mt-6

"

>







<div

className="
rounded-xl

bg-white/5

border

border-white/10

p-4

"

>

<p

className="
text-xs
text-gray-500
"

>

ID аккаунта

</p>


<p className="
font-bold
mt-1
">

#{user.id}

</p>


</div>








<div

className="
rounded-xl

bg-white/5

border

border-white/10

p-4

"

>

<p

className="
text-xs
text-gray-500
"

>

Игровой сервер

</p>


<p className="
font-bold
mt-1
">

{user.server}

</p>


</div>








<div

className="
rounded-xl

bg-white/5

border

border-white/10

p-4

"

>

<p

className="
text-xs
text-gray-500
"

>

Роль

</p>


<p className="
font-bold
mt-1
">

{user.role}

</p>


</div>








<div

className="
rounded-xl

bg-white/5

border

border-white/10

p-4

"

>

<p

className="
text-xs
text-gray-500
"

>

Статус

</p>


<p className="
font-bold
text-green-400
mt-1
">

Онлайн

</p>


</div>






</div>






<div

className="
mt-5

rounded-xl

bg-white/5

border

border-white/10

p-5

"

>


<h3

className="
text-lg
font-bold
"

>

MAZEPOV STORE

</h3>



<p

className="
text-gray-400

text-sm

mt-2

leading-relaxed

"

>

Добро пожаловать в личный кабинет.
Здесь находятся настройки вашего профиля,
управление аккаунтом и безопасность.

</p>


</div>





</>

)

}

{
active==="security" && (

<>


<h1

className="
text-2xl

font-bold

mb-6

"

>

Безопасность

</h1>







<div

className="
rounded-xl

bg-white/5

border

border-white/10

p-5

mb-5

"

>


<p

className="
text-xs

text-gray-500

"

>

Текущий аккаунт

</p>


<h2

className="
text-xl

font-bold

mt-1

"

>

{user.nickname}

</h2>


<p

className="
text-gray-400

text-sm

mt-1

"

>

Сервер: {user.server}

</p>



</div>









<div

className="
rounded-xl

bg-white/5

border

border-white/10

p-5

"

>


<h2

className="
font-bold

text-lg

mb-4

"

>

Изменение пароля

</h2>







<input

type="password"

placeholder="Старый пароль"

value={oldPassword}

onChange={(e)=>setOldPassword(e.target.value)}

className="
w-full

max-w-full

appearance-none

bg-black/50

border

border-white/10

rounded-xl

p-3

mb-3

outline-none

"

 />









<input

type="password"

placeholder="Новый пароль"

value={newPassword}

onChange={(e)=>setNewPassword(e.target.value)}

className="
w-full

max-w-full

appearance-none

bg-black/50

border

border-white/10

rounded-xl

p-3

mb-3

outline-none

"

 />









<input

type="password"

placeholder="Повторите новый пароль"

value={repeatPassword}

onChange={(e)=>setRepeatPassword(e.target.value)}

className="
w-full

max-w-full

appearance-none

bg-black/50

border

border-white/10

rounded-xl

p-3

mb-4

outline-none

"

 />









<button

onClick={changePassword}

className="
bg-white

text-black

font-bold

px-6

py-3

rounded-xl

hover:bg-zinc-200

transition

"

>

Сохранить пароль

</button>







{
message && (

<div

className="
mt-4

w-full

max-w-full

overflow-hidden

break-words

rounded-xl

bg-black/40

border

border-white/10

px-4

py-3

text-sm

text-yellow-400

"

>

{message}

</div>

)

}



</div>



</>

)

}



</div>







</section>







</main>

);


}