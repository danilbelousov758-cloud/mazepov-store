"use client";


import Header from "@/components/Header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



type CategoryNode = {

    name:string;

    children?:CategoryNode[];

};




type Mod = {

    id:number;

    title:string;

    category:string;

    image?:string | null;

    createdAt:string;

};







function getImageUrl(

    image?:string | null

):string{


    if(!image){

        return "/images/mod-placeholder.png";

    }



    if(image.startsWith("http")){

        return image;

    }



    if(image.startsWith("/")){

        return image;

    }



    return "/" + image;


}









export default function ModsPage(){


    const router = useRouter();



    const [mods,setMods] = useState<Mod[]>([]);



    const [currentUser,setCurrentUser] =
    useState<any>(null);



    const [activeCategory,setActiveCategory] =
    useState("Все");



    const [openedCategories,setOpenedCategories] =
    useState<string[]>([]);









    useEffect(()=>{


        const user =
        localStorage.getItem("user");



        if(user){

            setCurrentUser(

                JSON.parse(user)

            );

        }






        async function loadMods(){


            try{


                const response =
                await fetch(

                    "/api/mods"

                );



                const data =
                await response.json();




                if(Array.isArray(data)){

                    setMods(data);

                }



            }

            catch(error){

                console.log(error);

            }


        }



        loadMods();



    },[]);












    const categories:CategoryNode[] = [



        {

            name:"Скины",

            children:[

                {
                    name:"Государственные"
                },

                {
                    name:"Мафии"
                },

                {
                    name:"Банды"
                },

                {
                    name:"Гражданские"
                }

            ]

        },





        {

            name:"Оружие",

            children:[


                {
                    name:"Ганпак"
                },


                {
                    name:"Дигл"
                },


                {
                    name:"ЮСП"
                },


                {
                    name:"Револьвер"
                },


                {
                    name:"АПС"
                },


                {
                    name:"СВД ПСО"
                },


                {
                    name:"СВД"
                },


                {
                    name:"M4A4"
                },


                {
                    name:"Абакан"
                },


                {
                    name:"Ас Вал"
                },


                {
                    name:"Гроза"
                },


                {
                    name:"Дробовик"
                }


            ]

        },









        {

            name:"Интерьеры",

            children:[


                {
                    name:"24.7"
                },


                {
                    name:"ДПС/ППС/ФСБ"
                },


                {
                    name:"Оружейка"
                },


                {
                    name:"Ашан"
                },


                {
                    name:"Аптека"
                },


                {
                    name:"ПК клуб"
                },


                {
                    name:"Особняк"
                },


                {
                    name:"Банк"
                }


            ]

        },









        {

            name:"Заменные территории",

            children:[


                {
                    name:"Арзамас"
                },


                {
                    name:"Батырево"
                },


                {
                    name:"Южный"
                },


                {
                    name:"ЦР"
                },


                {
                    name:"ФСИН"
                },


                {
                    name:"Бизвар локации"
                },


                {
                    name:"Вокзалы"
                }


            ]

        },










        {

            name:"Звуки",

            children:[


                {

                    name:"Попадание"

                },



                {

                    name:"Ганы",

                    children:[


                        {
                            name:"Дигл"
                        },


                        {
                            name:"ЮСП"
                        },


                        {
                            name:"Револьвер"
                        },


                        {
                            name:"АПС"
                        },


                        {
                            name:"M4A4"
                        },


                        {
                            name:"Абакан"
                        },


                        {
                            name:"Ас Вал"
                        },


                        {
                            name:"Гроза"
                        },


                        {
                            name:"Дробовик"
                        },


                        {
                            name:"СВД"
                        },


                        {
                            name:"СВД ПСО"
                        }


                    ]

                },



                {

                    name:"Окружение"

                },


                {

                    name:"Транспорт"

                },


                {

                    name:"Радио"

                }


            ]

        }



    ];









    const simpleCategories = [


        "Дороги",

        "Карты",

        "Инвентарь",

        "Скайбоксы",

        "Эффекты",

        "Нефтевышки",

        "Прицелы",

        "Курсор мыши",

        "Фисты",

        "Таймциклы",

        "Пикапы",

        "Ахк",

        "Аси плагины",

        "Деревья",

        "Графика",

        "Загрузочный экран",

        "Подсказки"


    ];

    function toggleCategory(

        name:string

    ){


        setOpenedCategories(prev =>


            prev.includes(name)

            ?

            prev.filter(

                item => item !== name

            )

            :

            [

                ...prev,

                name

            ]


        );


    }








    function renderCategory(

        item:CategoryNode,

        level:number = 0

    ){


        const opened =

        openedCategories.includes(

            item.name

        );



        const hasChildren =

        Boolean(

            item.children && item.children.length

        );






        return (

            <div

            key={item.name}

            className="mb-2"

            >



                <button

                onClick={()=>{


                    if(hasChildren){


                        toggleCategory(

                            item.name

                        );


                    }

                    else{


                        setActiveCategory(

                            item.name

                        );


                    }


                }}


                style={{

                    marginLeft: level * 12

                }}



                className={`

                w-full

                flex

                justify-between

                items-center

                px-3

                py-2

                rounded-xl

                border

                text-sm

                transition


                ${
                    activeCategory === item.name

                    ?

                    "bg-white text-black border-white"

                    :

                    "bg-[#161616] text-zinc-400 border-zinc-800 hover:text-white"

                }

                `}

                >



                    <span>


                    {

                    hasChildren

                    ?

                    opened

                    ?

                    "📂"

                    :

                    "📁"

                    :

                    "•"

                    }


                    {" "}

                    {item.name}


                    </span>



                    {

                    hasChildren &&

                    <span>

                    {

                    opened ? "−" : "+"

                    }

                    </span>

                    }



                </button>







                {

                opened &&

                (

                <div

                className="

                ml-3

                mt-2

                pl-3

                border-l

                border-zinc-800

                "

                >



                    {

                    item.children?.map(

                        child =>

                        renderCategory(

                            child,

                            level + 1

                        )

                    )

                    }



                </div>

                )

                }





            </div>

        );


    }









    const filteredMods =


    activeCategory === "Все"

    ?

    mods

    :

    mods.filter(

        mod =>

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



{/* VIDEO BACKGROUND */}

<video

autoPlay

loop

muted

playsInline

preload="auto"

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

bg-black/70

z-10

"

/>







<div

className="

relative

z-30

"

>


<Header />






<div

className="

max-w-[1500px]

mx-auto

pt-28

px-8

flex

gap-8

"

>






<aside

className="

w-80

h-[75vh]

overflow-y-auto

bg-[#101010]/90

backdrop-blur-xl

border

border-zinc-800

rounded-3xl

p-5

"

>


<h2

className="

text-2xl

font-bold

mb-6

"

>

Категории

</h2>







{

(

currentUser?.role === "ADMIN"

||

currentUser?.role === "OWNER"

)

&&


<button

onClick={()=>


router.push(

"/mods/create"

)


}

className="

w-full

mb-5

py-3

rounded-xl

bg-white

text-black

font-bold

"

>

+ Создать мод

</button>


}







<button

onClick={()=>setActiveCategory("Все")}

className="

mb-5

text-zinc-400

hover:text-white

"

>

Все моды

</button>






{

categories.map(

item =>

renderCategory(item)

)

}





<div

className="

mt-6

pt-4

border-t

border-zinc-800

"

>


{

simpleCategories.map(

item =>

<button

key={item}

onClick={()=>setActiveCategory(item)}

className="

block

w-full

text-left

py-2

text-zinc-400

hover:text-white

"

>

{item}

</button>


)

}



</div>



</aside>









<section

className="

flex-1

grid

grid-cols-1

md:grid-cols-2

xl:grid-cols-3

gap-7

"

>





{

filteredMods.map(

mod =>


<article

key={mod.id}

className="

aspect-square

bg-[#111]/95

border

border-zinc-800

rounded-3xl

overflow-hidden

flex

flex-col

hover:border-zinc-500

transition

"

>





<div

className="

h-16

px-5

flex

items-center

gap-3

border-b

border-zinc-800

"

>


<span

className="

px-3

py-1

rounded-lg

bg-[#1b1b1b]

border

border-zinc-700

text-xs

"

>

{mod.category}

</span>




<h3

className="

font-bold

truncate

"

>

{mod.title}

</h3>



</div>







<div

className="

relative

flex-1

m-4

rounded-2xl

overflow-hidden

"

>


<Image

src={getImageUrl(mod.image)}

alt={mod.title}

fill

priority

sizes="500px"

className="object-cover"

/>


</div>







<div

className="

h-16

p-4

border-t

border-zinc-800

"

>


<a

href={`/api/mods/download/${mod.id}`}

className="

block

w-full

bg-white

text-black

rounded-xl

py-3

text-center

font-bold

text-sm

hover:bg-zinc-200

"

>

⬇ Скачать ZIP

</a>


</div>





</article>


)

}



</section>





</div>



</div>



</main>


);


}