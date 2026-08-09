"use client";

import Header from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";


export default function AdminPage(){

const router = useRouter();


const tableRef = useRef<HTMLDivElement>(null);



const [users,setUsers] = useState<any[]>([]);

const [loading,setLoading] = useState(true);


const [currentUser,setCurrentUser] = useState<any>(null);


const [search,setSearch] = useState("");



const [selectedCell,setSelectedCell] = useState<any>(null);


const [editCell,setEditCell] = useState<any>(null);



const [profile,setProfile] = useState<any>(null);






async function loadUsers(){


setLoading(true);



const res = await fetch(

"/api/admin/users"

);



const data = await res.json();



setUsers(data);



setLoading(false);


}








async function getCurrentUser(){


const saved = localStorage.getItem("user");



if(!saved){

router.push("/login");

return;

}



const session = JSON.parse(saved);






const res = await fetch(

"/api/auth/me",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

id:session.id

})

}

);







const user = await res.json();





if(!user || user.error){

router.push("/login");

return;

}





setCurrentUser(user);






if(

user.role !== "ADMIN" &&

user.role !== "OWNER"

){

router.push("/");

return;

}





loadUsers();



}









async function saveField(

id:number,

field:string,

value:string

){



const res = await fetch(

`/api/admin/users/${id}`,

{

method:"PATCH",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

field,

value,

adminRole:currentUser.role

})


}

);






const data = await res.json();






if(!res.ok){


alert(data.error);


return;


}






setEditCell(null);

setSelectedCell(null);



loadUsers();


}









function openEdit(

id:number,

field:string,

value:string

){



if(currentUser.role !== "OWNER"){

return;

}






if(

selectedCell?.id === id &&

selectedCell?.field === field

){


setEditCell({

id,

field,

value

});


}

else{


setSelectedCell({

id,

field

});


}



}









function openProfile(user:any){


setProfile(user);


}









useEffect(()=>{


getCurrentUser();



},[]);









useEffect(()=>{


function clickOutside(e:MouseEvent){



if(

tableRef.current &&

!tableRef.current.contains(

e.target as Node

)

){


setSelectedCell(null);

setEditCell(null);



}



}




document.addEventListener(

"mousedown",

clickOutside

);




return ()=>{


document.removeEventListener(

"mousedown",

clickOutside

);



}


},[]);









const isOwner =

currentUser?.role === "OWNER";









const filteredUsers = users.filter(user =>


user.nickname

?.toLowerCase()

.includes(

search.toLowerCase()

)


);








if(!currentUser){


return null;


}

