import '../styles/globals.css'
import '../styles/carousel.css'
import '../styles/signup.css'
import { appWithTranslation } from 'next-i18next';
import { AppProvider} from '../components/context/AppProvider.js'

function MyApp({ Component, pageProps }) {
  return    <AppProvider><Component {...pageProps} /></AppProvider>
}

export default appWithTranslation(MyApp);
