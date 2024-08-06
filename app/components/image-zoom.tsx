'use client'

import Zoom from './zoom'; // Adjust path as necessary

export default function ImageZoom() {
    return (
        <div className="relative flex justify-center items-center h-[500px] border border-neutral-200 dark:border-neutral-800 rounded-lg z-50">
            <div className="relative w-full h-full bg-white dark:bg-neutral-900 flex justify-center items-center rounded-lg">
                <Zoom
                    srcLight="/worktest3-light.png" // Ensure the light mode image path is correct
                    srcDark="/worktest3-dark.png"  // Ensure the dark mode image path is correct
                    alt="Image zoom"
                    animationDuration={250} // Set the animation duration here
                    layout="fill"
                    style={{ objectFit: "contain" }} 
                />
            </div>
        </div>
    );
}