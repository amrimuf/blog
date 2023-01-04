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

    const logo = searchParams.get('logo') ?? 'https://amri.tech/favicon/large-og.png';
    const templateTitle = searchParams.get('templateTitle');
    const siteName = searchParams.get('siteName');
    const description = searchParams.get('description');

    const alexandriaRegular = await alexandriaFontLoader("Regular");
    const alexandriaLight = await alexandriaFontLoader("Light");
    const alexandriaSemibold = await alexandriaFontLoader("SemiBold");
    const alexandriaBold = await alexandriaFontLoader("Bold");

    return new ImageResponse(
    (
        <div tw='flex'>
            <div>HMMMM?</div>
            <div>{templateTitle}</div>
            <div>{siteName}</div>
            <img src={logo} tw='h-24'></img>
            {/* <div>{description}</div> */}
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