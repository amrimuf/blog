import Link from "next/link"
import Seo from "../components/Seo"
import { MdOutlineSentimentVeryDissatisfied } from 'react-icons/md';

export default function Custom404() {
    return (
    <>
        <Seo templateTitle='Not Found' />
        
        <main>
        <section className='bg-black'>
            <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-white'>
            <MdOutlineSentimentVeryDissatisfied
                size={60}
                className='text-lime-500'
            />
            <h1 className='text-2xl font-bold lg:text-5xl mt-6'>Page Not Found</h1>
            <Link className='mt-4 hover:underline underline-offset-8 decoration-lime-500' href='/'>
                Back to Home
            </Link>
            </div>
        </section>
        </main>
    </>
    )
    
}