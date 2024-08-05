'use client'

import Zoom from './zoom'; // Correct path to Zoom component

export default function ImageZoom() {
    return (
        <div className="flex-1 h-[500px] bg-white relative rounded-lg border-1 border-neutral-200">
            <Zoom 
                src="/worktest3.png" // Ensure the image path is correct
                alt="hej" 
                fill 
                style={{ objectFit: "contain" }} 
                animationDuration={300} // Set the animation duration here
            />
        </div>
    );
}
