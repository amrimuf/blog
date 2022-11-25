import Link from 'next/link';
import moment from 'moment';

type PostMetaTitleType = {
  category: string;
  date: string;
  title: string;
  center?: boolean;
  slug:string;
  featured:boolean;
};

export default function PostMetaTitle({ category, title, date, center, slug, featured }: PostMetaTitleType) {
  const dateMoment = moment(date).format("MMM DD, YYYY")
  return (
    <div className={`${center ? 'flex w-10/12 md:w-full flex-col items-center mb-6' : ''}`}>
      <div className="flex items-center gap-4">
        <div className={`text-neutral-700 ${center ? 'text-neutral-600 dark:text-neutral-400 capitalize' : 'text-neutral-700 text-lg bg-lime-400 absolute top-5 rotate-3 right-5 px-2'}`}>
          {category}
        </div>
        <span className='text-lime-500 font-extrabold'>{featured ? <p>&#9670;</p> : <p>&#9671;</p>}</span>
        <div className='text-neutral-600 dark:text-neutral-400'>
          {dateMoment}
        </div>
      </div>
      <h2 className={`text-2xl mt-4 font-bold text-neutral-900 dark:text-neutral-100 ${center ? 'sm:text-5xl text-center' : ''}`}>
        <Link href={`/${slug}`} legacyBehavior><a>{title}</a></Link>
      </h2>
    </div>
  );
}