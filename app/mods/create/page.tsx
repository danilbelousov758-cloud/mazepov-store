"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


type CategoryNode = {

    name:string;

    children?:CategoryNode[];

};




export default function CreateModPage(){


    const router = useRouter();



    const [title,setTitle] = useState("");

    const [category,setCategory] = useState("");



    const [image,setImage] = useState<File | null>(null);

    const [txd,setTxd] = useState<File | null>(null);

    const [dff,setDff] = useState<File | null>(null);



    const [opened,setOpened] = useState<string[]>([]);

    const [loading,setLoading] = useState(false);





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
            name:"Эффекты",

            children:[

                {
                    name:"Кровь"
                },

                {
                    name:"Эффект при попадании"
                },

                {
                    name:"Эффект при убийстве"
                }

            ]

        },



        {
            name:"Звуки",

            children:[

                {
                    name:"Попадания"
                },


                {
                    name:"Пистолеты",

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
                        }

                    ]

                }

            ]

        },


        {
            name:"Дороги"
        },

        {
            name:"Карты"
        },

        {
            name:"Инвентарь"
        },

        {
            name:"Скайбоксы"
        },

        {
            name:"Графика"
        },

        {
            name:"Загрузочный экран"
        }

    ];





    const toggleCategory = (name:string)=>{


        setOpened(prev =>

            prev.includes(name)

            ?

            prev.filter(
                x=>x!==name
            )

            :

            [
                ...prev,
                name
            ]

        );


    };





    const renderCategory = (

        item:CategoryNode,

        level:number = 0

    ):React.ReactNode => {


        const hasChildren =
            !!item.children;


        const isOpen =
            opened.includes(item.name);



        return (

            <div

            key={`${item.name}-${level}`}

            className="mb-1"

            >


                <button

                type="button"

                onClick={()=>{

                    if(hasChildren){

                        toggleCategory(
                            item.name
                        );

                    }
                    else{

                        setCategory(
                            item.name
                        );

                    }

                }}


                style={{

                    marginLeft:
                    `${level * 14}px`

                }}


                className={`

                w-full

                flex

                justify-between

                items-center

                rounded-xl

                border

                px-3

                py-2

                ${
                    category===item.name

                    ?

                    "bg-white text-black"

                    :

                    "bg-[#111] text-zinc-300 border-zinc-800"

                }

                `}

                >

                    <span>

                    {
                        hasChildren

                        ?

                        isOpen
                        ?
                        "📂"
                        :
                        "📁"

                        :

                        "▪"
                    }


                    {" "}

                    {item.name}

                    </span>


                    {
                        hasChildren &&

                        <span>

                            {isOpen ? "▲":"▼"}

                        </span>

                    }


                </button>

                                {
                    hasChildren &&
                    isOpen &&
                    (

                        <div

                        className="
                        ml-5
                        mt-1
                        pl-2
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


    };









    async function uploadFile(

        file:File | null,

        folder:string

    ){



        if(!file){

            return "";

        }





        const response = await fetch(

            "/api/mods/presign",

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:JSON.stringify({

                    fileName:file.name,

                    fileType:

                    file.type ||

                    "application/octet-stream",


                    folder

                })

            }

        );






        const data = await response.json();






        if(!response.ok){


            throw new Error(

                data.error ||

                "Ошибка получения ссылки"

            );


        }







        const upload = await fetch(

            data.url,

            {

                method:"PUT",

                headers:{

                    "Content-Type":

                    file.type ||

                    "application/octet-stream"

                },


                body:file

            }

        );







        if(!upload.ok){


            throw new Error(

                "Ошибка загрузки файла"

            );


        }





        return data.key;


    }













    async function createMod(){



        if(

            !title ||

            !category ||

            !image

        ){


            alert(
                "Заполните название, категорию и изображение"
            );


            return;

        }






        try{


            setLoading(true);





            const imagePath =

            await uploadFile(

                image,

                "images"

            );







            const txdPath =

            await uploadFile(

                txd,

                "txd"

            );







            const dffPath =

            await uploadFile(

                dff,

                "dff"

            );







            const response = await fetch(

                "/api/mods/create",

                {

                    method:"POST",


                    headers:{

                        "Content-Type":

                        "application/json"

                    },


                    body:JSON.stringify({

                        title,

                        category,

                        image:imagePath,

                        txd:txdPath,

                        dff:dffPath,

                        txdPath,

                        dffPath

                    })

                }

            );








            const data =

            await response.json();







            if(!response.ok){


                throw new Error(

                    data.error ||

                    "Ошибка создания мода"

                );


            }








            alert(

                "Мод успешно создан"

            );





            router.push(

                "/mods"

            );





        }


        catch(error:any){


            console.error(

                error

            );


            alert(

                error.message ||

                "Ошибка"

            );


        }


        finally{


            setLoading(false);


        }


    }






    const preview = image

    ?

    URL.createObjectURL(image)

    :

    "/images/mod-placeholder.png";







    return (

        <main

        className="

        min-h-screen

        relative

        overflow-hidden

        text-white

        p-6

        "

        >




            <video

            autoPlay

            muted

            loop

            playsInline

            className="

            fixed

            inset-0

            w-full

            h-full

            object-cover

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

            bg-black/85

            "

            />






            <div

            className="

            relative

            z-20

            max-w-7xl

            mx-auto

            "

            >



                <h1

                className="

                text-4xl

                font-bold

                mb-8

                "

                >

                    Создание мода

                </h1>

                                <div

                className="

                grid

                lg:grid-cols-[1fr_360px]

                gap-6

                "

                >




                    <div>





                        <div

                        className="

                        bg-[#0d0d0d]

                        border

                        border-zinc-800

                        rounded-3xl

                        p-6

                        "

                        >


                            <h2

                            className="

                            text-xl

                            font-bold

                            mb-5

                            "

                            >

                                Данные мода

                            </h2>






                            <input

                            value={title}

                            onChange={e=>

                                setTitle(
                                    e.target.value
                                )

                            }


                            placeholder="Название мода"


                            className="

                            w-full

                            bg-black

                            border

                            border-zinc-800

                            rounded-xl

                            p-3

                            mb-5

                            "

                            />






                            <div

                            className="

                            grid

                            md:grid-cols-3

                            gap-4

                            "

                            >



                                <label

                                className="

                                bg-black

                                border

                                border-zinc-800

                                rounded-2xl

                                p-5

                                cursor-pointer

                                "

                                >

                                    🖼 Изображение



                                    <p className="text-xs text-zinc-500 mt-2">

                                    {
                                        image

                                        ?

                                        image.name

                                        :

                                        "Выбрать файл"

                                    }

                                    </p>



                                    <input

                                    hidden

                                    type="file"

                                    accept="image/*"

                                    onChange={e=>

                                        setImage(

                                            e.target.files?.[0] || null

                                        )

                                    }

                                    />


                                </label>






                                <label

                                className="

                                bg-black

                                border

                                border-zinc-800

                                rounded-2xl

                                p-5

                                cursor-pointer

                                "

                                >


                                    📦 TXD



                                    <p className="text-xs text-zinc-500 mt-2">

                                    {
                                        txd

                                        ?

                                        txd.name

                                        :

                                        "Не обязательно"

                                    }

                                    </p>




                                    <input

                                    hidden

                                    type="file"

                                    accept=".txd"

                                    onChange={e=>

                                        setTxd(

                                            e.target.files?.[0] || null

                                        )

                                    }

                                    />



                                </label>







                                <label

                                className="

                                bg-black

                                border

                                border-zinc-800

                                rounded-2xl

                                p-5

                                cursor-pointer

                                "

                                >


                                    🔧 DFF



                                    <p className="text-xs text-zinc-500 mt-2">

                                    {
                                        dff

                                        ?

                                        dff.name

                                        :

                                        "Не обязательно"

                                    }

                                    </p>




                                    <input

                                    hidden

                                    type="file"

                                    accept=".dff"

                                    onChange={e=>

                                        setDff(

                                            e.target.files?.[0] || null

                                        )

                                    }

                                    />



                                </label>




                            </div>


                        </div>









                        <div

                        className="

                        mt-6

                        bg-[#0d0d0d]

                        border

                        border-zinc-800

                        rounded-3xl

                        p-6

                        "

                        >



                            <h2 className="text-xl font-bold mb-4">

                                Предпросмотр

                            </h2>





                            <div

                            className="

                            h-[420px]

                            bg-black

                            rounded-2xl

                            overflow-hidden

                            "

                            >



                                <Image

                                src={preview}

                                alt="preview"

                                width={1200}

                                height={600}

                                unoptimized

                                className="

                                w-full

                                h-full

                                object-cover

                                "

                                />



                            </div>



                        </div>









                        <button

                        onClick={createMod}

                        disabled={loading}

                        className="

                        mt-6

                        w-full

                        bg-white

                        text-black

                        rounded-2xl

                        p-4

                        font-bold

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










                    <aside

                    className="

                    bg-[#0d0d0d]

                    border

                    border-zinc-800

                    rounded-3xl

                    p-5

                    "

                    >



                        <h2 className="text-xl font-bold mb-4">

                            Категории

                        </h2>





                        <div

                        className="

                        max-h-[650px]

                        overflow-y-auto

                        "

                        >


                            {

                                categories.map(

                                    item =>

                                    renderCategory(item)

                                )

                            }


                        </div>




                    </aside>







                </div>





            </div>





        </main>

    );


}