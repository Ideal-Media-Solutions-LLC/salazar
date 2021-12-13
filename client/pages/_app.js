import '../styles/globals.css'
import '../styles/carousel.css'
import '../styles/signup.css'

import { AppWrapper } from '../components/context/State.js';

function MyApp({ Component, pageProps }) {
  return <AppWrapper><Component {...pageProps} /></AppWrapper>
}

export default MyApp
