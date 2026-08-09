"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


type Category = {
    name: string;
    items: string[];
};



export default function CreateModPage() {


    const router = useRouter();


    const [title, setTitle] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [txdPath, setTxdPath] =
        useState("");

    const [dffPath, setDffPath] =
        useState("");


    const [image, setImage] =
        useState<File | null>(null);

    const [txd, setTxd] =
        useState<File | null>(null);

    const [dff, setDff] =
        useState<File | null>(null);


    const [loading, setLoading] =
        useState(false);



    const categories: Category[] = [

        {
            name: "Скины",
            items: [
                "Государственные",
                "Мафии",
                "Банды",
                "Гражданские"
            ]
        },


        {
            name: "Оружие",
            items: [
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
            name: "Интерьеры",
            items: [
                "24.7",
                "Банк",
                "Особняк",
                "Оружейка"
            ]
        },


        {
            name: "Карты",
            items: [
                "Города",
                "Здания",
                "Дороги"
            ]
        }

    ];





    async function uploadToB2(
        file: File,
        folder: string
    ) {


        const response =
            await fetch(
                "/api/mods/upload-url",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },


                    body: JSON.stringify({

                        filename:
                            `${folder}/${Date.now()}-${file.name}`,

                        type:
                            file.type ||
                            "application/octet-stream"

                    })

                }
            );



        if (!response.ok) {

            throw new Error(
                "Ошибка получения ссылки B2"
            );

        }



        const data =
            await response.json();



        const upload =
            await fetch(
                data.url,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            file.type ||
                            "application/octet-stream"

                    },


                    body: file

                }
            );



        if (!upload.ok) {

            throw new Error(
                "Ошибка загрузки файла B2"
            );

        }



        return data.key;

    }







    async function createMod() {


        if (

            !title ||
            !category ||
            !image ||
            !txd ||
            !dff

        ) {

            alert(
                "Заполните все поля"
            );

            return;

        }



        setLoading(true);



        try {


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

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },


                        body: JSON.stringify({

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




            if (result.success) {


                alert(
                    "Мод успешно создан"
                );


                router.push(
                    "/mods"
                );


            }
            else {


                alert(
                    result.error ||
                    "Ошибка создания"
                );


            }




        }
        catch(error) {


            console.error(
                error
            );


            alert(
                "Ошибка загрузки мода"
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
                max-w-6xl
                mx-auto
                grid
                md:grid-cols-2
                gap-8
                "
            >



                <section
                    className="
                    bg-zinc-900
                    rounded-2xl
                    p-6
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
                        rounded-xl
                        p-3
                        mb-3
                        "

                        placeholder="Название мода"

                        value={title}

                        onChange={
                            e =>
                                setTitle(
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
                        rounded-xl
                        p-3
                        mb-3
                        "

                        placeholder="Расположение TXD"

                        value={txdPath}

                        onChange={
                            e =>
                                setTxdPath(
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
                        rounded-xl
                        p-3
                        mb-5
                        "

                        placeholder="Расположение DFF"

                        value={dffPath}

                        onChange={
                            e =>
                                setDffPath(
                                    e.target.value
                                )
                        }

                    />





                    <p>Фото</p>

                    <input
                        type="file"
                        onChange={
                            e =>
                                setImage(
                                    e.target.files?.[0] || null
                                )
                        }
                    />



                    <p className="mt-4">
                        TXD
                    </p>

                    <input
                        type="file"
                        onChange={
                            e =>
                                setTxd(
                                    e.target.files?.[0] || null
                                )
                        }
                    />




                    <p className="mt-4">
                        DFF
                    </p>


                    <input
                        type="file"
                        onChange={
                            e =>
                                setDff(
                                    e.target.files?.[0] || null
                                )
                        }
                    />





                    <button

                        onClick={createMod}

                        disabled={loading}

                        className="
                        mt-6
                        w-full
                        bg-white
                        text-black
                        rounded-xl
                        p-3
                        font-bold
                        "

                    >

                        {
                            loading
                                ?
                                "Загрузка файлов..."
                                :
                                "Создать мод"
                        }


                    </button>



                </section>







                <section
                    className="
                    bg-zinc-900
                    rounded-2xl
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

                        Категории

                    </h2>




                    {
                        categories.map(cat => (

                            <div
                                key={cat.name}
                                className="mb-5"
                            >


                                <h3
                                    className="
                                    text-zinc-400
                                    mb-2
                                    "
                                >

                                    {cat.name}

                                </h3>




                                {
                                    cat.items.map(item => (

                                        <button

                                            key={item}

                                            onClick={
                                                () =>
                                                    setCategory(
                                                        item
                                                    )
                                            }


                                            className={`
                                            w-full
                                            text-left
                                            p-2
                                            rounded-lg
                                            mb-2

                                            ${
                                                category === item
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