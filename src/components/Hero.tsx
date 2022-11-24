import Image from "next/image";
import Link from "next/link";
import styles from '../styles/styles.module.css'

export default function Hero({...about}){
    return (
        <article className={`flex items-center justify-between layout mb-8 bg-white/50 p-6 rounded-xl shadow-xl sm:shadow-2xl dark:bg-black/30 dark:shadow-lime-700 -z-50 ${styles.handDrawnBorderHero}`}>
            <div className="sm:pr-8 text-gray-900 dark:text-gray-100">
                <h2 className='text-2xl font-bold sm:text-5xl ' data-fade='1'>
                Hi!
                </h2>
                <h1
                className='mt-1 text-2xl sm:text-6xl font-gochi'
                data-fade='2'
                >
                My name is <span className={styles.highlight}>Amri</span>
                </h1>
                <p className='mt-4 max-w-4xl text-gray-600 dark:text-gray-400 md:mt-6'>
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
                        className="inline-block px-6 py-2.5 bg-lime-500 dark:text-gray-900 text-gray-100 font-medium text-xs leading-tight uppercase rounded-full shadow-md dark:shadow-lime-700 hover:scale-[1.02] hover:shadow-lg transition duration-150 ease-in-out"
                    ><Link href='/blog'>Read the blog</Link></button>
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block px-6 py-2.5 bg-lime-500 dark:text-gray-900 text-gray-100 font-medium text-xs leading-tight uppercase rounded-full shadow-md dark:shadow-lime-700 hover:scale-[1.02] hover:shadow-lg transition duration-150 ease-in-out"
                    ><Link href='/about'>Learn more about me</Link></button>
                </div>
            </div>
            <Image 
                alt={about.title} 
                width={200}
                height={200} 
                src={about.image.url}
                blurDataURL={`/_next/image?url=${about.image.url}&w=16&q=1`} placeholder='blur' 
                className={`hidden sm:block object-cover sm:h-80 sm:w-60 sm:shadow-md dark:shadow-lime-700 ${styles.handDrawnBorderImage}`}/>
        </article>
    )
}  