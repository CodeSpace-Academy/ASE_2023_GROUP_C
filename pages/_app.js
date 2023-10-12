import React from 'react'
import MainNavigation from '../components/layout/main-navigation'
import Layout from '../components/layout/layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Layout />
      <Component { ...pageProps} />
      
    </div>
  )
}

