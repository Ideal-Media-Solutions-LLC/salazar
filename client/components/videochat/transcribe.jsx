import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import Quotes from './quotes.js';
import axios from 'axios';

export default function Transcribe() {

  //#region states
  
  //#region display 
  const [phraseDivText, _setPhraseDiv] = useState("");
  const [statusDivText, setStatusDiv] = useState("");
  const [startButtonEnabled, setStartButtonEnabled] = useState(false);
  const [stopButtonEnabled, setStopButtonEnabled] = useState(false);
  const [enableButtonOnOff, setEnableButtonOnOff] = useState(true);
  const [scroll, setScroll] = useState(0);
  //#endregion
  
  //#region speech sdk states
  const [mySpeechSDK, setSpeechSDK] = useState(null);
  //const [key, setKey] = useState({value: "bfc14462bd234b74b9534588764f1786"});
  const [key, setKey] = useState({value: null});
  const [authorizationToken, setAuthorizationToken] = useState(null);
  const [appId, setAppId] = useState(null);
  const [languageOptions, setLanguageOptions] = useState("en-US");
  const [formatOption, setFormatOption] = useState(null);
  const [useDetailedResults, setUseDetailedResults] = useState(null);
  const [recognizer, setRecognizer] = useState(null);
  const [scenarioSelection, setScenarioSelection] = useState("translationRecognizerContinuous");
  const [reco, setReco] = useState(null);
  const [languageTargetOptions, setLanguageTargetOptions] = useState("de-DE");
  const [soundContext, setSoundContext] = useState(null);
  const [capstream, setCapstream] = useState(null);

  const phraseRef = React.useRef(phraseDivText);
  const setPhraseDiv = function(newval) {
    phraseRef.current = newval;
    _setPhraseDiv(newval);
  };
  const [keypress, setKeypress] = useState(0);
  const keyRef = React.useRef(keypress);
  const phraseTextAreaRef = React.useRef(null);

  //#endregion

  //#endregion

  //#region helper functions
  const RequestAuthorizationToken = function() {
    if (authorizationEndpoint) {

      axios({
        method: 'get',
        url: 'http://localhost:3001/video/token',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        console.log(response.data);
        setAuthorizationToken(response.data);
      }).catch((error => {
        console.log(error);
      }));
    }
  } 

  // function resetUiForScenarioStart() {
  //   setPhraseDiv("");
  //   setStatusDiv("");
  // }
  //#endregion

  var authorizationEndpoint = "http://localhost:3001/video/token";

  //#region event handlers
  const onTextAreaChange = function(e) {
    e.preventDefault();
  }

  const onChangeLanguageTarget = function(e) {
    setLanguageTargetOptions(e.target.value.split("(")[1].substring(0, 5));
  }  

  const onChangeLanguageInput = function(e) {
    setLanguageOptions(e.target.value);
  } 

  const onClickScenarioStartButton = function(e) {
    doContinuousTranslation();
  }

  const onClickScenarioStopButton = function(e) {
    reco.stopContinuousRecognitionAsync(
      function () {
        reco.close();
        setReco(undefined);
        //reco = undefined;
      },
      function (err) {
        reco.close();
        setReco(undefined);
        //reco = undefined;
      }
    );
  }

  const onClickEnableTranslation = function(e) {
    getInputStream();
  }

  const onScrollEvent = function(e) {
    e.preventDefault();
    console.log(e);
    setScroll(e.target.scrollTop)
  }

  function getInputStream() {
    navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    }).then((stream) => {
      setCapstream(stream);
    });
  }



  //#endregion


  //#endregion

  //#region top level function

  function doContinuousTranslation() {
    //resetUiForScenarioStart();
    var audioConfig = getAudioConfig();
    var speechConfig = getSpeechConfig(SpeechSDK.SpeechTranslationConfig);
    if (!audioConfig || !speechConfig) return;

    let tempReco = new SpeechSDK.TranslationRecognizer(speechConfig, audioConfig);
    //reco = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    applyCommonConfigurationTo(tempReco);
    //applyCommonConfigurationTo(reco);
    //reco.startContinuousRecognitionAsync();
    tempReco.startContinuousRecognitionAsync();
    setReco(tempReco);
  }

  //#endregion

  //#region SDK common
  function getAudioConfig() {
    return SpeechSDK.AudioConfig.fromStreamInput(capstream);
  }

  function getSpeechConfig(sdkConfigType) {
    var speechConfig;
    if (authorizationToken) {
        speechConfig = sdkConfigType.fromAuthorizationToken(authorizationToken, "eastus");
    } else if (!key.value) {
        alert("Please enter your Cognitive Services Speech subscription key!");
        return undefined;
    } else {
        speechConfig = sdkConfigType.fromSubscription(key.value, "eastus");
    }

    if (sdkConfigType == SpeechSDK.SpeechTranslationConfig) {
        speechConfig.addTargetLanguage(languageTargetOptions);
    }

    speechConfig.speechRecognitionLanguage = languageOptions;
    return speechConfig;
  }


  function onRecognizing(sender, recognitionEventArgs) {
    var result = recognitionEventArgs.result;
    setStatusDiv(statusDivText + `(recognizing) Reason: ${SpeechSDK.ResultReason[result.reason]}`);
        + ` Text: ${result.text}\r\n`;
    let temp = phraseRef.current.replace(/(.*)(^|[\r\n]+).*\[\.\.\.\][\r\n]+/, '$1$2') + `${result.text} [...]\r\n`;
    setPhraseDiv(temp);
    //phraseDiv.scrollTop = phraseDiv.scrollHeight;
  }

  function onRecognized(sender, recognitionEventArgs) {
    var result = recognitionEventArgs.result;
    onRecognizedResult(recognitionEventArgs.result);
  }

  function onRecognizedResult(result) {
    //phraseDiv.scrollTop = phraseDiv.scrollHeight;
    let tempStatus = '';
    let tempPhrase = '';
    tempStatus = statusDivText + `(recognized)  Reason: ${SpeechSDK.ResultReason[result.reason]}`;
    tempPhrase = phraseRef.current.replace(/(.*)(^|[\r\n]+).*\[\.\.\.\][\r\n]+/, '$1$2')
    
    switch (result.reason) {
      case SpeechSDK.ResultReason.NoMatch:
        var noMatchDetail = SpeechSDK.NoMatchDetails.fromResult(result);
        tempStatus += ` NoMatchReason: ${SpeechSDK.NoMatchReason[noMatchDetail.reason]}\r\n`;
        break;
      case SpeechSDK.ResultReason.Canceled:
        var cancelDetails = SpeechSDK.CancellationDetails.fromResult(result);
        tempStatus += ` CancellationReason: ${SpeechSDK.CancellationReason[cancelDetails.reason]}`;
            + (cancelDetails.reason === SpeechSDK.CancellationReason.Error 
                ? `: ${cancelDetails.errorDetails}` : ``)
            + `\r\n`;
        break;
      case SpeechSDK.ResultReason.RecognizedSpeech:
      case SpeechSDK.ResultReason.TranslatedSpeech:
      case SpeechSDK.ResultReason.RecognizedIntent:
        tempStatus += `\r\n`;

        if (result.text) {
          tempPhrase += `${result.text}\r\n`;
        }

        var intentJson = result.properties
          .getProperty(SpeechSDK.PropertyId.LanguageUnderstandingServiceResponse_JsonResult);
        if (intentJson) {
          tempPhrase += `${intentJson}\r\n`;
        }
        if (result.translations) {
          var resultJson = JSON.parse(result.json);
          resultJson['privTranslationPhrase']['Translation']['Translations'].forEach(
            function (translation) {
              tempPhrase += ` [${translation.Language}] ${translation.Text}\r\n`;
          });
        }
    }
    setStatusDiv(tempStatus);
    setPhraseDiv(tempPhrase);
  }

  function onSessionStarted(sender, sessionEventArgs) {

    setStatusDiv(statusDivText + `(sessionStarted) SessionId: ${sessionEventArgs.sessionId}\r\n`)
    setStopButtonEnabled(true);
    setStartButtonEnabled(false);
  }

  function onSessionStopped(sender, sessionEventArgs) {
    setStatusDiv(statusDivText + `(sessionStopped) SessionId: ${sessionEventArgs.sessionId}\r\n`);
    setStopButtonEnabled(false);
    setStartButtonEnabled(true);
  }

  function onCanceled (sender, cancellationEventArgs) {
    console.log(e);
    let temp = statusDivText;
    temp += "(cancel) Reason: " + SpeechSDK.CancellationReason[e.reason];
    if (e.reason === SpeechSDK.CancellationReason.Error) {
      temp += ": " + e.errorDetails;
    }
    
    temp += "\r\n";
    setStatusDiv(temp);
  }

  function applyCommonConfigurationTo(recognizer) {
    recognizer.recognizing = onRecognizing;
    recognizer.recognized = onRecognized;
    recognizer.canceled = onCanceled;
    recognizer.sessionStarted = onSessionStarted;
    recognizer.sessionStopped = onSessionStopped;
    // setReco(recognizer);
  }
  //#endregion

  useEffect(()=> {
    RequestAuthorizationToken();
    
  }, []);

  useEffect(()=> {
    phraseTextAreaRef.current.scrollTop = 10000;
  }, [phraseDivText]);

  useEffect(()=> {
    if(capstream) {
      setEnableButtonOnOff(false);
      setStartButtonEnabled(true);
    }
  }, [capstream]);


  const handleKeyPress = function (e) {
    let kcode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    if (kcode[keyRef.current] == e.code) {
      keyRef.current += 1;
    } else {
      keyRef.current = 0;
    }
    if (keyRef.current === 10) {
      let randi = Math.floor(Math.random() * Quotes.length);
      window.alert(Quotes[randi]);
    }

  }

  return (
    <div id="transcriber" onKeyDown={handleKeyPress}>
      <div id="content">
        <table>
            <tr>
              <td align="right"></td>
              <td align="left"><button id="enableTranslation" onClick={onClickEnableTranslation} style={{display: enableButtonOnOff ? 'block' : 'none' }} >Enable Translation</button></td>
            </tr>
            <tr>
                <td align="right">Recognition language:</td>
                <td align="left">
                    <select id="languageOptions" onChange={onChangeLanguageInput}>
                        <option value="en-US" selected="selected">English - US</option>
                        <option value="zh-CN">Chinese - CN</option>
                        <option value="de-DE">German - DE</option>
                        <option value="es-ES">Spanish - ES</option>
                        <option value="fr-FR">French - FR</option>
                        <option value="it-IT">Italian - IT</option>
                        <option value="ja-JP">Japanese - JP</option>
                        <option value="ko-KR">Korean - KR</option>
                        <option value="pt-PT">Portuguese - PT</option>
                        <option value="ru-RU">Russian - RU</option>
                        <option value="sv-SE">Swedish - SE</option>
                    </select>
                </td>
            </tr>

            <tr id="translationOptionsRow">
                <td align="right">Translation:</td>
                <td>
                    <label htmlFor="languageTargetOptions">Target language</label>
                    <select id="languageTargetOptions" onChange={onChangeLanguageTarget}>
                        <option value="Microsoft Server Speech Text to Speech Voice (de-DE, Hedda)" selected="selected">
                            German - DE</option>
                        <option value="Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)">English - US
                        </option>
                        <option value="Microsoft Server Speech Text to Speech Voice (es-ES, Laura, Apollo)">Spanish - ES
                        </option>
                        <option value="Microsoft Server Speech Text to Speech Voice (fr-FR, Julie, Apollo)">French - FR
                        </option>
                        <option value="Microsoft Server Speech Text to Speech Voice (it-IT, LuciaRUS)">Italian - IT
                        </option>
                        <option value="Microsoft Server Speech Text to Speech Voice (ja-JP, Ayumi, Apollo)">Japanese -
                            JP</option>
                        <option value="Microsoft Server Speech Text to Speech Voice (ko-KR, HeamiRUS)">Korean - KR
                        </option>
                        <option value="Microsoft Server Speech Text to Speech Voice (pt-PT, HeliaRUS)">Portuguese - PT
                        </option>
                        <option value="Microsoft Server Speech Text to Speech Voice (ru-RU, Irina, Apollo)">Russian - RU
                        </option>
                        <option value="Microsoft Server Speech Text to Speech Voice (sv-SE, HedvigRUS)">Swedish - SE
                        </option>
                        <option value="Microsoft Server Speech Text to Speech Voice (zh-CN, Kangkang, Apollo)">Chinese -
                            CN</option>
                    </select>
                </td>
            </tr>
           
            <tr>
                <td align="right"><b></b></td>
                <td>
                    <button id="scenarioStartButton" onClick={onClickScenarioStartButton} disabled={!startButtonEnabled}>Start</button>
                    <button id="scenarioStopButton" onClick={onClickScenarioStopButton} disabled={!stopButtonEnabled}>Stop</button>
                </td>
            </tr>
            <tr>
                <td align="right">Results:</td>
                <td align="left">
                    {/* <textarea id="phraseDiv" style={{width: "250px", height: "250px"}} value={phraseDivText} onChange={onTextAreaChange}></textarea> */}
                    <textarea id="phraseDiv" style={{width: "500px", height: "500px"}}  onChange={onTextAreaChange} ref={phraseTextAreaRef} value={phraseDivText} readOnly={true}></textarea>
                </td>
            </tr>
            <tr style={{display:'none'}}>
                <td align="right">Events:</td>
                <td align="left">
                    <textarea id="statusDiv" style={{width: "250px", height: "250px"}} value={statusDivText} onChange={onTextAreaChange}>
                    </textarea>
                </td>
            </tr>
        </table>
      </div>
      <Script src="microsoft.cognitiveservices.speech.sdk.bundle.js"/>
    </div>
  )
}
