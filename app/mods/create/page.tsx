"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function CreateModPage(){


const router = useRouter();


const [user,setUser] = useState<any>(null);


const [title,setTitle] = useState("");

const [category,setCategory] = useState("");

const [description,setDescription] = useState("");


const [image,setImage] = useState<File | null>(null);

const [dff,setDff] = useState<File | null>(null);

const [txd,setTxd] = useState<File | null>(null);


const [loading,setLoading] = useState(false);





useEffect(()=>{


const data = localStorage.getItem("user");


if(!data){

router.push("/login");

return;

}


const u = JSON.parse(data);


if(
u.role !== "ADMIN" &&
u.role !== "OWNER"
){

router.push("/mods");

return;

}


setUser(u);



},[]);






async function createMod(){


if(!title || !category){

alert("Заполните обязательные поля");

return;

}



setLoading(true);



const form = new FormData();


form.append(
"title",
title
);


form.append(
"category",
category
);


form.append(
"description",
description
);



if(image){

form.append(
"image",
image
);

}



if(dff){

form.append(
"dff",
dff
);

}



if(txd){

form.append(
"txd",
txd
);

}





const res = await fetch(
"/api/mods/create",
{
method:"POST",
body:form
}
);





const data = await res.json();



setLoading(false);



if(!res.ok){

alert(data.error);

return;

}




alert("Мод создан");


router.push("/mods");



}





if(!user){

return null;

}






return (

<main

className="
relative
min-h-screen
text-white
overflow-hidden
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

<Header />

</div>







<section

className="
relative
z-20
pt-40
w-[90%]
max-w-3xl
mx-auto
"

>




<div

className="
bg-black/70
border
border-zinc-800
rounded-2xl
p-8
"

>


<h1

className="
text-3xl
font-bold
mb-8
"

>

Создание мода

</h1>








<input

placeholder="Название мода"

value={title}

onChange={(e)=>setTitle(e.target.value)}

className="
w-full
mb-4
p-3
rounded-xl
bg-black
border
border-zinc-700
"

/>







<input

placeholder="Категория"

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="
w-full
mb-4
p-3
rounded-xl
bg-black
border
border-zinc-700
"

/>







<textarea

placeholder="Описание"

value={description}

onChange={(e)=>setDescription(e.target.value)}

className="
w-full
mb-4
p-3
h-32
rounded-xl
bg-black
border
border-zinc-700
"

/>









<label className="block mb-3">

Изображение


<input

type="file"

accept="image/*"

onChange={(e)=>

setImage(
e.target.files?.[0] || null
)

}

/>


</label>








<label className="block mb-3">

DFF файл


<input

type="file"

accept=".dff"

onChange={(e)=>

setDff(
e.target.files?.[0] || null
)

}

/>


</label>








<label className="block mb-3">

TXD файл


<input

type="file"

accept=".txd"

onChange={(e)=>

setTxd(
e.target.files?.[0] || null
)

}

/>


</label>









<button

onClick={createMod}

disabled={loading}

className="
mt-6
w-full
bg-white
text-black
py-3
rounded-xl
font-bold
hover:bg-zinc-200
"

>

{

loading

?

"Создание..."

:

"Создать мод"

}


</button>







</div>



</section>




</main>


);


}