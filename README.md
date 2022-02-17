# Gatsby DSG + Plausible Analytics

Example of using [Deferred Static Generation (DSG)](https://www.gatsbyjs.com/docs/how-to/rendering-options/using-deferred-static-generation/) for pages in your Gatsby site, depending on which pages are the most visited. The list of most viewed pages is determined by accessing [Plausible Analytics](https://plausible.io/).

You can use this example for the analytics tool you use, the general idea & setup will be the same.

**Read the full blogpost [Using Deferred Static Generation with Analytics Tools](https://www.lekoarts.de/gatsby/using-deferred-static-generation-with-analytics-tools) to learn more!**

## General Idea

1. Create a local plugin to access the needed data from your analytics tool
1. In this plugin, create GraphQL nodes in the `sourceNodes` lifecycle
1. Use the data from your analytics plugin to mark pages in the `createPages` lifecycle as `defer` or not
