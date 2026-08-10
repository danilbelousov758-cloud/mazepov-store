import type { NextConfig } from "next";


const nextConfig: NextConfig = {

    images: {

        remotePatterns: [

            {
                protocol: "https",
                hostname: "s3.twcstorage.ru",
            }

        ],

        formats: [

            "image/avif",

            "image/webp"

        ]

    }

};


export default nextConfig;