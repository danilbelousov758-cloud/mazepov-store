"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type CategoryItem =
  | string
  | {
      name: string;
      children: string[];
    };


type Category = {
  name: string;
  items: CategoryItem[];
};


export default function ModsPage(){

const router = useRouter();


const [currentUser,setCurrentUser] = useState<any>(null);

const [openCategory,setOpenCategory] = useState<string | null>(null);

const [openSubCategory,setOpenSubCategory] = useState<string | null>(null);

const [activeCategory,setActiveCategory] = useState("Все");



useEffect(()=>{

const user = localStorage.getItem("user");


if(user){

setCurrentUser(
JSON.parse(user)
);

}

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



const simpleCategories=[

"Карты",
"Дороги",
"Графика",
"Прицелы",
"Таймциклы"

];



const mods=[

{
title:"Государственные скины",
category:"Государственные",
image:"/images/mod1.png"
},


{
title:"Ганпак оружия",
category:"Ганпак",
image:"/images/mod1.png"
},


{
title:"Карта",
category:"Карты",
image:"/images/mod1.png"
}


];



const filteredMods =

activeCategory==="Все"

?

mods

:

mods.filter(

m=>m.category===activeCategory

);



return (

<main

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





<div className="relative z-50">

<Header />

</div>







<section

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





<aside

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
currentUser?.role==="OWNER") && (


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


)

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

categories.map(category=>(


<div

key={category.name}

className="mt-3"

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

category.items.map(item=>{


if(typeof item==="string"){


return (


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


<div className="ml-3">


{

item.children.map(child=>(


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
border-t
border-zinc-800
pt-4
"

>


{

simpleCategories.map(item=>(


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





</aside>









<div

className="
flex-1
grid
grid-cols-3
gap-5
"

>





{

filteredMods.map((mod,index)=>(



<div

key={index}

className="
rounded-xl
border
border-zinc-800
bg-black/70
overflow-hidden
"

>


<Image

src={mod.image}

alt={mod.title}

width={500}

height={300}

className="
w-full
h-40
object-cover
"

/>



<div

className="
p-4
"

>


<h3 className="font-bold">

{mod.title}

</h3>



<p

className="
text-xs
text-gray-500
"

>

{mod.category}

</p>



</div>


</div>



))


}



</div>







</section>






</main>

);


}