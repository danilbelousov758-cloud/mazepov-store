"use client";

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
LIME:"#84cc16"

};



useEffect(()=>{


async function loadUser(){


const saved = localStorage.getItem("user");


if(!saved){

router.push("/login");

return;

}



const oldUser = JSON.parse(saved);



const response = await fetch(

"/api/auth/me",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

nickname:oldUser.nickname

})

}

);



const data = await response.json();



if(!response.ok){

router.push("/login");

return;

}



// Получаем актуального пользователя из Neon

setUser(data);



// обновляем локальные данные

localStorage.setItem(

"user",

JSON.stringify(data)

);



}



loadUser();



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

<div

className="
relative
min-h-screen
overflow-hidden
text-white
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
pt-32
pb-10
w-[82%]
max-w-5xl
mx-auto
flex
gap-6
"

>


<div

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

<h2 className="
text-xl
font-bold
mb-5
">

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
"

>

🚪 Выйти

</button>


</div>




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

<h1 className="
text-2xl
font-bold
mb-6
">

Мой профиль

</h1>



<div className="
flex
items-center
gap-5
">


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
"

style={{

backgroundColor:
servers[user.server]

}}

>

{user.nickname[0].toUpperCase()}

</div>



<div>

<div className="
text-xl
font-bold
">

{user.nickname}

</div>


<div className="
text-green-400
text-sm
">

● Пользователь активен

</div>


</div>


</div>




<div className="
grid
grid-cols-2
gap-4
mt-6
">


<div className="
rounded-xl
bg-white/5
p-4
">

<div className="
text-xs
text-gray-500
">

ID аккаунта

</div>

#{user.id}

</div>



<div className="
rounded-xl
bg-white/5
p-4
">

<div className="
text-xs
text-gray-500
">

Сервер

</div>

{user.server}

</div>



<div className="
rounded-xl
bg-white/5
p-4
">

<div className="
text-xs
text-gray-500
">

Роль

</div>

{user.role}

</div>



<div className="
rounded-xl
bg-white/5
p-4
">

<div className="
text-xs
text-gray-500
">

Статус

</div>

Онлайн

</div>



</div>


</>

)

}




{
active==="security" && (

<>

<h1 className="
text-2xl
font-bold
mb-6
">

Безопасность

</h1>



<div className="
bg-white/5
rounded-xl
p-5
mb-5
">


<div>

{user.nickname}

</div>


<div className="
text-gray-400
text-sm
">

Сервер: {user.server}

</div>


</div>





<div className="
bg-white/5
rounded-xl
p-5
">


<h2 className="
text-lg
font-bold
mb-4
">

Изменение пароля

</h2>



<input

type="password"

placeholder="Старый пароль"

value={oldPassword}

onChange={e=>setOldPassword(e.target.value)}

className="
w-full
bg-black/50
border
border-white/10
rounded-xl
p-3
mb-3
"

/>



<input

type="password"

placeholder="Новый пароль"

value={newPassword}

onChange={e=>setNewPassword(e.target.value)}

className="
w-full
bg-black/50
border
border-white/10
rounded-xl
p-3
mb-3
"

/>



<input

type="password"

placeholder="Повторите пароль"

value={repeatPassword}

onChange={e=>setRepeatPassword(e.target.value)}

className="
w-full
bg-black/50
border
border-white/10
rounded-xl
p-3
mb-4
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
"

>

Сохранить пароль

</button>



{
message &&

<div className="
mt-4
text-yellow-400
">

{message}

</div>

}


</div>


</>

)

}



</div>


</div>


</div>

);

}