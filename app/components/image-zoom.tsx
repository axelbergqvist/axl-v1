'use client'

import Zoom from './zoom'; // Adjust path as necessary

export default function ImageZoom() {
    return (
        <div className="relative flex justify-center items-center h-[500px] bg-white border border-neutral-200 rounded-lg">
            <Zoom 
                src="/worktest3.png" // Ensure the image path is correct
                alt="Image zoom"
                animationDuration={300} // Set the animation duration here
                layout="fill"
                style={{ objectFit: "contain" }} 
            />
        </div>
    );
}
