"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type CategoryItem =
| string
| {
    name:string;
    children:string[];
};


type Category = {
    name:string;
    items:CategoryItem[];
};



export default function CreateModPage(){


const router = useRouter();



const [user,setUser] =
useState<any>(null);



const [title,setTitle] =
useState("");



const [category,setCategory] =
useState("");



const [image,setImage] =
useState<File | null>(null);



const [preview,setPreview] =
useState("");



const [txd,setTxd] =
useState<File | null>(null);



const [dff,setDff] =
useState<File | null>(null);



const [txdPath,setTxdPath] =
useState("");



const [dffPath,setDffPath] =
useState("");



const [openCategory,setOpenCategory] =
useState<string | null>(null);



const [openSubCategory,setOpenSubCategory] =
useState<string | null>(null);



const [loading,setLoading] =
useState(false);




const categories:Category[]=[


{
name:"Скины",
items:[

"Государственные",

"Мафии",

"Банды",

"Гражданские"

]
},



{
name:"Оружие",
items:[

"Ганпак",

"Дигл",

"ЮСП",

"Револьвер",

"АПС",

"СВД",

"M4A4"

]
},



{
name:"Интерьеры",
items:[

"24.7",

"Банк",

"Особняк",

"Оружейка"

]
},



{
name:"Звуки",
items:[

"Попадание",

{
name:"Ганы",

children:[

"Пистолеты",

"M4A4",

"СВД"

]

}

]
}


];



const simpleCategories=[

"Карты",

"Дороги",

"Графика",

"Прицелы",

"Таймциклы"

];





useEffect(()=>{


const data =
localStorage.getItem("user");



if(!data){

router.push("/login");

return;

}



const u =
JSON.parse(data);



if(
u.role!=="ADMIN" &&
u.role!=="OWNER"
){

router.push("/mods");

return;

}



setUser(u);



},[]);





function selectImage(
e:React.ChangeEvent<HTMLInputElement>
){


const file =
e.target.files?.[0];



if(file){

setImage(file);

setPreview(
URL.createObjectURL(file)
);

}


}




function selectCategory(
value:string
){

setCategory(value);

}






async function createMod(){


if(
!title ||
!category ||
!image ||
!txd ||
!dff ||
!txdPath ||
!dffPath
){

alert(
"Заполните все поля"
);

return;

}



setLoading(true);



const form =
new FormData();



form.append(
"title",
title
);



form.append(
"category",
category
);



form.append(
"image",
image
);



form.append(
"txd",
txd
);



form.append(
"dff",
dff
);



form.append(
"txdPath",
txdPath
);



form.append(
"dffPath",
dffPath
);



const response =
await fetch(
"/api/mods/create",
{
method:"POST",
body:form
}
);



const data =
await response.json();



setLoading(false);



if(!response.ok){

alert(
data.error || "Ошибка"
);

return;

}



alert(
"Мод создан"
);



router.push("/mods");


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


<Header />



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




<div

className="
relative
z-20
pt-36
pb-10
w-[90%]
max-w-6xl
mx-auto
flex
gap-6
"

>





{/* ЛЕВАЯ ФОРМА */}



<div

className="
flex-1
bg-black/70
border
border-zinc-800
rounded-3xl
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






<div>

<p

className="
text-sm
text-gray-400
mb-2
"

>

Название мода

</p>



<input

value={title}

onChange={
(e)=>setTitle(e.target.value)
}

placeholder="
Например: M4A4 Military
"

className="
w-full
p-4
rounded-xl
bg-black
border
border-zinc-700
outline-none
"

/>


</div>







<div

className="
mt-7
"

>


<p

className="
text-sm
text-gray-400
mb-2
"

>

Фотография мода

</p>



<label

className="
h-60
rounded-2xl
border
border-dashed
border-zinc-700
bg-black
flex
items-center
justify-center
cursor-pointer
overflow-hidden
"

>



{

preview


?


<Image

src={preview}

alt="preview"

width={700}

height={500}

className="
w-full
h-full
object-cover
"

/>



:


<span

className="
text-gray-500
"

>

+ Добавить изображение

</span>



}



<input

type="file"

accept="image/*"

onChange={selectImage}

className="
hidden
"

/>



</label>



</div>









<div

className="
mt-7
"

>


<p

className="
text-sm
text-gray-400
mb-2
"

>

Расположение TXD

</p>



<input

value={txdPath}

onChange={
(e)=>setTxdPath(e.target.value)
}

placeholder="
models/gta3.img/weapon.txd
"

className="
w-full
p-3
mb-3
rounded-xl
bg-black
border
border-zinc-700
outline-none
"

/>



<label

className="
block
p-4
rounded-xl
bg-black
border
border-zinc-700
cursor-pointer
text-gray-400
hover:text-white
"

>



{

txd

?

txd.name

:

"Выбрать TXD файл"

}



<input

type="file"

accept=".txd"

onChange={
(e)=>
setTxd(
e.target.files?.[0] || null
)
}

className="
hidden
"

/>



</label>



</div>








<div

className="
mt-7
"

>


<p

className="
text-sm
text-gray-400
mb-2
"

>

Расположение DFF

</p>



<input

value={dffPath}

onChange={
(e)=>setDffPath(e.target.value)
}

placeholder="
models/gta3.img/weapon.dff
"

className="
w-full
p-3
mb-3
rounded-xl
bg-black
border
border-zinc-700
outline-none
"

/>



<label

className="
block
p-4
rounded-xl
bg-black
border
border-zinc-700
cursor-pointer
text-gray-400
hover:text-white
"

>



{

dff

?

dff.name

:

"Выбрать DFF файл"

}



<input

type="file"

accept=".dff"

onChange={
(e)=>
setDff(
e.target.files?.[0] || null
)
}

className="
hidden
"

/>



</label>



</div>








<button

onClick={createMod}

disabled={loading}

className="
mt-8
w-full
py-4
rounded-xl
bg-white
text-black
font-bold
text-lg
hover:bg-zinc-200
transition
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






{/* ПРАВАЯ КАТЕГОРИЯ */}



<div

className="
w-80
h-fit
max-h-[75vh]
overflow-y-auto
bg-black/70
border
border-zinc-800
rounded-3xl
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

Категория

</h2>







{

categories.map((cat)=>(


<div

key={cat.name}

className="
mb-3
"

>



<button

onClick={()=>setOpenCategory(

openCategory===cat.name
?
null
:
cat.name

)}

className="
w-full
flex
justify-between
items-center
py-2
font-bold
"

>

<span>

{cat.name}

</span>



<span>

{

openCategory===cat.name

?

"−"

:

"+"

}

</span>



</button>







{

openCategory===cat.name && (


<div

className="
ml-3
border-l
border-zinc-700
pl-3
"

>



{

cat.items.map((item)=>{



if(typeof item === "string"){



return (


<button

key={item}

onClick={()=>selectCategory(item)}

className={`

block

w-full

text-left

py-2

text-sm

transition


${

category===item

?

"text-white font-bold"

:

"text-gray-400 hover:text-white"

}


`}

>


{item}



</button>


)


}







return (


<div

key={item.name}

>



<button

onClick={()=>setOpenSubCategory(

openSubCategory===item.name
?
null
:
item.name

)}

className="
w-full
flex
justify-between
py-2
text-sm
text-gray-400
"

>



<span>

{item.name}

</span>



<span>

{

openSubCategory===item.name

?

"−"

:

"+"

}

</span>



</button>








{

openSubCategory===item.name && (


<div

className="
ml-3
"

>



{

item.children.map(child=>(


<button

key={child}

onClick={()=>selectCategory(child)}

className={`

block

w-full

text-left

py-1

text-sm


${

category===child

?

"text-white font-bold"

:

"text-gray-500 hover:text-white"

}


`}

>

{child}



</button>


))



}



</div>



)



}




</div>


)



})

}



</div>



)



}



</div>



))



}








<div

className="
mt-5
pt-4
border-t
border-zinc-800
"

>



{

simpleCategories.map(item=>(


<button

key={item}

onClick={()=>selectCategory(item)}

className={`

block

w-full

text-left

py-2

text-sm


${

category===item

?

"text-white font-bold"

:

"text-gray-400 hover:text-white"

}


`}

>


{item}



</button>


))


}



</div>






</div>






</div>


</div>


);

}