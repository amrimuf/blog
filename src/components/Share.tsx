import React, { useState } from 'react';
import { BsTwitterX, BsFacebook, BsLinkedin, BsLink45Deg } from "react-icons/bs";
import { PiShareFatFill } from 'react-icons/pi'
import { Post } from "@/lib/types";
import { deploymentURL } from '@/constant/env';

const ShareButton: React.FC<{ post: Post }> = ({ post }) => {
    const [isOpen, setIsOpen] = useState(false);
    const slug = post.slug

    const handleToggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleCopyLink = () => {
        const postLink = `${deploymentURL}/blog/${slug}`;
        navigator.clipboard.writeText(postLink);
        setIsOpen(false);
    };

    const defaultMessage = `Hey, just wrapped up this article on ${post.title} by @amrimuf! \n\n`;

    const handleShareToFacebook = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${deploymentURL}/blog/${slug}`)}&quote=${encodeURIComponent(defaultMessage)}`;
        window.open(shareUrl, '_blank');
        setIsOpen(false);
    };

    const handleShareToX = () => {
        const shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(`${deploymentURL}/blog/${slug}`)}&text=${encodeURIComponent(defaultMessage)}`;
        window.open(shareUrl, '_blank');
        setIsOpen(false);
    };
    
    const handleShareToLinkedIn = () => {
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${deploymentURL}/blog/${slug}`)}&title=${encodeURIComponent(defaultMessage)}`;
        window.open(shareUrl, '_blank');
        setIsOpen(false);
    };

    const shareOptions = [
        { label: 'Copy Link', icon: <BsLink45Deg />, onClick: handleCopyLink },
        { label: 'Share to Facebook', icon: <BsFacebook />, onClick: handleShareToFacebook },
        { label: 'Share to X', icon: <BsTwitterX />, onClick: handleShareToX },
        { label: 'Share to Linkedin', icon: <BsLinkedin />, onClick: handleShareToLinkedIn }
    ];
    
    return (
        <div className="relative flex justify-end">
            {isOpen && (
            <div className="absolute z-10 right-0 top-0 mt-14 bg-white border border-lime-500 rounded shadow-md dark:bg-black">
                {shareOptions.map(option => (
                <button key={option.label} onClick={option.onClick} className="block w-full text-left px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 border-lime-500 border-t flex items-center">
                {option.icon} <span className="ml-2">{option.label}</span>
                </button>
                ))}
            </div>
            )}
            <button onClick={handleToggleDropdown} className="text-base btn-primary flex items-center font-semibold">
                Share this post <span className="ml-2"></span><PiShareFatFill />
            </button>
        </div>        
    );
};

export default ShareButton;
