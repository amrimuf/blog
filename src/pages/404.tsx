import Link from "next/link"
import Seo from "@/components/Seo"
import { IoPlanetSharp } from 'react-icons/io5';

export default function Custom404() {
    return (
        <section className='bg-black'>
            <Seo templateTitle='Not Found' />
        
            <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-white'>
            <IoPlanetSharp
                size={80}
                className='text-lime-500 animate-pulse -mb-4'
            />
            <h1 className='m-8 text-neutral-100'>Page Not Found</h1>
            <Link className='btn-secondary' href='/'>
                Back to Home
            </Link>
            </div>
        </section>
    )
    
}