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
      <div className="flex items-center text-neutral-600 gap-4 dark:text-neutral-400">
        <div className="lowercase">
          {category}
        </div>
        <span className='text-lime-500 text-xl font-extrabold'>{featured ? <p>&#9885;</p> : <p className='text-[30px]'>&bull;</p>}</span>
        <div>
          {dateMoment}
        </div>
      </div>
      <h2 className={`text-2xl mt-4 font-bold text-neutral-900 dark:text-neutral-100 ${center ? 'sm:text-5xl text-center' : ''}`}>
        <Link href={`/${slug}`} legacyBehavior><a>{title}</a></Link>
      </h2>
    </div>
  );
}