"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


type Category = {
    name:string;
    items:string[];
};



export default function CreateModPage(){


    const router = useRouter();


    const [title,setTitle] =
        useState("");

    const [category,setCategory] =
        useState("");


    const [txdPath,setTxdPath] =
        useState("");

    const [dffPath,setDffPath] =
        useState("");



    const [image,setImage] =
        useState<File | null>(null);

    const [txd,setTxd] =
        useState<File | null>(null);

    const [dff,setDff] =
        useState<File | null>(null);



    const [loading,setLoading] =
        useState(false);



    const categories:Category[] = [


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
            name:"Карты",
            items:[
                "Города",
                "Здания",
                "Дороги"
            ]
        }


    ];





    async function uploadToB2(
        file:File,
        folder:string
    ){


        const res =
            await fetch(
                "/api/mods/upload-url",
                {

                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },


                    body:
                    JSON.stringify({

                        filename:
                        `${folder}/${file.name}`,

                        type:
                        file.type

                    })

                }
            );



        const data =
            await res.json();



        await fetch(
            data.url,
            {

                method:"PUT",

                headers:{
                    "Content-Type":
                    file.type
                },


                body:file

            }
        );



        return data.key;

    }





    async function createMod(){


        if(
            !title ||
            !category ||
            !image ||
            !txd ||
            !dff
        ){

            alert(
                "Заполните все поля"
            );

            return;

        }



        setLoading(true);



        try{


            const imageKey =
                await uploadToB2(
                    image,
                    "images"
                );


            const txdKey =
                await uploadToB2(
                    txd,
                    "txd"
                );


            const dffKey =
                await uploadToB2(
                    dff,
                    "dff"
                );





            const response =
                await fetch(
                    "/api/mods/create",
                    {

                        method:"POST",

                        headers:{
                            "Content-Type":
                            "application/json"
                        },


                        body:
                        JSON.stringify({

                            title,

                            category,

                            image:
                            `${process.env.NEXT_PUBLIC_B2_URL}/${imageKey}`,

                            txd:
                            `${process.env.NEXT_PUBLIC_B2_URL}/${txdKey}`,

                            dff:
                            `${process.env.NEXT_PUBLIC_B2_URL}/${dffKey}`,

                            txdPath,

                            dffPath

                        })

                    }
                );



            const result =
                await response.json();



            if(result.success){

                alert(
                    "Мод создан"
                );


                router.push(
                    "/mods"
                );

            }
            else{

                alert(
                    result.error
                );

            }


        }
        catch(error){

            console.error(
                error
            );


            alert(
                "Ошибка загрузки"
            );

        }


        setLoading(false);


    }






    return (

        <main
        className="
        min-h-screen
        bg-black
        text-white
        p-10
        "
        >


            <div
            className="
            max-w-5xl
            mx-auto
            grid
            grid-cols-2
            gap-8
            "
            >



                <section
                className="
                bg-zinc-900
                p-6
                rounded-2xl
                "
                >


                    <h1
                    className="
                    text-2xl
                    font-bold
                    mb-5
                    "
                    >

                    Создание мода

                    </h1>



                    <input

                    className="
                    w-full
                    bg-black
                    border
                    border-zinc-700
                    p-3
                    rounded-xl
                    mb-3
                    "

                    placeholder="Название файла"

                    value={title}

                    onChange={
                        e=>setTitle(
                            e.target.value
                        )
                    }

                    />




                    <input

                    className="
                    w-full
                    bg-black
                    border
                    border-zinc-700
                    p-3
                    rounded-xl
                    mb-3
                    "

                    placeholder="Расположение TXD"

                    value={txdPath}

                    onChange={
                        e=>setTxdPath(
                            e.target.value
                        )
                    }

                    />




                    <input

                    className="
                    w-full
                    bg-black
                    border
                    border-zinc-700
                    p-3
                    rounded-xl
                    mb-3
                    "

                    placeholder="Расположение DFF"

                    value={dffPath}

                    onChange={
                        e=>setDffPath(
                            e.target.value
                        )
                    }

                    />





                    <label>
                    Фото:

                    <input
                    type="file"
                    onChange={
                        e=>
                        setImage(
                            e.target.files?.[0] || null
                        )
                    }
                    />

                    </label>




                    <label>
                    TXD:

                    <input
                    type="file"
                    onChange={
                        e=>
                        setTxd(
                            e.target.files?.[0] || null
                        )
                    }
                    />

                    </label>





                    <label>
                    DFF:

                    <input
                    type="file"
                    onChange={
                        e=>
                        setDff(
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
                    p-3
                    rounded-xl
                    font-bold
                    "

                    >

                    {
                    loading
                    ?
                    "Загрузка..."
                    :
                    "Создать мод"
                    }

                    </button>



                </section>







                <section
                className="
                bg-zinc-900
                p-6
                rounded-2xl
                "
                >


                    <h2
                    className="
                    text-xl
                    font-bold
                    mb-4
                    "
                    >

                    Выбор категории

                    </h2>



                    {
                    categories.map(cat=>(

                        <div
                        key={cat.name}
                        className="mb-5"
                        >

                            <h3
                            className="
                            text-gray-400
                            mb-2
                            "
                            >
                            {cat.name}
                            </h3>



                            {
                            cat.items.map(item=>(

                                <button

                                key={item}

                                onClick={
                                    ()=>setCategory(item)
                                }

                                className={`
                                block
                                w-full
                                text-left
                                p-2
                                rounded-lg
                                mb-1
                                ${
                                category===item
                                ?
                                "bg-white text-black"
                                :
                                "bg-black"
                                }
                                `}

                                >

                                {item}

                                </button>

                            ))
                            }


                        </div>

                    ))
                    }


                </section>


            </div>


        </main>

    );

}