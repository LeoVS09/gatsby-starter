const kebabCase = require(`lodash.kebabcase`)
const withDefaults = require(`@lekoarts/gatsby-theme-minimal-blog-core/utils/default-options`)

// These template are only data-fetching wrappers that import components
const homepageTemplate = require.resolve(`@lekoarts/gatsby-theme-minimal-blog-core/src/templates/homepage-query.tsx`)
const blogTemplate = require.resolve(`@lekoarts/gatsby-theme-minimal-blog-core/src/templates/blog-query.tsx`)
const postTemplate = require.resolve(`@lekoarts/gatsby-theme-minimal-blog-core/src/templates/post-query.tsx`)
const pageTemplate = require.resolve(`@lekoarts/gatsby-theme-minimal-blog-core/src/templates/page-query.tsx`)
const tagTemplate = require.resolve(`@lekoarts/gatsby-theme-minimal-blog-core/src/templates/tag-query.tsx`)
const tagsTemplate = require.resolve(`@lekoarts/gatsby-theme-minimal-blog-core/src/templates/tags-query.tsx`)

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions

  const { basePath, blogPath, tagsPath, formatString } = withDefaults(themeOptions)

  createPage({
    path: basePath,
    component: homepageTemplate,
    context: {
      formatString,
    },
  })

  createPage({
    path: `/${basePath}/${blogPath}`.replace(/\/\/+/g, `/`),
    component: blogTemplate,
    context: {
      formatString,
    },
  })

  createPage({
    path: `/${basePath}/${tagsPath}`.replace(/\/\/+/g, `/`),
    component: tagsTemplate,
  })

  const result = await graphql(`
    query {
      allPage {
        nodes {
          slug
          defer
        }
      }
      tags: allPost(sort: { fields: tags___name, order: DESC }) {
        group(field: tags___name) {
          fieldValue
        }
      }
      allFile(filter: {sourceInstanceName: {eq: "content/posts"}}) {
        nodes {
          childMdx {
            slug
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your posts or pages`, result.errors)
    return
  }

  const posts = result.data.allFile.nodes.filter(node => !!node.childMdx).map(node => node.childMdx.frontmatter)

  posts.forEach((post) => {
    console.log('post.slug', post.slug)
    createPage({
      path: post.slug,
      component: postTemplate,
      context: {
        slug: post.slug,
        formatString,
      },
      defer: false,
    })
  })

  const pages = result.data.allPage.nodes

  if (pages.length > 0) {
    pages.forEach((page) => {
      createPage({
        path: page.slug,
        component: pageTemplate,
        context: {
          slug: page.slug,
        },
        defer: page.defer,
      })
    })
  }

  const tags = result.data.tags.group

  if (tags.length > 0) {
    tags.forEach((tag) => {
      createPage({
        path: `/${basePath}/${tagsPath}/${kebabCase(tag.fieldValue)}`.replace(/\/\/+/g, `/`),
        component: tagTemplate,
        context: {
          slug: kebabCase(tag.fieldValue),
          name: tag.fieldValue,
          formatString,
        },
      })
    })
  }
}
