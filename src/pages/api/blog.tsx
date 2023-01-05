import { alexandriaFontLoader } from '@/lib/fontLoader';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
    runtime: "experimental-edge"
}

export default async function blogHandler(req: NextRequest) {
    try {
    const { searchParams } = new URL(req.url);

    const siteName = searchParams.get('siteName');
    const templateTitle = searchParams.get('templateTitle');
    const banner = searchParams.get('banner') ?? 'https://amri.tech/assets/logo.jpg';
    
    const alexandriaRegular = await alexandriaFontLoader("Regular");
    const alexandriaLight = await alexandriaFontLoader("Light");
    const alexandriaSemibold = await alexandriaFontLoader("SemiBold");
    const alexandriaBold = await alexandriaFontLoader("Bold");

    return new ImageResponse(
    (
        <div tw='w-full h-full flex py-24 px-18 items-center justify-center bg-neutral-900'>
            <div tw='flex flex-col justify-between h-full w-6/12'>
                <h1 tw='text-5xl leading-tight text-neutral-100' style={{ fontFamily: "Alexandria-Bold" }}>{templateTitle}</h1>
                <p tw='text-xl text-neutral-300' style={{ fontFamily: "Alexandria-Light"}}>{siteName}/blog</p>
            </div>
            <div tw='flex h-full'>
                <img src={banner} tw="ml-40 w-96 h-full rounded-xl" style={{ objectFit:'cover' }}></img>
            </div>
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