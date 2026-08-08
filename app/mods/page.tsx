"use client";

import Header from "@/components/Header";
import { useState } from "react";


export default function ModsPage() {


const [openCategory, setOpenCategory] =
useState<string | null>(null);


const [openSubCategory, setOpenSubCategory] =
useState<string | null>(null);


const [activeCategory, setActiveCategory] =
useState("Все");



const expandableCategories = [


{
name: "Скины",

items: [
"Государственные",
"Мафии",
"Банды",
"Гражданские",
],

},



{
name: "Оружие",

items: [
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
"Дробовик",
],

},



{
name: "Интерьеры",

items: [
"24.7",
"ДПС/ППС/ФСБ",
"Оружейка",
"Ашан",
"Аптека",
"ПК клуб",
"Особняк",
"Банк",
],

},



{
name: "Заменные территории",

items: [

"24.7",
"ДПС/ППС/ФСБ",
"Оружейка",
"Ашан",
"Аптека",
"ПК клуб",
"Особняк",
"ЦР",
"ФСИН",

{
name:"Арзамас",

children:[
"Батырево",
"Южка",
],

},

"Бизвар локации",
"Вокзалы",
"Казино",
"Порт",

],

},



{
name:"Эффекты",

items:[
"Кровь",
"Эффект при попадании",
"Эффект при убийстве и ноке (ld_bum)",
],

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
"Абакан",
"Гроза",
"СВД",
"СВД ПСО",
],

},

],

},


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
"Подсказки для госс. сотрудников",

];



const mods = [

{
title:"Государственные скины",
category:"Государственные",
image:"/images/mods/mod1.png",
},


{
title:"Ганпак оружия",
category:"Ганпак",
image:"/images/mods/mod2.png",
},


{
title:"Новая карта",
category:"Карты",
image:"/images/mods/mod3.png",
},


{
title:"Интерьер банка",
category:"Банк",
image:"/images/mods/mod4.png",
},


];



const filteredMods =

activeCategory === "Все"

?

mods

:

mods.filter(
(mod)=>
mod.category === activeCategory
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


{/* VIDEO */}

<video

autoPlay
loop
muted
playsInline
preload="none"

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





{/* OVERLAY */}

<div

className="
fixed
inset-0
bg-black/60
z-10
pointer-events-none
"

/>








{/* HEADER */}

<div

className="
relative
z-50
"

>

<Header />

</div>








<section

className="
relative
z-20
pt-32
w-[82%]
max-w-6xl
mx-auto
flex
gap-6
"

>









{/* MENU */}

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


<h2 className="text-xl font-bold mb-5">

Категории

</h2>





<button

onClick={() =>
setActiveCategory("Все")
}

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

expandableCategories.map((category)=>(


<div

key={category.name}

className="mt-3"

>


<button

onClick={() =>
setOpenCategory(

openCategory === category.name

?

null

:

category.name

)

}

className="
flex
justify-between
items-center
w-full
py-2
font-semibold
"

>

{category.name}


<span>

{

openCategory === category.name

?

"−"

:

"+"

}

</span>


</button>







{

openCategory === category.name &&

(

<div

className="
ml-4
border-l
border-zinc-800
pl-3
"

>


{

category.items.map((item)=>(


typeof item === "string"

?


<button

key={item}

onClick={() =>
setActiveCategory(item)
}

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

onClick={() =>
setOpenSubCategory(

openSubCategory === item.name

?

null

:

item.name

)

}

className="
flex
justify-between
w-full
py-1
text-sm
text-gray-400
"

>

{item.name}


<span>

{

openSubCategory === item.name

?

"−"

:

"+"

}

</span>


</button>







{

openSubCategory === item.name &&

(

<div className="ml-4">


{

item.children.map(child=>(


<button

key={child}

onClick={() =>
setActiveCategory(child)
}

className="
block
py-1
text-sm
text-gray-500
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

onClick={() =>
setActiveCategory(item)
}

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









{/* MODS */}

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


<img

src={mod.image}

alt={mod.title}

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

filteredMods.length === 0 &&

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