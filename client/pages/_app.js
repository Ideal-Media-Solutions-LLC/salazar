import '../styles/globals.css'
import '../styles/carousel.css'
import '../styles/signup.css'
import { appWithTranslation } from 'next-i18next';
import { AppWrapper } from '../components/context/State.js';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp);
