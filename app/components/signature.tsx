'use client';
import { motion } from 'framer-motion';
import { FC, SVGProps } from 'react';

interface SignatureProps extends SVGProps<SVGSVGElement> {
  animate?: boolean;
}

const Signature: FC<SignatureProps> = ({ animate = false, ...props }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 96 52"
    {...props}
    initial={{ opacity: 0 }}
    animate={{ opacity: animate ? 1 : 0 }}
    transition={{ duration: 1 }}
  >
    <motion.path
      fill="transparent"
      stroke="var(--token-7ebf79bf-4655-44c5-8fe0-20ee3a91fd50, rgb(139, 139, 139))"
      strokeDasharray="0.99px 1px"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M1.338 50.261c4.726-1.46 9.542-5.64 13.364-8.52 11.532-8.692 22.813-18.418 32.577-29.028 2.479-2.694 4.766-5.543 6.497-8.763.495-.92 1.733-3.286.709-3.044-3.523.831-8.669 5.728-11.055 7.637-5.81 4.653-11.314 9.6-16.227 15.184-3.448 3.919-16.051 17.674-8.437 23.674 3.964 3.123 11.703 1.891 16.197 1.155 8.845-1.446 17.794-4.473 25.988-8.032.734-.319 6.687-3.84 5.42-2.495-1.304 1.383-3.724 3.983-3.511 6.085.303 2.994 14.069-2.687 15.95-1.4.515.353-.305 1.648.37 1.948 1.307.582 3.555-.792 4.619-1.4 3.366-1.921 7.35-1.383 11.208-1.764"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: animate ? 1 : 0 }}
      transition={{ duration: 1 }}
    />
  </motion.svg>
);

export default Signature;
