import { useState } from "react";
import { handleSignInWithGoogle, LogoutUser } from "./dbUtils";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-dropdown';
import { urlObjectKeys } from "next/dist/shared/lib/utils";

import { useTranslation, initReactI18next } from "react-i18next";
import { createContext, useContext } from "react";
import LanguageDropdown from "./LanguageDropdown";
import Hamburger from "./Hamburger";
// import chat from './'



export default function LandingPage() {
  const { t } = useTranslation();

  const options = {

  }

  return (
    <div>
      <header className='nav-header'>
        {/* <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{ backgroundColor: 'transparent', height: '12vh' }}>
          <img src={'assets/logo1.png'} className='homepage-logo' style={{ height: '10vh', left: '0px' }} />
          <div className="collapse navbar-collapse" id="navbarCollapse">
          </div>
          <div className="dropdown">
            <LanguageDropdown />
          </div>
        </nav> */}
        <Hamburger />
      </header>


      <main role="main" className='main' >

        <div id="myCarousel" className="carouse-slide" data-ride="carousel">

          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="home-para" >
                <h1 className='school'>{t('home:Salazar_School')}</h1>
                <p>{t('home:home_paragraph')}</p>
                <div>

                  <div className="btn btn-lg btn-primary" onClick={handleSignInWithGoogle} role="button">{t('home:start_your_journey')}</div>
                </div>
                {/* </div> */}
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
              <img className="featurette-image img-fluid mx-auto" src={'assets/textchat.png'} />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading">{t('home:Video_with_people_around_world')} <span className="text-muted">{t('home:See_for_yourself')}</span></h2>
              <p className="lead">{t('home:video_paragraph')}</p>
            </div>
            <div className="col-md-5 order-md-1">
              <img className="featurette-image img-fluid mx-auto" src={'assets/video.png'} alt="Generic placeholder image" />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">{t('home:Learn_new_language_any_time_anywhere')}<span className="text-muted">{t('home:Access_to_learn')}</span></h2>
              <p className="lead">{t('home:anytime_paragraph')}</p>
            </div>
            <div className="col-md-5">
              <img className="featurette-image img-fluid mx-auto" src={'assets/mobile.png'} alt="Generic placeholder image" />
            </div>
          </div>

          <hr className="featurette-divider" />

          {/* <!-- /END THE FEATURETTES --> */}

        </div>


        {/* <!-- FOOTER --> */}
        <footer className="container">
          <p className="float-right"><a href="#">{t('home:Back_to_top')}</a></p>
          <p>&copy; 2021 {t('home:Group')} &middot; <a href="#"></a> &middot; <a href="#"></a></p>
          <div>   </div>
        </footer>
      </main>

    </div>
  );
}
