"use client";


import Image from "next/image";
import Header from "@/components/Header";
import { useEffect, useState } from "react";


export default function ModsPage() {


const [openCategory,setOpenCategory] =
useState<string | null>(null);


const [activeCategory,setActiveCategory] =
useState("Все");


const [user,setUser] =
useState<any>(null);



useEffect(()=>{

fetch("/api/auth/me")

.then(res=>res.json())

.then(data=>{

setUser(data.user);

});


},[]);





const canCreateMod =

user &&

(
user.role === "OWNER" ||
user.role === "ADMIN" ||
user.role === "MODERATOR"
);






const categoriesWithItems = [


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
"СВД ПСО",
"СВД",
"M4A4",
"Абакан",
"АС Вал",
"Гроза",
"Дробовик"

]

},



{
name:"Интерьеры",

items:[

"24.7",
"ДПС/ППС/ФСБ",
"Оружейка",
"Ашан",
"Аптека",
"ПК клуб",
"Особняк",
"Банк"

]

},



{
name:"Заменные территории",

items:[

"24.7",
"ДПС/ППС/ФСБ",
"Оружейка",
"Ашан",
"Аптека",
"ПК клуб",
"Особняк",
"ЦР",
"ФСИН",
"Арзамас",
"Батырево",
"Южный",
"Бизвар локации",
"Вокзалы",
"Казино",
"Порт"

]

},



{
name:"Эффекты",

items:[

"Кровь",
"Эффект при попадании",
"Эффект при убийстве и ноке"

]

},



{
name:"Звуки",

items:[

"Попадание",
"Ганы",
"Пистолеты",
"M4A4",
"Абакан",
"Гроза",
"СВД",
"СВД ПСО"

]

}



];







const simpleCategories = [


"Дороги",
"Карты",
"Инвентарь",
"Скайбоксы",
"Нефтевышки",
"Прицелы",
"Курсор мыши",
"Фисты",
"Таймциклы",
"Пикапы",
"АХК",
"АСИ плагины",
"Деревья",
"Графика",
"Загрузочный экран",
"Подсказки для госс. сотрудников"


];







const mods = [


{
title:"Государственные скины",
category:"Государственные",
image:"/images/mods/mod1.png"

},


{
title:"Ганпак оружия",
category:"Ганпак",
image:"/images/mods/mod2.png"

},


{
title:"Новая карта",
category:"Карты",
image:"/images/mods/mod3.png"

},


{
title:"Интерьер банка",
category:"Банк",
image:"/images/mods/mod4.png"

}



];








const filteredMods =

activeCategory === "Все"

?

mods

:

mods.filter(

mod => mod.category === activeCategory

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
pointer-events-none
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
pointer-events-none
"

/>








<div

className="
relative
z-[100]
"

>

<Header/>

</div>









<section

className="
relative
z-20
pt-34
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




<h2

className="
text-xl
font-bold
mb-5
"

>

Категории

</h2>






{

canCreateMod &&

(

<a

href="/mods/create"

className="
block
mb-4
text-center
bg-white
text-black
rounded-xl
py-2
font-bold
"

>

+ Создать мод

</a>

)

}








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

categoriesWithItems.map(category=>(


<div

key={category.name}

className="mt-3"

>


<button

onClick={()=>setOpenCategory(

openCategory === category.name

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

openCategory===category.name &&


<div className="ml-4">


{

category.items.map(item=>(


<button

key={item}

onClick={()=>setActiveCategory(item)}

className="
block
py-1
text-sm
text-gray-400
hover:text-white
"

>

{item}

</button>


))


}


</div>


}





</div>


))


}







<div

className="
mt-6
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
gap-4
h-fit
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
shadow-lg
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





<div className="p-3">


<h3 className="font-semibold">

{mod.title}

</h3>



<p className="text-xs text-gray-500">

{mod.category}

</p>


</div>



</div>


))


}





{

filteredMods.length===0 &&

(

<p className="text-gray-400">

В этой категории пока нет модов

</p>

)


}





</div>








</section>






</main>


);


}