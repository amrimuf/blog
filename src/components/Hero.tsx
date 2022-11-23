import Image from "next/image";
import Link from "next/link";

export default function Hero({...about}){
    return (
        <article className='flex items-center justify-between layout mb-8 bg-white p-6 rounded-xl shadow-xl sm:shadow-2xl dark:bg-black dark:shadow-lime-700'>
            <div className="sm:pr-8">
                <h2 className='text-2xl font-bold text-gray-900 sm:text-5xl dark:text-white' data-fade='1'>
                Hi!
                </h2>
                <h1
                className='mt-1 text-2xl sm:text-6xl'
                data-fade='2'
                >
                My name is <span className="underline underline-offset-4 sm:underline-offset-8 decoration-2 decoration-lime-500 decoration-wavy">Amri</span>
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
                        className="inline-block px-6 py-2.5 bg-lime-500 text-white dark:text-black font-medium text-xs leading-tight uppercase rounded-full shadow-md dark:shadow-lime-700 hover:scale-[1.02] hover:shadow-lg transition duration-150 ease-in-out"
                    ><Link href='/blog'>Read the blog</Link></button>
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block px-6 py-2.5 bg-lime-500 text-white dark:text-black font-medium text-xs leading-tight uppercase rounded-full shadow-md dark:shadow-lime-700 hover:scale-[1.02] hover:shadow-lg transition duration-150 ease-in-out"
                    ><Link href='/about'>Learn more about me</Link></button>
                </div>
            </div>
            <Image 
                alt={about.title} 
                width={200}
                height={200} 
                src={about.image.url}
                blurDataURL={`/_next/image?url=${about.image.url}&w=16&q=1`} placeholder='blur' 
                className="hidden sm:block object-cover sm:h-80 sm:w-60 border-2 rounded-lg border border-lime-500 sm:shadow-md dark:shadow-lime-700 p-0 sm:p-3"/>
        </article>
    )
}  