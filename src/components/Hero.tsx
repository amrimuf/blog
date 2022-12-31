import Image from "next/image";
import Link from "next/link";
import styles from '../styles/styles.module.css'

export default function Hero({...profile}){
    return (
        <article className={`flex items-center justify-center layout mb-8 bg-white/50 p-6 rounded-xl shadow-xl sm:shadow-2xl dark:bg-black/30 dark:shadow-lime-700 ${styles.handDrawnBorderHero}`}>
            <div className="w-full sm:w-8/12 sm:pr-8 text-neutral-900 dark:text-neutral-100">
                <h2 className='text-3xl font-bold sm:text-5xl ' data-fade='1'>
                Hi!
                </h2>
                <h1
                className='mt-1 text-[32px] sm:text-6xl font-gochi'
                data-fade='2'
                >
                My name is <span className={styles.highlight}>Amri</span>
                </h1>
                <p className='mt-4 max-w-4xl text-neutral-600 dark:text-neutral-400 md:mt-6'>
                {profile.headline}
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
                        className="btn-primary"
                    ><Link href='/blog/'>Read the blog</Link></button>
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="btn-primary"
                    ><Link href='/about'>Learn more about me</Link></button>
                </div>
            </div>
            <Image 
                alt={profile.title} 
                width={200}
                height={200} 
                src={profile.image.url}
                blurDataURL={`/_next/image?url=${profile.image.url}&w=16&q=1`} placeholder='blur' 
                className={`hidden sm:block profile-image ${styles.handDrawnBorderImage}`}/>
        </article>
    )
}  