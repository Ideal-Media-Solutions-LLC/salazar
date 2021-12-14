import '../styles/globals.css'

import { AppProvider} from '../components/context/AppProvider.js'

function MyApp({ Component, pageProps }) {
  return    <AppProvider><Component {...pageProps} /></AppProvider>
}

export default MyApp
