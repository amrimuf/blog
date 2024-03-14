import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/styles.module.css'
import { About } from "@/lib/types";

export default function Hero({profile}:{profile:About}){
    return (
        <section 
        className={`flex items-center justify-center layout bg-white/50 p-6 shadow-md dark:bg-black/30 dark:shadow-lime-700 md:rotate-[0.2deg] ${styles.handDrawnBorderHero}`} 
        data-fade='0'
        >
            <div className="w-full sm:w-8/12 sm:pr-8">
                <h1 data-fade='0'>Yoo!</h1>
                <h1
                className='mt-1 text-[32px] sm:text-6xl font-gochi font-medium'
                data-fade='1'
                >
                    My name is <span className={styles.highlight}>Amri</span>
                </h1>
                <p className='mt-4 max-w-4xl md:mt-6' data-fade='2'>
                    {profile.headline}
                </p>
                <div
                className='mt-8 flex flex-wrap mx-auto gap-4 justify-center lg:justify-start' 
                data-fade='3'
                >
                    <Link href='/blog/'>
                        <button className="btn-primary">
                            Explore the blog
                        </button>
                    </Link>
                    <Link href='/about'>
                        <button className="btn-secondary">
                            Get to know me
                        </button>
                    </Link>
                </div>
            </div>
            <Image 
                alt='Profile'
                width={profile.image.width}
                height={profile.image.height}
                src={profile.image.url}
                blurDataURL={profile.blurDataURL} 
                placeholder='blur' 
                className={`hidden sm:inline profile-image ${styles.handDrawnBorderImage}`}
                data-fade='2'
                />
        </section>
    )
}  