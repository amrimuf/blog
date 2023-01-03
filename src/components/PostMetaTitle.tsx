import Link from 'next/link';
import moment from 'moment';
import styles from '../styles/styles.module.css'

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
        <div className={` ${center ? 'capitalize' : `text-neutral-700 dark:text-neutral-700 text-lg bg-lime-400 absolute top-5 rotate-3 right-5 px-2 ${styles.paperShadow}`}`}>
          {category}
        </div>
        <span className='text-lime-500 font-extrabold'>{featured ? <span>&#10008;</span> : <span>&#10007;</span>}</span>
        <p>{dateMoment}</p>
      </div>
      <h1 className={`mt-4 ${center ? 'large-title' : 'small-title'}`}>
        {title}
      </h1>
    </div>
  );
}