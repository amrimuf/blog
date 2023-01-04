import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
    runtime: "experimental-edge"
}

const alexandriaFontLoader = (weight: string) =>
        fetch(`https://amri.tech/font/Alexandria-${weight}.ttf`.toString()).then((res) => res.arrayBuffer())

export default async function generalHandler(req: NextRequest) {
    try {
    const { searchParams } = new URL(req.url);

    const templateTitle = searchParams.get('templateTitle');
    const siteName = searchParams.get('siteName');
    const description = searchParams.get('description');
    const logo = 'https://amri.tech/favicon/large-og.png'

    const alexandriaRegular = await alexandriaFontLoader("Regular");
    const alexandriaLight = await alexandriaFontLoader("Light");
    const alexandriaSemibold = await alexandriaFontLoader("SemiBold");
    const alexandriaBold = await alexandriaFontLoader("Bold");

    return new ImageResponse(
    (
        <div tw='flex flex-col items-center w-full h-full justify-center bg-white'>
            <div tw='flex'>
                <img tw='rounded-md h-32 w-32' src={logo}></img>
            </div>
            <h1 tw='text-5xl leading-tight' style={{ fontFamily: "Alexandria-Bold" }}>{templateTitle}</h1>
            <p tw='-mt-2 text-lg text-neutral-900' style={{ fontFamily: "Alexandria-Regular" }}>{siteName}</p>
            <p tw='text-2xl text-neutral-500' style={{ fontFamily: "Alexandria-Light" }}>{description}</p>
            <span
                style={{
                    width: 1200,
                    height: 20,
                    background: '#84cc16',
                    bottom:0,
                    left:0,
                    position: 'absolute',
                }}
                />        
        </div>
    ),
    {
        width: 1200,
        height: 630,
        fonts: [
            {
                name: "Alexandria-Light",
                data: alexandriaLight,
                weight: 400,
            },
            {
                name: "Alexandria-Regular",
                data: alexandriaRegular,
                weight: 500,
            },
            {
                name: "Alexandria-Medium",
                data: alexandriaSemibold,
                weight: 600,
            },
            {
                name: "Alexandria-Bold",
                data: alexandriaBold,
                weight: 800,
            },
            ],
    },
    );
} catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
    status: 500,
    });
}
}