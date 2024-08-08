'use client'

import Zoom from './zoom'; // Adjust path as necessary

export default function ImageZoom({ srcLight, srcDark, alt, animationDuration }) {
    return (
        <div className="relative flex justify-center items-center h-[700px] border border-neutral-200 dark:border-neutral-800 rounded-lg z-50">
            <div className="relative w-full h-full bg-white dark:bg-neutral-900 flex justify-center items-center rounded-lg">
                <Zoom
                    srcLight={srcLight} // Use the prop for light mode image path
                    srcDark={srcDark}  // Use the prop for dark mode image path
                    alt={alt} // Use the prop for alt text
                    animationDuration={animationDuration} // Use the prop for animation duration
                    layout="fill"
                    style={{ objectFit: "contain" }} 
                />
            </div>
        </div>
    );
}
