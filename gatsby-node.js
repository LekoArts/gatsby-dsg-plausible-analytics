const templatePath = require.resolve(`./src/templates/blog-post.jsx`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      posts: allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
      plausible: allPlausibleTopPage(
        sort: { fields: visitors, order: DESC }
        filter: { slug: { ne: "/" } }
        limit: 3
      ) {
        nodes {
          slug
        }
      }
    }
  `)

  const plausibleTopPages = result.data.plausible.nodes.map((page) => page.slug)

  result.data.posts.nodes.forEach((post) => {
    const slug = post.frontmatter.slug
    const isTopPage = plausibleTopPages.includes(slug)
    createPage({
      path: slug,
      component: templatePath,
      context: {
        slug: slug,
      },
      defer: !isTopPage,
    })
  })
}
