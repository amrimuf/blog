import moment from 'moment';
import styles from '../styles/styles.module.css'
import { PostMetaTitleType } from '../lib/types'

export default function PostMetaTitle({ ...postMeta }: PostMetaTitleType) {
  const dateMoment = moment(postMeta.date).format("MMM DD, YYYY")
  return (
    <div className={`${postMeta.center ? 'flex w-10/12 md:w-full flex-col items-center mb-6' : ''}`}>
      <div className="flex items-center gap-4">
        <div className={` ${postMeta.center ? 'capitalize' : `text-neutral-700 dark:text-neutral-700 text-lg bg-lime-400 absolute top-5 rotate-3 right-5 px-2 ${styles.paperShadow}`}`}>
          {postMeta.category}
        </div>
        <span className='text-lime-500 font-extrabold'>{postMeta.featured ? <span>&#10008;</span> : <span>&#10007;</span>}</span>
        <p>{dateMoment}</p>
      </div>
      <h1 className={`mt-4 ${postMeta.center ? 'large-title' : 'small-title'}`}>
        {postMeta.title}
      </h1>
    </div>
  );
}