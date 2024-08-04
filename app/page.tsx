import { BlogPosts } from 'app/components/posts'
import { motion } from "framer-motion"; 

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
      
      <p className="mb-0.5">
        Axel Bergqvist
      </p>
      <p className="mb-6 text-neutral-500 dark:text-neutral-400">
        Stockholm, Sweden
      </p> 
      <h1 className="mb-32">
        {`I’m a design engineer based in Vancouver, BC. I’m passionate about building delightful user interfaces that feel intuitive for everyone.
        `}
      </h1>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
