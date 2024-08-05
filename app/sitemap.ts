import { getBlogPosts } from 'app/about/utils'

export const baseUrl = 'https://portfolio-about-starter.vercel.app'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/about/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/about'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
