/** @jsxImportSource theme-ui */
import * as React from "react"
import { jsx, Heading, Image } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import ItemTags from "@lekoarts/gatsby-theme-minimal-blog/src/components/item-tags"
import Seo from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"
import PostFooter from "@lekoarts/gatsby-theme-minimal-blog/src/components/post-footer"

type PostProps = {
  data: {
    post: {
      slug: string
      title: string
      date: string
      tags?: {
        name: string
        slug: string
      }[]
      description?: string
      canonicalUrl?: string
      body: string
      excerpt: string
      timeToRead?: number
      banner?: {
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }
    }
  }
}

const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)


const RichPost = ({ data: { post } }: PostProps) => {
  const banner = post.banner?.childImageSharp?.resize?.src

  return (
    <Layout>
        <Seo
          title={post.title}
          description={post.description || post.excerpt}
          image={post.banner?.childImageSharp?.resize?.src}
          pathname={post.slug}
          canonicalUrl={post.canonicalUrl}
        />

        <Heading as="h1" variant="styles.h1">
          {post.title}
        </Heading>

        <p sx={{ color: `secondary`, mt: 3, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
            <time>{post.date}</time>
            {post.timeToRead && ` — `}
            {post.timeToRead && <span>{post.timeToRead} min read</span>}
        </p>
        
        { banner && <Image src={banner} /> }

        <p sx={{ color: `secondary`, mt: 1, a: { color: `secondary` }, fontSize: ['0.8rem', '0.9rem', '1.1rem'], textAlign: 'right' }}>
            {post.tags && <ItemTags tags={post.tags} />}
        </p>
        
        <section
          sx={{
              my: 5,
              ".gatsby-resp-image-wrapper": { my: [4, 4, 5], boxShadow: shadow.join(`, `) },
              variant: `layout.content`,
          }}
        >
            <MDXRenderer>{post.body}</MDXRenderer>
        </section>

        <PostFooter post={post} />
    </Layout>
  )
}

export default RichPost