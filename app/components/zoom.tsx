import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface ZoomProps {
    zoomPercentage?: number;
    backgroundOpacity?: number;
    backgroundColor?: string;
    animationDuration?: number;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    src: string;
    alt: string;
    [key: string]: any;
}

const Zoom: React.FC<ZoomProps> = (props) => {
    const { 
        zoomPercentage = 90, 
        backgroundOpacity = 0.8, 
        backgroundColor = "black", 
        animationDuration = 300,
        layout = 'fill',
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

    const handleImageZoom = () => {
        if (!containerRef.current || clicked) return;

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
        window.document.addEventListener("scroll", closeWrapper, { once: true });
        setClicked(true);
    };

    const closeWrapper = () => {
        if (!containerRef.current) return;
        containerRef.current.style.transform = "scale(1)";
        setClicked(false);
    };

    const styles: React.CSSProperties = {
        position: "relative",
        transition: `transform ${animationDuration}ms`,
        display: layout === "fixed" ? "inline-block" : "block",
        width: layout === "fixed" ? "max-content" : "100%",
        height: layout === "fixed" ? "max-content" : "100%",
        zIndex: clicked ? 50 : 0,
        overflow: "hidden",
        backgroundColor: clicked ? "#fff" : "transparent",
        border: clicked ? "0.5px solid #e5e5e5" : "transparent",
        borderRadius: clicked ? "4px" : "0"
    };

    return (
        <>
            {clicked && (
                <div
                    style={{
                        backgroundColor,
                        opacity: backgroundOpacity,
                        position: "fixed",
                        zIndex: 40,
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)"
                    }}
                    onClick={closeWrapper}
                />
            )}
            <div
                style={styles}
                ref={containerRef}
                onClick={handleImageZoom}
            >
                <Image {...imageProps} />
            </div>
        </>
    );
};

export default Zoom;
