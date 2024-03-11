import moment from 'moment';
import styles from '@/styles/styles.module.css'
import { PostMetaTitleType } from '@/lib/types'
import { useEffect, useState } from 'react';

export default function PostMetaTitle({ ...postMeta }: PostMetaTitleType) {
  const [wordCount, setWordCount] = useState<number>(0);
  const [readTime, setReadTime] = useState<number>(0);

useEffect(() => {
    const content = postMeta.content || []

    const allText = content.reduce((acc, curr) => acc + curr.children.map(child => child.text).join(''), '');
    const words = allText.split(/\s+/).filter(word => word !== '');

    setWordCount(words.length);

    const averageReadingSpeed = 200; 
    const estimatedReadTime = Math.ceil(words.length / averageReadingSpeed);
    setReadTime(estimatedReadTime);

    }, [postMeta.content]);

  return (
      <div className={`${postMeta.center ? 'flex flex-col items-center mb-6' : ''}`}>
        <div className="flex items-center gap-4" data-fade='0'>
          <div className={` ${postMeta.center ? 'capitalize' : `text-neutral-700 dark:text-neutral-700 text-lg bg-lime-400 absolute -top-40 rotate-3 right-0 px-2 ${styles.paperShadow}`}`}>
            {postMeta.category}
          </div>
          <span className='text-lime-500 font-extrabold'>{postMeta.featured ? <span>&#10008;</span> : <span>&#10007;</span>}</span>
          <p>{readTime} min read</p>
          <span className='text-lime-500 font-extrabold'>{postMeta.featured ? <span>&#10008;</span> : <span>&#10007;</span>}</span>
          <p><span className={postMeta.center ? 'italic' : 'hidden'}>Updated: </span>{moment(postMeta.date).format("MMM DD, YYYY")}</p>
        </div>
        {postMeta.center ? 
          <h1 className='m-4 text-center' data-fade='1'>{postMeta.title}</h1> :
          <h3 className='mt-4'>{postMeta.title}</h3>
        }
      </div>
  );
}