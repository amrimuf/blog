import Link from 'next/link';
import moment from 'moment';

type PostMetaTitleType = {
  category: string;
  date: string;
  title: string;
  center?: boolean;
  slug:string;
};

export default function PostMetaTitle({ category, title, date, center, slug }: PostMetaTitleType) {
  const dateMoment = moment(date).format("DD MMM YYYY")
  return (
    <div className={`${center ? 'flex w-10/12 md:w-full flex-col items-center mb-6' : ''}`}>
      <div className="flex items-center text-black/60 space-x-4 dark:text-white/60">
        <div className="uppercase">
          {category}
        </div>
        <span>&bull;</span>
        <div>
          {dateMoment}
        </div>
      </div>
      <h2 className={`text-2xl mt-4 font-bold ${center ? 'sm:text-5xl text-center' : ''}`}>
        <Link href={`/${slug}`} legacyBehavior><a>{title}</a></Link>
      </h2>
    </div>
  );
}