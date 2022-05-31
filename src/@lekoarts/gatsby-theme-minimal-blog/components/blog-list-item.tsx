/** @jsxImportSource theme-ui */
import * as React from 'react';
import { Box, Image, Heading, Divider } from "theme-ui"
import { Link, navigate } from "gatsby"
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
  const goToPost = React.useCallback(() => navigate(post.slug), [post.slug])

  return (
    <Box mb={4} onClick={goToPost} sx={{
        cursor: 'pointer', 
        background: banner && `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.9)), url(${banner})`,
        height: '25rem',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '1rem',
        paddingBottom: '1rem',
        'background-size': 'cover',
        'background-origin': 'border-box',
        'background-position': '50% 50% !important',
        border: '1px solid rgba(0,0,0,0.15)'
      }} >

      <Heading as='h3' sx={(t) => ({ ...t.styles?.h3, fontSize: [3, 4], color: `rgba(255, 255, 255, 1)`, marginTop: 'auto' })}>{post.title}</Heading>
 
      <p sx={{ color: `rgba(255, 255, 255, 1)`, mt: 1, a: { color: `rgba(255, 255, 255, 1)` }, fontSize: [1, 1, 2] }}>
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
