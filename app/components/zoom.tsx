import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface ZoomProps {
    zoomPercentage?: number;
    backgroundOpacity?: number;
    backgroundColor?: string;
    animationDuration?: number;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    src: string;
    alt: string;
    width?: number; // Add width and height as optional props
    height?: number;
    [key: string]: any;
}

const Zoom: React.FC<ZoomProps> = (props) => {
    const { 
        zoomPercentage = 90, 
        backgroundOpacity = 1, 
        backgroundColor = "rgba(0, 0, 0, 0.2)", 
        animationDuration = 300,
        layout = 'fill',
        width, // Destructure width and height
        height,
        ...imageProps 
    } = props;

    if (zoomPercentage === undefined) {
        throw new Error("Zoom percentage cannot be undefined!");
    }
    if (zoomPercentage < 1 || zoomPercentage > 100) {
        throw new Error("Zoom percentage must be between 1 and 100");
    }
    if (backgroundOpacity < 0 || backgroundOpacity > 1) {
        throw new Error("Background opacity must be between 0 and 1");
    }

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [clicked, setClicked] = useState(false);

    const toggleZoom = () => {
        if (!containerRef.current) return;

        if (clicked) {
            // Zoom out
            containerRef.current.style.transform = "scale(1)";
            setClicked(false);
        } else {
            // Zoom in
            const containerRect = containerRef.current.getBoundingClientRect();
            const clientHeight = containerRect.height;
            const clientWidth = containerRect.width;
            const wPrim = (window.innerWidth - containerRect.width) / 2;
            const hPrim = (window.innerHeight - containerRect.height) / 2;
            const cL = containerRect.left;
            const cT = containerRect.top;
            const zoomPerc = zoomPercentage / 100;

            const scale = ((window.innerHeight * zoomPerc) / clientHeight) * clientWidth >= window.innerWidth
                ? (window.innerWidth * zoomPerc) / clientWidth
                : (window.innerHeight * zoomPerc) / clientHeight;

            containerRef.current.style.transform = `translate(${wPrim - cL}px, ${hPrim - cT}px) scale(${scale})`;
            setClicked(true);
        }
    };

    const closeWrapper = () => {
        if (!containerRef.current) return;
        containerRef.current.style.transform = "scale(1)";
        setClicked(false);
    };

    const handleScroll = () => {
        if (clicked) closeWrapper();
    };

    useEffect(() => {
        // Add scroll event listener when zoom is active
        if (clicked) {
            window.addEventListener("scroll", handleScroll);
        }
        return () => {
            // Clean up the event listener on unmount or when zoom is not active
            window.removeEventListener("scroll", handleScroll);
        };
    }, [clicked]);

    const overlayStyle: React.CSSProperties = {
        backgroundColor: backgroundColor,
        opacity: backgroundOpacity,
        position: "fixed",
        zIndex: 100,
        top: -2000,
        left: -2000,
        width: "1000vw",
        height: "1000vh",
        transition: `opacity ${animationDuration}ms ease, background-color ${animationDuration}ms ease`,
        pointerEvents: clicked ? 'auto' : 'none', // Ensures clicks only go through when overlay is visible
        cursor: clicked ? 'zoom-out' : 'auto', // Change cursor style based on state
    };

    const containerStyle: React.CSSProperties = {
        position: "relative",
        transition: `transform ${animationDuration}ms`,
        display: layout === "fixed" ? "inline-block" : "block",
        width: layout === "fixed" ? "max-content" : "100%",
        height: layout === "fixed" ? "max-content" : "100%",
        zIndex: clicked ? 100 : 0,
        overflow: "hidden",
        backgroundColor: clicked ? "#fff" : "transparent",
        border: clicked ? "0.5px solid #e5e5e5" : "transparent",
        borderRadius: clicked ? "4px" : "0",
        cursor: clicked ? 'zoom-out' : 'zoom-in', // Change cursor style based on state
    };

    return (
        <>
            <div
                style={{ ...overlayStyle, opacity: clicked ? backgroundOpacity : 0 }}
                onClick={closeWrapper}
            />
            <div
                style={containerStyle}
                ref={containerRef}
                onClick={toggleZoom}
            >
                <Image 
                    layout={layout}
                    width={width} // Pass width and height
                    height={height}
                    {...imageProps}
                />
            </div>
        </>
    );
};

export default Zoom;
