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
    <Box mb={4} onClick={goToPost} sx={{cursor: 'pointer'}} >
      { banner && <div sx={{ paddingTop: '1rem'}}>
          <Image src={banner} /> 
        </div>
      }

      <Heading as='h3' sx={(t) => ({ ...t.styles?.h3, fontSize: [3, 4], color: `text`, marginTop: '0.5rem' })}>{post.title}</Heading>
 
      <p sx={{ color: `secondary`, mt: 1, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
        <time>{post.date}</time>
        {post.tags && showTags && (
          <React.Fragment>
            {` — `}
            <ItemTags tags={post.tags} />
          </React.Fragment>
        )}
      </p>

      <Divider />
    </Box>
  )
}

export default BlogListItem
