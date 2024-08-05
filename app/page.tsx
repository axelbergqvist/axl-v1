import { BlogPosts } from 'app/components/posts'
import { motion } from "framer-motion"; 
import Image from 'next/image'
import profilepic from '../public/profilepic.png'
import Zoom from 'next-image-zoom';
import ImageZoom from 'app/components/image-zoom'
import Footer from 'app/components/footer'

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100
  },
  animate: {
    opacity: 1,
    y: 0,
  }
}

export default function Page() {
  return (
    <section>
      <Image className="mb-6 rounded-full h-16 w-16"src={profilepic} alt="Picture of me"></Image>
      <p className="text-sm	mb-0.5">
        Axel Bergqvist
      </p>
      <ImageZoom></ImageZoom>
      <p className="text-sm	mb-6 text-neutral-500 dark:text-neutral-400">
        Stockholm, Sweden
      </p> 
      <h1 className=" text-sm	mb-32">
        {`I’m a design engineer based in Vancouver, BC. I’m passionate about building delightful user interfaces that feel intuitive for everyone.
        `}
      </h1>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
