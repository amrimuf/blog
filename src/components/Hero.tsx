import Image from "next/image";
import Link from "next/link";

export default function Hero({...about}){
    const newImageSrc = about.image.url.toString().replace(/[()]/g, '');
    const convertImage = (w:number, h:number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
        <linearGradient id="g">
            <stop stop-color="#333" offset="20%" />
            <stop stop-color="#222" offset="50%" />
            <stop stop-color="#333" offset="70%" />
        </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#333" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
        </svg>`;

        const toBase64 = (str:string) =>
        typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str);
    return (
        <article className='flex items-center justify-between layout mb-8'>
            <div className="sm:pr-8">
                <h2 className='text-2xl font-bold text-gray-900 sm:text-5xl dark:text-white' data-fade='1'>
                Hi!
                </h2>
                <h1
                className='mt-1 text-2xl sm:text-6xl'
                data-fade='2'
                >
                My name is <span className="underline underline-offset-4 sm:underline-offset-8 decoration-2 decoration-sky-500 decoration-wavy">Amri</span>
                </h1>
                <p className='mt-4 max-w-4xl text-gray-700 dark:text-gray-200 md:mt-6'>
                {about.headline}
                </p>
                <div
                data-fade='5'
                className='mt-8 flex flex-wrap mx-auto gap-4 md:!text-lg justify-center lg:justify-start'
                >
                    {/* <Link href='/blog'>Read the blog</Link> */}
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    ><Link href='/blog'>Read the blog</Link></button>
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    ><Link href='/about'>Learn more about me</Link></button>
                </div>
            </div>
            <Image alt={about.title} width={250}height={250} src={newImageSrc}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(convertImage(700, 475))}`} placeholder='blur' className="hidden sm:block border-2 rounded-lg border-sky-500 p-3"/>
        </article>
    )
}  