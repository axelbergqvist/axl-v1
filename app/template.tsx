"use client"
import { motion} from "framer-motion"

export default function Template ({
    children,
}:Readonly<{children:React.ReactNode}>){
    return (
    <motion.div
        initial = {{ y: 20, opacity: 0, filter: "blur(24px)",}}
        animate = {{y: 0, opacity: 1, filter: "blur(0px)", }}
        transition = {{ease:"easeInOut", duration: 0.5,
        }}
        
    >
        {children}
        </motion.div>
    );
}