export const onRouteUpdate = () => {
  // process.env.NODE_ENV === `production` && 
  if (typeof window.plausible === `object`) {
    window.plausible(`pageview`)
  }
}