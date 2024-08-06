import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface ZoomProps {
    zoomPercentage?: number;
    backgroundOpacity?: number;
    backgroundColor?: string;
    animationDuration?: number;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    srcLight: string;
    srcDark: string;
    alt: string;
    width?: number;
    height?: number;
    [key: string]: any;
}

const Zoom: React.FC<ZoomProps> = (props) => {
    const { 
        zoomPercentage = 95, 
        backgroundOpacity = 1, 
        backgroundColor = "rgba(0, 0, 0, 0.2)", 
        animationDuration = 200,
        layout = 'fill',
        width,
        height,
        srcLight,
        srcDark,
        alt,
        ...imageProps 
    } = props;

    const [isDarkMode, setIsDarkMode] = useState(false);
    const isZoomedIn = useRef(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node) &&
                overlayRef.current &&
                !overlayRef.current.contains(event.target as Node)
            ) {
                closeWrapper();
            }
        };

        if (clicked) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [clicked]);

    const toggleZoom = () => {
        if (!containerRef.current) return;

        if (clicked) {
            closeWrapper();
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

            containerRef.current.style.transition = `transform ${animationDuration}ms`;
            containerRef.current.style.transform = `translate(${wPrim - cL}px, ${hPrim - cT}px) scale(${scale})`;
            setClicked(true);
            isZoomedIn.current = true;
            document.body.style.overflow = 'hidden'; // Disable scrolling

            if (overlayRef.current) {
                overlayRef.current.style.transition = `opacity ${animationDuration}ms ease-in-out`;
                overlayRef.current.style.opacity = `${backgroundOpacity}`;
            }
        }
    };

    const closeWrapper = () => {
        if (!containerRef.current || !overlayRef.current) return;

        // Start zoom-out and fade-out
        containerRef.current.style.transition = `transform ${animationDuration}ms`;
        containerRef.current.style.transform = "scale(1)";

        // Fade-out overlay opacity
        overlayRef.current.style.transition = `opacity ${animationDuration}ms ease-in-out`;
        overlayRef.current.style.opacity = '0';

        // Handle end of animation
        overlayRef.current.addEventListener('transitionend', () => {
            setClicked(false);
            isZoomedIn.current = false;
            document.body.style.overflow = ''; // Enable scrolling
        }, { once: true });
    };

    const overlayStyle: React.CSSProperties = {
        backgroundColor: backgroundColor,
        opacity: clicked ? backgroundOpacity : 0,
        position: "fixed",
        zIndex: 10,
        top: -150,
        left: -2000,
        width: "1000vw",
        height: "150vh",
        transition: `opacity ${animationDuration}ms ease-in-out`,
        pointerEvents: clicked ? 'auto' : 'none',
        cursor: clicked ? 'zoom-out' : 'auto',
    };

    const containerStyle: React.CSSProperties = {
        position: "relative",
        transition: `transform ${animationDuration}ms`,
        display: layout === "fixed" ? "inline-block" : "block",
        width: layout === "fixed" ? "max-content" : "100%",
        height: layout === "fixed" ? "max-content" : "100%",
        zIndex: clicked ? 20 : 0,
        overflow: "hidden",
        backgroundColor: clicked 
            ? (isDarkMode ? "#171717" : "#fff") 
            : "transparent",
        border: clicked 
            ? `0.5px solid ${isDarkMode ? "#262626" : "#e5e5e5"}` 
            : "transparent",
        borderRadius: clicked ? "6px" : "0",
        cursor: clicked ? 'zoom-out' : 'zoom-in',
    };

    return (
        <>
            <div
                style={overlayStyle}
                ref={overlayRef}
                onClick={closeWrapper}
            />
            <div
                style={containerStyle}
                ref={containerRef}
                onClick={toggleZoom}
            >
                <Image 
                    src={isDarkMode ? srcDark : srcLight}
                    layout={layout}
                    width={width}
                    height={height}
                    alt={alt}
                    {...imageProps}
                />
            </div>
        </>
    );
};

export default Zoom;
