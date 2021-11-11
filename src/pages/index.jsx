import * as React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const paragraphStyles = {
  marginBottom: 48,
}
const listStyles = {
  marginBottom: 32,
  paddingLeft: 0,
}
const listItemStyles = {
  fontWeight: 300,
  fontSize: 21,
  maxWidth: 560,
  marginBottom: 16,
}
const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}
const descriptionStyle = {
  color: "#232129",
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25,
}

const IndexPage = ({ data }) => {
  return (
    <main style={pageStyles}>
      <Helmet title="Blog Overview" />
      <h1 style={headingStyles}>
        Blog Overview
      </h1>
      <p>These are the three top pages (excluding index page) according to Plausible Analytics:</p>
      <ul style={listStyles}>
        {data.plausible.nodes.map(page => (
          <li key={page.slug} style={{ ...listItemStyles }}>
            {page.slug} - {page.visitors}
          </li>
        ))}
      </ul>
      <p style={paragraphStyles}>
        Below is the list of blog posts and only the top 3 posts will be SSG. The rest is DSG.
      </p>
      <ul style={listStyles}>
        {data.posts.nodes.map(link => (
          <li key={link.frontmatter.slug} style={{ ...listItemStyles, color: link.color }}>
            <span>
              <Link
                style={linkStyle}
                to={link.frontmatter.slug}
              >
                {link.frontmatter.title}
              </Link>
              <p style={descriptionStyle}>{link.description}</p>
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default IndexPage

export const query = graphql`
  {
    posts: allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        frontmatter {
          title
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
        visitors
      }
    }
  }
`
