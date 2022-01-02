import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import store from '../store/userStore'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return <SessionProvider>
    <Provider store={store}>
      <Head>
        <title>OzSocial</title>
      </Head>
    <Component {...pageProps} />
    </Provider>
    </SessionProvider>
}

export default MyApp
