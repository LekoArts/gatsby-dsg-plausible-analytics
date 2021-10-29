const templatePath = require.resolve(`./src/templates/blog-post.jsx`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)
  
  result.data.allMarkdownRemark.nodes.forEach((node) => {
    createPage({
      path: node.frontmatter.slug,
      component: templatePath,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}