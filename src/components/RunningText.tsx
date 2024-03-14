import React from 'react';
import Marquee from 'react-fast-marquee';
import { SiAmazon, SiApple, SiGoogle, SiNetflix, SiX } from 'react-icons/si';

const RunningText = () => {
    return (
    <Marquee direction="left" speed={30} autoFill={true} className='md:mt-6'>
        <span className="inline-flex items-center space-x-4 mr-4 md:space-x-8 md:mr-8">
            <span className='btn-social'><SiX/></span>
            <span className='btn-social'><SiAmazon/></span>
            <span className='btn-social'><SiApple/></span>
            <span className='btn-social'><SiNetflix/></span>
            <span className='btn-social'><SiGoogle/></span>
        </span>
    </Marquee>
    );
};

export default RunningText;
