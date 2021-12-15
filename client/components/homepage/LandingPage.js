import { useState } from "react";
import { handleSignInWithGoogle, LogoutUser } from "./dbUtils";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-dropdown';
import { urlObjectKeys } from "next/dist/shared/lib/utils";

import { useTranslation, initReactI18next } from "react-i18next";
import { createContext, useContext } from "react";
// import { useAppContext } from "../context/State";
import LanguageDropdown from "./LanguageDropdown";

export default function LandingPage() {
  // const { uid } = useAppContext();
  const { t } = useTranslation();

  const options = {

  }

  return (
    <div style={{width:'600px'}}>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{backgroundColor:'transparent', height:'12vh', overflow:'hidden'}}>
          <img src={'assets/logo1.png'} className='homepage-logo' style={{height:'10vh', left:'0px'}} />
          <div className="collapse navbar-collapse" id="navbarCollapse">
          </div>
          <div className="dropdown">
            <LanguageDropdown />
          </div>
        </nav>
      </header>

      <main role="main" className='main' >

          <div id="myCarousel" className="carouse-slide" data-ride="carousel">

            <div className="carousel-inner">
              <div className="carousel-item active">
                {/* <img className="homepage-img" src="../public/assets/background.jpg" alt="First slide" /> */}
                <div className="container" >
                  <div className="carousel-caption text-left" >
                    <h1>{t('home:Salazar_School')}</h1>
                    <p>{t('home:home_paragraph')}</p>
                    <div>

                      <div className="btn btn-lg btn-primary" onClick={handleSignInWithGoogle} role="button">{t('home:start_your_journey')}</div>
                    </div>
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
          {/* <LanguageDropdown /> */}
          <footer className="container">
            <p className="float-right"><a href="#">{t('home:Back_to_top')}</a></p>
            <p>&copy; 2021 {t('home:Group')}. &middot; <a href="#">{t('home:Privacy')}</a> &middot; <a href="#">{t('home:Terms')}</a></p>
          </footer>
        </main>

    </div>
  );
}
