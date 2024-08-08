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

const Zoom: React.FC<ZoomProps> = ({
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
}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const isZoomedIn = useRef(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
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
                closeZoom();
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
            closeZoom();
        } else {
            const { height, width, left, top } = containerRef.current.getBoundingClientRect();
            const zoomScale = zoomPercentage / 105;
            const scale = Math.min(
                (window.innerWidth * zoomScale) / width,
                (window.innerHeight * zoomScale) / height
            );

            containerRef.current.style.transition = `transform ${animationDuration}ms`;
            containerRef.current.style.transform = `translate(${(window.innerWidth - width) / 2 - left}px, ${(
                window.innerHeight - height
            ) / 2 - top}px) scale(${scale})`;

            setClicked(true);
            isZoomedIn.current = true;
            document.body.style.overflow = 'hidden'; 

            if (overlayRef.current) {
                overlayRef.current.style.transition = `opacity ${animationDuration}ms ease-in-out`;
                overlayRef.current.style.opacity = `${backgroundOpacity}`;
            }
        }
    };

    const closeZoom = () => {
        if (!containerRef.current || !overlayRef.current) return;

        containerRef.current.style.transition = `transform ${animationDuration}ms`;
        containerRef.current.style.transform = "scale(1)";

        overlayRef.current.style.transition = `opacity ${animationDuration}ms ease-in-out`;
        overlayRef.current.style.opacity = '0';

        overlayRef.current.addEventListener('transitionend', () => {
            setClicked(false);
            isZoomedIn.current = false;
            document.body.style.overflow = ''; 
        }, { once: true });
    };

    const overlayStyle: React.CSSProperties = {
        backgroundColor,
        opacity: clicked ? backgroundOpacity : 0,
        position: "fixed",
        zIndex: 10,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
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
        zIndex: clicked ? 10 : 100,
        overflow: "hidden",
        backgroundColor: clicked ? (isDarkMode ? "#171717" : "#fff") : "transparent",
        border: clicked ? `0.5px solid ${isDarkMode ? "#262626" : "#e5e5e5"}` : "transparent",
        borderRadius: clicked ? "8px" : "0",
        cursor: clicked ? 'zoom-out' : 'zoom-in',
    };

    return (
        <>
            <div
                style={overlayStyle}
                ref={overlayRef}
                onClick={closeZoom}
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
