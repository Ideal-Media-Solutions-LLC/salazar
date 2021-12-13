import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import firebaseConfig from "./FirebaseConfig";
import { writeUserData, readUserData } from "./dbUtils";
import Router from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-dropdown';
import { urlObjectKeys } from "next/dist/shared/lib/utils";
import chat from '../../public/assets/logo.png';
import { useTranslation, initReactI18next } from "react-i18next";


export default function LandingPage() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  let provider = new GoogleAuthProvider();


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('guest');

  const { t } = useTranslation();

  function handleSignInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((res) => {
        let user = res.user;

        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        console.log(token);

        console.log('uid:', user);
        setIsLoggedIn(true);
        setUserName(user.displayName);
        readUserData(user.uid, () => Router.push('/userinterface'), () => Router.push('/signup'));
        // writeUserData(database, user.uid, user.displayName, user.email);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function LogoutUser() {
    console.log("Logout Btn Call");
    signOut(auth)
      .then(() => {
        console.log("logout success!");
        setIsLoggedIn(false);
        setUserName('guest');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const options = {

  }

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-light">
          <a className="navbar-brand" href="#">{t('home:Salazar')}</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
          </div>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown button
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </div>        </nav>
        <main role="main">

          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="first-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="First slide" />
                <div className="container">
                  <div className="carousel-caption text-left">
                    <h1>{t('home:Salazar_School')}</h1>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam.Donec id elit non mi porta gravida at eget metus.Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                    <p><a className="btn btn-lg btn-primary" onClick={handleSignInWithGoogle} role="button">{t('home:start_your_journey')}</a></p>
                  </div>
                </div>
              </div>


            </div>


          </div>


          {/* <!-- Marketing messaging and featurettes */}
          {/* ================================================== --> */}
          {/* <!-- Wrap the rest of the page in another container to center all the content. --> */}

          <div className="container marketing">



            {/* <!-- START THE FEATURETTES --> */}

            <hr className="featurette-divider" />

            <div className="row featurette">
              <div className="col-md-7">
                <h2 className="featurette-heading">{t('home:chat_with_translations')}<span className="text-muted">{t('home:It_will_blow_your_mind')}</span></h2>
                <p className="lead">{t('home:chat_paragraph')}</p>
              </div>
              <div className="col-md-5">
                <img className="featurette-image-chat" src={'assets/chat.png'} />
              </div>
            </div>

            <hr className="featurette-divider" />

            <div className="row featurette">
              <div className="col-md-7 order-md-2">
                <h2 className="featurette-heading">{t('home:Video_with_people_around_world')} <span className="text-muted">{t('home:See_for_yourself')}</span></h2>
                <p className="lead">{t('home:video_paragraph')}</p>
              </div>
              <div className="col-md-5 order-md-1">
                <img className="featurette-image img-fluid mx-auto" src="https://www.manpingou.com/uploads/allimg/180131/25-1P1311FP33Q.jpg" alt="Generic placeholder image" />
              </div>
            </div>

            <hr className="featurette-divider" />

            <div className="row featurette">
              <div className="col-md-7">
                <h2 className="featurette-heading">{t('home:Learn_new_language_any_time_anywhere')}<span className="text-muted">{t('home:Access_to_learn')}</span></h2>
                <p className="lead">{t('home:anytime_paragraph')}</p>
              </div>
              <div className="col-md-5">
                <img className="featurette-image img-fluid mx-auto" src="https://img95.699pic.com/xsj/15/15/eh.jpg!/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast" alt="Generic placeholder image" />
              </div>
            </div>

            <hr className="featurette-divider" />

            {/* <!-- /END THE FEATURETTES --> */}

          </div>


          {/* <!-- FOOTER --> */}
          <footer className="container">
            <p className="float-right"><a href="#">{t('home:Access_to_learn')}</a></p>
            <p>&copy; 2021 Company, Inc. &middot; <a href="#">{t('home:Privacy')}</a> &middot; <a href="#">{t('home:Terms')}</a></p>
          </footer>
        </main>
      </header>    </div>
  );
}
