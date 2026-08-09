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



type Mod = {

    id:number;

    title:string;

    category:string;

    description?:string | null;

    image?:string | null;

    dff?:string | null;

    txd?:string | null;

    views:number;

    createdAt:string;

};




export default function ModsPage(){


const router = useRouter();



const [currentUser,setCurrentUser] =
useState<any>(null);



const [mods,setMods] =
useState<Mod[]>([]);



const [openCategory,setOpenCategory] =
useState<string | null>(null);



const [openSubCategory,setOpenSubCategory] =
useState<string | null>(null);



const [activeCategory,setActiveCategory] =
useState("Все");





useEffect(()=>{


const user =
localStorage.getItem("user");



if(user){

setCurrentUser(
JSON.parse(user)
);

}




async function getMods(){


try{


const response =
await fetch("/api/mods");



const data =
await response.json();



if(Array.isArray(data)){

setMods(data);

}



}catch(error){

console.log(error);

}



}



getMods();



},[]);






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






const simpleCategories:string[]=[


"Карты",

"Дороги",

"Графика",

"Прицелы",

"Таймциклы"


];






const filteredMods =


activeCategory==="Все"


?


mods


:


mods.filter(

(mod:Mod)=>

mod.category===activeCategory

);






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
bg-black/60
z-10
"

/>



<div

className="
relative
z-20
pt-40
w-[82%]
max-w-6xl
mx-auto
flex
gap-6
"

>





<div

className="
w-72
h-[75vh]
overflow-y-auto
rounded-2xl
border
border-zinc-800
bg-black/70
p-5
"

>



<div

className="
flex
justify-between
items-center
mb-5
"

>


<h2

className="
text-xl
font-bold
"

>

Категории

</h2>



{

(currentUser?.role==="ADMIN" ||
currentUser?.role==="OWNER")

&&


<button

onClick={()=>router.push("/mods/create")}

className="
bg-white
text-black
px-3
py-2
rounded-xl
font-bold
text-sm
hover:bg-zinc-200
"

>

Создать мод

</button>


}



</div>




<button

onClick={()=>setActiveCategory("Все")}

className="
w-full
text-left
py-2
text-gray-300
hover:text-white
"

>

Все моды

</button>





{
categories.map((category:Category)=>(


<div

key={category.name}

className="
mt-3
"

>


<button

onClick={()=>setOpenCategory(

openCategory===category.name

?

null

:

category.name

)}

className="
w-full
flex
justify-between
font-semibold
py-2
"

>

{category.name}


<span>

{

openCategory===category.name

?

"−"

:

"+"

}

</span>


</button>





{
openCategory===category.name && (


<div

className="
ml-3
border-l
border-zinc-700
pl-3
"

>

{
category.items.map((item:CategoryItem)=>(


typeof item === "string"

?

<button

key={item}

onClick={()=>setActiveCategory(item)}

className="
block
w-full
text-left
py-1
text-sm
text-gray-400
hover:text-white
"

>

{item}

</button>


:

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
text-sm
text-gray-400
py-1
"

>

{item.name}


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


<div>


{

item.children.map((child:string)=>(


<button

key={child}

onClick={()=>setActiveCategory(child)}

className="
block
text-sm
text-gray-500
py-1
hover:text-white
"

>

{child}

</button>


))


}


</div>


)


}



</div>


))

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
border-t
border-zinc-800
pt-4
"

>


{

simpleCategories.map((item:string)=>(


<button

key={item}

onClick={()=>setActiveCategory(item)}

className="
block
w-full
text-left
py-2
text-gray-400
hover:text-white
"

>

{item}

</button>


))


}


</div>



</div>





{/* MODS LIST */}



<div

className="
flex-1
grid
grid-cols-3
gap-5
"

>



{

filteredMods.map((mod:Mod)=>(



<div

key={mod.id}

className="
rounded-xl
border
border-zinc-800
bg-black/70
overflow-hidden
hover:border-white/40
transition
"

>



<div

onClick={()=>router.push(`/mods/${mod.id}`)}

className="
cursor-pointer
"

>



<div

className="
relative
"

>



<div

className="
absolute
top-3
left-3
bg-black/80
px-3
py-1
rounded-lg
text-xs
z-10
"

>

{mod.category}

</div>




<Image

src={
mod.image
?
mod.image
:
"/images/mod-placeholder.png"
}

alt={mod.title}

width={500}

height={300}

className="
w-full
h-40
object-cover
"

/>



</div>





<div

className="
p-4
"

>


<h3

className="
font-bold
text-lg
"

>

{mod.title}

</h3>


</div>



</div>





<div

className="
flex
justify-between
items-center
px-4
pb-4
"

>



<a

href={`/api/mods/download/${mod.id}`}

className="
bg-white
text-black
px-4
py-2
rounded-xl
font-bold
text-sm
"

>

Скачать

</a>





<div

className="
text-xs
text-gray-400
text-right
"

>


<div>

👁 {mod.views || 0}

</div>


<div>

📅 {

new Date(
mod.createdAt
)
.toLocaleDateString(
"ru-RU"
)

}

</div>


</div>



</div>



</div>



))

}



</div>



</div>



</div>



);

}