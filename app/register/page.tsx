"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterPage(){

const router = useRouter();


const [nickname,setNickname] = useState("");

const [password,setPassword] = useState("");

const [repeatPassword,setRepeatPassword] = useState("");

const [server,setServer] = useState("RED");

const [error,setError] = useState("");





const servers = [

{name:"RED",color:"#ef4444"},
{name:"YELLOW",color:"#facc15"},
{name:"GREEN",color:"#22c55e"},
{name:"AZURE",color:"#075985"},
{name:"SILVER",color:"#9ca3af"},
{name:"ROSE",color:"#fb7185"},
{name:"BLACK",color:"#000000"},
{name:"SKY",color:"#0ea5e9"},
{name:"TITAN",color:"#8b5cf6"},
{name:"X",color:"#800020"},
{name:"FIRE",color:"#f97316"},
{name:"LIME",color:"#84cc16"}

];







function checkNickname(value:string){


const regex = /^[A-Za-zА-Яа-я]{4,}_[A-Za-zА-Яа-я]{4,}$/;


if(!regex.test(value)){


return "Никнейм должен быть в формате Имя_Фамилия (минимум 4 буквы)";


}


return "";

}









function checkPassword(value:string){


if(value.length < 8){

return "Пароль должен содержать минимум 8 символов";

}


if(/\s/.test(value)){

return "Пароль не должен содержать пробелы";

}


if(!/[A-ZА-Я]/.test(value)){

return "Добавьте заглавную букву";

}


if(!/[a-zа-я]/.test(value)){

return "Добавьте маленькую букву";

}


if(!/[0-9]/.test(value)){

return "Добавьте цифру";

}



return "";

}







async function register(){


setError("");



if(!nickname || !password || !repeatPassword){


setError("Заполните все поля");

return;

}






const nicknameError = checkNickname(nickname);


if(nicknameError){

setError(nicknameError);

return;

}






if(password !== repeatPassword){


setError("Пароли не совпадают");

return;

}






const passwordError = checkPassword(password);



if(passwordError){

setError(passwordError);

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
min-h-screen

overflow-y-auto

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







{/* OVERLAY */}


<div

className="
fixed

inset-0

bg-black/60

z-10

"

/>








{/* REGISTER */}



<div

className="
relative

z-20

w-[450px]

my-10

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

mb-5

"

>

← Вернуться на главную

</button>








<h1

className="
text-3xl

font-bold

text-center

mb-2

"

>

MAZEPOV STORE

</h1>







<p

className="
text-center

text-zinc-400

mb-6

"

>

Регистрация аккаунта

</p>









<input

className="
w-full

appearance-none

bg-black/60

border

border-white/20

rounded-xl

p-3

mb-2

outline-none

"

placeholder="Имя_Фамилия"

value={nickname}

onChange={(e)=>setNickname(e.target.value)}

/>







<p

className="
text-xs

text-zinc-500

mb-4

"

>

Формат: Имя_Фамилия. Минимум 4 буквы в имени и фамилии.

</p>









<input

type="password"

className="
w-full

appearance-none

bg-black/60

border

border-white/20

rounded-xl

p-3

mb-2

outline-none

"

placeholder="Пароль"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>







<p

className="
text-xs

text-zinc-500

mb-4

"

>

Минимум 8 символов: заглавная буква, цифра и спецсимвол.

</p>








<input

type="password"

className="
w-full

appearance-none

bg-black/60

border

border-white/20

rounded-xl

p-3

mb-5

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

mb-3

"

>

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

servers.map((item)=>(


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

<div

className="
w-full

max-w-full

overflow-hidden

break-words

rounded-xl

bg-red-500/10

border

border-red-500/30

px-4

py-3

mb-5

text-sm

text-red-400

"

>

{error}

</div>


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

mt-5

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