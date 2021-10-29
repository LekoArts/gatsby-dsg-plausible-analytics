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
  maxWidth: 640,
}
const paragraphStyles = {
  marginBottom: 48,
}
const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}

const BlogPost = ({ data }) => {
  return (
    <main style={pageStyles}>
      <Helmet title={data.post.frontmatter.title} />
      <h1 style={headingStyles}>
        {data.post.frontmatter.title}
      </h1>
      <div style={paragraphStyles} dangerouslySetInnerHTML={{ __html: data.post.html }} />
      <p style={paragraphStyles}>
        <Link style={linkStyle} to="/">Back to homepage</Link>
      </p>
    </main>
  )
}

export default BlogPost

export const query = graphql`
  query($slug: String){
    post: markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
      }
    }
  }
`
