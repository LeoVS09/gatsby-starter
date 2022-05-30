/** @jsxImportSource theme-ui */
import * as React from 'react';
import { Box, Image } from "theme-ui"
import { Link } from "gatsby"
import ItemTags from "@lekoarts/gatsby-theme-minimal-blog/src/components/item-tags"

type BlogListItemProps = {
  post: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    tags?: {
      name: string
      slug: string
    }[]
    banner?: {
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }
  }
  showTags?: boolean
}

const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => {
  const banner = post.banner?.childImageSharp?.resize?.src
  console.log('banner', post.banner?.childImageSharp, banner)
  return (
    <Box mb={4}>
      <div>
        {banner && <Image src={banner} /> }
      </div>
      <Link to={post.slug} sx={(t) => ({ ...t.styles?.a, fontSize: [1, 2, 3], color: `text` })}>
        {post.title}
      </Link>
      <p sx={{ color: `secondary`, mt: 1, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
        <time>{post.date}</time>
        {post.tags && showTags && (
          <React.Fragment>
            {` — `}
            <ItemTags tags={post.tags} />
          </React.Fragment>
        )}
      </p>
    </Box>
  )
}

export default BlogListItem
