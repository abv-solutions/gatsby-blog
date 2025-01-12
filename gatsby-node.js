const path = require('path')
// Register pages using Gatsby's createPages API
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const postTemplate = path.resolve('src/templates/blog-post.js')

  return graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            html
            id
            frontmatter {
              author
              date
              path
              title
            }
          }
        }
      }
    }
  `)
    .then(res => {
      if (res.errors) {
        console.log(res.errors)
        return Promise.reject(res.errors)
      }

      res.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: postTemplate,
        })
      })
    })
}