return (

<main

className="
relative
min-h-screen
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
bg-black/70
z-10
"

/>







<div className="relative z-50">

<Header/>

</div>









<section

className="
relative
z-20
pt-32
w-[92%]
max-w-7xl
mx-auto
"

>







<div

className="
bg-[#090909]/90
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-8
shadow-2xl
"

>








<div

className="
flex
justify-between
items-center
mb-8
"

>



<div>


<h1

className="
text-3xl
font-bold
"

>

Админ панель

</h1>



<p

className="
text-zinc-400
mt-2
"

>

Пользователей: {users.length}

</p>



<p

className="
text-zinc-400
"

>

Ваша роль: {currentUser.role}

</p>


</div>







<button

onClick={loadUsers}

className="
bg-white
text-black
px-5
py-3
rounded-xl
font-bold
hover:bg-zinc-200
transition
"

>

Обновить

</button>




</div>









<input

placeholder="
Поиск по никнейму...
"

value={search}


onChange={(e)=>

setSearch(e.target.value)

}


className="
w-full
mb-6
px-5
py-3
rounded-xl
bg-black
border
border-white/10
outline-none
focus:border-white/40
"

 />









<div

ref={tableRef}

className="
overflow-x-auto
rounded-2xl
border
border-white/10
"

>





<table

className="
w-full
"

>






<thead>

<tr

className="
bg-white/5
text-zinc-300
"

>


<th className="
p-4
text-left
">

ID

</th>



<th className="
p-4
text-left
">

Никнейм

</th>



<th className="
p-4
text-left
">

Сервер

</th>



<th className="
p-4
text-left
">

Роль

</th>




<th className="
p-4
text-left
">

Действия

</th>




</tr>


</thead>








<tbody>



{

loading ?


<tr>

<td

colSpan={5}

className="
p-8
text-center
text-zinc-400
"

>

Загрузка...

</td>

</tr>



:


filteredUsers.map(user=>(



<tr

key={user.id}

className="
border-t
border-white/10
hover:bg-white/5
transition
"

>







<td className="
p-4
text-zinc-400
">

#{user.id}

</td>








<td className="
p-4
font-semibold
">

{

editCell?.id===user.id &&

editCell.field==="nickname"


?


<input

autoFocus

value={editCell.value}


onChange={(e)=>

setEditCell({

...editCell,

value:e.target.value

})

}



onKeyDown={(e)=>{


if(e.key==="Enter"){

saveField(

user.id,

"nickname",

editCell.value

);

}



if(e.key==="Escape"){

setEditCell(null);

}



}}



className="
bg-black
border
border-white/20
rounded-lg
px-3
py-2
outline-none
w-full
"

/>



:


<span

onClick={()=>openEdit(

user.id,

"nickname",

user.nickname

)}

className="
cursor-pointer
"

>

{user.nickname}

</span>



}


</td>








<td className="
p-4
">


{

editCell?.id===user.id &&

editCell.field==="server"


?


<input

autoFocus

value={editCell.value}


onChange={(e)=>

setEditCell({

...editCell,

value:e.target.value

})

}



onKeyDown={(e)=>{


if(e.key==="Enter"){

saveField(

user.id,

"server",

editCell.value

);

}



if(e.key==="Escape"){

setEditCell(null);

}



}}



className="
bg-black
border
border-white/20
rounded-lg
px-3
py-2
outline-none
w-full
"

/>



:


<span

onClick={()=>openEdit(

user.id,

"server",

user.server

)}

className="
cursor-pointer
"

>

{user.server}

</span>



}



</td>








<td className="
p-4
">


{

editCell?.id===user.id &&

editCell.field==="role"


?


<input

autoFocus

value={editCell.value}



onChange={(e)=>

setEditCell({

...editCell,

value:e.target.value.toUpperCase()

})

}



onKeyDown={(e)=>{


if(e.key==="Enter"){

saveField(

user.id,

"role",

editCell.value

);

}



if(e.key==="Escape"){

setEditCell(null);

}



}}



className="
bg-black
border
border-white/20
rounded-lg
px-3
py-2
outline-none
w-full
"

/>



:


<span

onClick={()=>openEdit(

user.id,

"role",

user.role

)}

className="
cursor-pointer
"

>

{user.role}

</span>



}



</td>








<td className="
p-4
">


<button

onClick={()=>openProfile(user)}

className="
bg-white
text-black
px-4
py-2
rounded-xl
font-bold
hover:bg-zinc-200
transition
"

>

Профиль

</button>


</td>








</tr>



))


}



</tbody>



</table>



</div>

{

profile && (

<div

className="
fixed
inset-0
z-[100]
flex
items-center
justify-center
bg-black/70
backdrop-blur-sm
"

onClick={()=>setProfile(null)}

>



<div

className="
w-[95%]
max-w-xl
bg-[#090909]
border
border-white/10
rounded-3xl
p-8
shadow-2xl
"

onClick={(e)=>

e.stopPropagation()

}

>





<div

className="
flex
justify-between
items-center
mb-6
"

>


<h2

className="
text-2xl
font-bold
"

>

Профиль пользователя

</h2>




<button

onClick={()=>setProfile(null)}

className="
text-zinc-400
hover:text-white
text-xl
"

>

✕

</button>



</div>









<div

className="
space-y-4
"

>





<div

className="
bg-white/5
rounded-xl
p-4
"

>

<p className="
text-zinc-400
text-sm
">

ID

</p>


<p className="
font-bold
"

>

#{profile.id}

</p>


</div>







<div

className="
bg-white/5
rounded-xl
p-4
"

>

<p className="
text-zinc-400
text-sm
">

Никнейм

</p>


<p className="
font-bold
"

>

{profile.nickname}

</p>


</div>








<div

className="
bg-white/5
rounded-xl
p-4
"

>

<p className="
text-zinc-400
text-sm
">

Сервер

</p>


<p className="
font-bold
"

>

{profile.server}

</p>


</div>








<div

className="
bg-white/5
rounded-xl
p-4
"

>

<p className="
text-zinc-400
text-sm
">

Роль

</p>


<p className="
font-bold
"

>

{profile.role}

</p>


</div>








<div

className="
bg-white/5
rounded-xl
p-4
"

>

<p className="
text-zinc-400
text-sm
">

Дата регистрации

</p>


<p className="
font-bold
"

>

{

profile.createdAt

?

new Date(profile.createdAt)

.toLocaleString()

:

"Нет данных"

}


</p>


</div>









{

profile.email && (


<div

className="
bg-white/5
rounded-xl
p-4
"

>

<p className="
text-zinc-400
text-sm
">

Email

</p>


<p className="
font-bold
"

>

{profile.email}

</p>


</div>


)



}









{

currentUser.role==="OWNER" && (


<div

className="
bg-white/5
rounded-xl
p-4
"

>

<p className="
text-zinc-400
text-sm
">

Пароль

</p>


<p className="
font-bold
"

>

••••••••

</p>


</div>


)



}




</div>






</div>



</div>


)



}







</div>


</section>


</main>


);


}