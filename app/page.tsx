import { BlogPosts } from 'app/components/posts'
import Image from 'next/image'
import profilepic from '../public/profilepic.png'
import ImageZoom from 'app/components/image-zoom'

export default function Page() {  
  return (
    <section className="p-4">
      <Image className="mb-6 rounded-full h-16 w-16" src={profilepic} alt="Picture of me" />
      <p className="text-sm mb-0.5">Axel Bergqvist</p>
      <p className="text-sm mb-6 text-neutral-500 dark:text-neutral-400">Stockholm, Sweden</p> 
      <h1 className="text-sm mb-32">
        {`I’m a design engineer based in Vancouver, BC. I’m passionate about building delightful user interfaces that feel intuitive for everyone.`}
      </h1>
      <ImageZoom />
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
