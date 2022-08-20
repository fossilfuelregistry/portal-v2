const updatePathname = (pathname: string) => {
  if (typeof window !== 'undefined' && pathname) {
    window.history.pushState(null, '', pathname)
  }
}

export default updatePathname
