import Image from "next/image";
import Link from "next/link";
import { About } from "@/lib/types";
import styles from '@/styles/styles.module.css'

export default function Hero({profile}:{profile:About}){
    return (
        <article className={`flex items-center justify-center layout bg-white/50 p-6 rounded-xl shadow-xl sm:shadow-2xl dark:bg-black/30 dark:shadow-lime-700 ${styles.handDrawnBorderHero}`}>
            <div className="w-full sm:w-8/12 sm:pr-8">
                <h2>
                Yoo!
                </h2>
                <h1
                className='mt-1 text-[32px] sm:text-6xl font-gochi font-medium'
                >
                My name is <span className={styles.highlight}>Amri</span>
                </h1>
                <p className='mt-4 max-w-4xl md:mt-6'>
                {profile.headline}
                </p>
                <div
                className='mt-8 flex flex-wrap mx-auto gap-4 justify-center lg:justify-start'
                >
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="btn-primary"
                    ><Link href='/blog/'>Explore the blog</Link></button>
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="btn-secondary"
                    ><Link href='/about'>Get to know me</Link></button>
                </div>
            </div>
            <Image 
                alt={profile.title} 
                width='500'
                height='500'
                src={profile.image.url}
                blurDataURL={profile.blurDataURL} 
                placeholder='blur' 
                className={`hidden sm:block profile-image ${styles.handDrawnBorderImage}`}/>
        </article>
    )
}  