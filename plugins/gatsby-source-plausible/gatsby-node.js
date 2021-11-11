const fetch = require("node-fetch")

const POST_NODE_TYPE = `PlausibleTopPage`
const API_ENDPOINT = `https://plausible.io/api/v1/stats/breakdown`

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { siteId, apiKey }
) => {
  const { createNode } = actions

  const API_URL = `${API_ENDPOINT}?site_id=${siteId}&period=6mo&property=event:page`

  const response = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  const body = await response.json()

  body.results.forEach((page) => {
    createNode({
      id: createNodeId(`${POST_NODE_TYPE}-${page.page}`),
      slug: page.page,
      visitors: page.visitors,
      parent: null,
      children: [],
      internal: {
        type: POST_NODE_TYPE,
        content: JSON.stringify(page),
        contentDigest: createContentDigest(page),
      },
    })
  })
}
