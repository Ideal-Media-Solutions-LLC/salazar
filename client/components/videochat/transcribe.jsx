import React, { useState, useEffect } from 'react';
import Script from 'next/script';

export default function Transcribe() {

  //const [SpeechSDK, setSpeechSDK] = useState(null);
  const [reported, setReported] = useState(null);

  //#region browser hooks states
  const [mySpeechSDK, setSpeechSDK] = useState(null);
  const [phraseDivText, setPhraseDiv] = useState("");
  const [statusDivText, setStatusDiv] = useState("");
  const [key, setKey] = useState({value: "bfc14462bd234b74b9534588764f1786"});
  const [authorizationToken, setAuthorizationToken] = useState(null);
  const [appId, setAppId] = useState(null);
  const [languageOptions, setLanguageOptions] = useState("");
  const [formatOption, setFormatOption] = useState(null);
  const [useDetailedResults, setUseDetailedResults] = useState(null);
  const [recognizer, setRecognizer] = useState(null);
  const [scenarioSelection, setScenarioSelection] = useState("translationRecognizerContinuous");
  const [scenarioStartButtonText, setScenarioStartButtonText] = useState("Start");
  const [scenarioStopButtonText, setScenarioStopButton] = useState("");
  const [formatSimpleRadio, setFormatSimpleRadio] = useState(null);
  const [formatDetailedRadio, setFormatDetailedRadio] = useState(null);
  const [reco, setReco] = useState(null);
  const [languageTargetOptions, setLanguageTargetOptions] = useState(null);
  const [referenceText, setReferenceText] = useState(null);
  const [thingsToDisableDuringSession, setThingsToDisableDuringSession] = useState(null);
  const [soundContext, setSoundContext] = useState(null);
  const [capstream, setCapstream] = useState(null);
  //#endregion

  var authorizationEndpoint = "token.php";

  //#region react event handlers
  const onChangeLanguageTarget = function(e) {
    setLanguageTargetOptions(e.target.value.split("(")[1].substring(0, 5));
  }  

  const onChangeLanguageInput = function(e) {
    setLanguageOptions(e.target.value);
  } 

  const onClickScenarioStartButton = function(e) {
    
    switch (scenarioSelection) {
      case 'speechRecognizerContinuous':
        doContinuousRecognition();
        break;
      case 'translationRecognizerContinuous':
        doContinuousTranslation();
        break;
    }
  }

  const onClickScenarioStopButton = function(e) {
    
    reco.stopContinuousRecognitionAsync(
      function () {
        reco.close();
        reco = undefined;
      },
      function (err) {
        reco.close();
        reco = undefined;
      }
    );
  }

  const onClickEnableTranslation = function(e) {
    getInputStream();
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

  // const RequestAuthorizationToken = function() {
  //   if (authorizationEndpoint) {
  //     var a = new XMLHttpRequest();
  //     a.open("GET", authorizationEndpoint);
  //     a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //     a.send("");
  //     a.onload = function () {
  //       var token = JSON.parse(atob(this.responseText.split(".")[1]));
  //       setAuthorizationToken(this.responseText);
  //       //key.disabled = true;
  //       //key.value = "using authorization token (hit F5 to refresh)";
  //       console.log("Got an authorization token: " + token);
  //     }
  //   }
  // } 

  // const Initialize = function(onComplete) {
  //   if (!!window.SpeechSDK) {
  //       document.getElementById('content').style.display = 'block';
  //       document.getElementById('warning').style.display = 'none';
  //       onComplete(window.SpeechSDK);
  //   }
  // }

  //#region top level function
  function doRecognizeOnceAsync() {
    resetUiForScenarioStart();

    var audioConfig = getAudioConfig();
    var speechConfig = getSpeechConfig(SpeechSDK.SpeechConfig);
    if (!audioConfig || !speechConfig) return;

    reco = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    applyCommonConfigurationTo(reco);

    reco.recognized = undefined;
  }

  function doContinuousRecognition() {
    resetUiForScenarioStart();

    var audioConfig = getAudioConfig();
    var speechConfig = getSpeechConfig(SpeechSDK.SpeechConfig);
    if (!speechConfig) return;

    reco = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    applyCommonConfigurationTo(reco);

    reco.startContinuousRecognitionAsync();
  }

  function doRecognizeIntentOnceAsync() {
    resetUiForScenarioStart();
    var audioConfig = getAudioConfig();
    var speechConfig = getSpeechConfig(SpeechSDK.SpeechConfig);
    if (!audioConfig || !speechConfig) return;

    if (!appId.value) {
        alert('A language understanding appId is required for intent recognition.');
        return;
    }

    reco = new SpeechSDK.IntentRecognizer(speechConfig, audioConfig);
    var intentModel = SpeechSDK.LanguageUnderstandingModel.fromAppId(appId.value);
    reco.addAllIntents(intentModel);

    applyCommonConfigurationTo(reco);

    reco.recognizeOnceAsync();
  }

  function doContinuousTranslation() {
    resetUiForScenarioStart();
    debugger;
    var audioConfig = getAudioConfig();
    var speechConfig = getSpeechConfig(SpeechSDK.SpeechTranslationConfig);
    if (!audioConfig || !speechConfig) return;

    reco = new SpeechSDK.TranslationRecognizer(speechConfig, audioConfig);
    applyCommonConfigurationTo(reco);

    reco.synthesizing = function (s, e) {
      var audioSize = e.result.audio === undefined ? 0 : e.result.audio.byteLength;

      statusDiv.innerHTML += `(synthesizing) Reason: ${SpeechSDK.ResultReason[e.result.reason]}` + ` ${audioSize} bytes\r\n`;

      if (e.result.audio && soundContext) {
        var source = soundContext.createBufferSource();
        soundContext.decodeAudioData(e.result.audio, function (newBuffer) {
            source.buffer = newBuffer;
            source.connect(soundContext.destination);
            source.start(0);
        });
      }
    };

    reco.startContinuousRecognitionAsync();
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
        //speechConfig.addTargetLanguage(languageTargetOptions.value.split("(")[1].substring(0, 5));
    }

    speechConfig.speechRecognitionLanguage = languageOptions;
    return speechConfig;
  }


  function onRecognizing(sender, recognitionEventArgs) {
    var result = recognitionEventArgs.result;
    setStatusDiv(statusDivText += `(recognizing) Reason: ${SpeechSDK.ResultReason[result.reason]}`);
        + ` Text: ${result.text}\r\n`;
    // Update the hypothesis line in the phrase/result view (only have one)
    setPhraseDiv(phraseDivText.replace(/(.*)(^|[\r\n]+).*\[\.\.\.\][\r\n]+/, '$1$2')
        + `${result.text} [...]\r\n`);
    //phraseDiv.scrollTop = phraseDiv.scrollHeight;
  }

  function onRecognized(sender, recognitionEventArgs) {
    var result = recognitionEventArgs.result;
    onRecognizedResult(recognitionEventArgs.result);
  }

  function onRecognizedResult(result) {

    phraseDiv.scrollTop = phraseDiv.scrollHeight;
    let tempStatus = '';
    let tempPhrase = '';


    tempStatus = statusDivText + `(recognized)  Reason: ${SpeechSDK.ResultReason[result.reason]}`;
    tempPhrase = phraseDivText.replace(/(.*)(^|[\r\n]+).*\[\.\.\.\][\r\n]+/, '$1$2');
    
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
          // setPhraseDiv(phraseDivText + `${result.text}\r\n`);
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
    setStatusDiv(statusDivText +  `(sessionStarted) SessionId: ${sessionEventArgs.sessionId}\r\n`);

    for (const thingToDisableDuringSession of thingsToDisableDuringSession) {
        thingToDisableDuringSession.disabled = true;
    }

    //scenarioStartButton.disabled = true;
    //scenarioStopButton.disabled = false;
  }

  function onSessionStopped(sender, sessionEventArgs) {
    setStatusDiv(statusDivText + `(sessionStopped) SessionId: ${sessionEventArgs.sessionId}\r\n`);
    for (const thingToDisableDuringSession of thingsToDisableDuringSession) {
        thingToDisableDuringSession.disabled = false;
    }

    //scenarioStartButton.disabled = false;
    //scenarioStopButton.disabled = true;
  }

  function onCanceled (sender, cancellationEventArgs) {
    window.console.log(e);

    statusDiv.innerHTML += "(cancel) Reason: " + SpeechSDK.CancellationReason[e.reason];
    if (e.reason === SpeechSDK.CancellationReason.Error) {
        statusDiv.innerHTML += ": " + e.errorDetails;
    }
    statusDiv.innerHTML += "\r\n";
  }

  function applyCommonConfigurationTo(recognizer) {
    // The 'recognizing' event signals that an intermediate recognition result is received.
    // Intermediate results arrive while audio is being processed and represent the current "best guess" about
    // what's been spoken so far.
    recognizer.recognizing = onRecognizing;

    // The 'recognized' event signals that a finalized recognition result has been received. These results are
    // formed across complete utterance audio (with either silence or eof at the end) and will include
    // punctuation, capitalization, and potentially other extra details.
    // 
    // * In the case of continuous scenarios, these final results will be generated after each segment of audio
    //   with sufficient silence at the end.
    // * In the case of intent scenarios, only these final results will contain intent JSON data.
    // * Single-shot scenarios can also use a continuation on recognizeOnceAsync calls to handle this without
    //   event registration.
    recognizer.recognized = onRecognized;

    // The 'canceled' event signals that the service has stopped processing speech.
    // https://docs.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechrecognitioncanceledeventargs?view=azure-node-latest
    // This can happen for two broad classes of reasons:
    // 1. An error was encountered.
    //    In this case, the .errorDetails property will contain a textual representation of the error.
    // 2. No additional audio is available.
    //    This is caused by the input stream being closed or reaching the end of an audio file.
    recognizer.canceled = onCanceled;

    // The 'sessionStarted' event signals that audio has begun flowing and an interaction with the service has
    // started.
    recognizer.sessionStarted = onSessionStarted;

    // The 'sessionStopped' event signals that the current interaction with the speech service has ended and
    // audio has stopped flowing.
    recognizer.sessionStopped = onSessionStopped;

    // PhraseListGrammar allows for the customization of recognizer vocabulary.
    // The semicolon-delimited list of words or phrases will be treated as additional, more likely components
    // of recognition results when applied to the recognizer.
    //
    // See https://docs.microsoft.com/azure/cognitive-services/speech-service/get-started-speech-to-text#improve-recognition-accuracy
  }
  //#endregion


  //#region browser hooks
  // var phraseDiv, statusDiv;
  // var key = {value: "bfc14462bd234b74b9534588764f1786"};
  // var authorizationToken, appId;
  // var languageOptions, formatOption;
  // var useDetailedResults;
  // var recognizer;
  // var scenarioSelection, scenarioStartButton, scenarioStopButton;
  // var formatSimpleRadio, formatDetailedRadio;
  // var reco;
  // var languageTargetOptions;
  // var referenceText;

  // var thingsToDisableDuringSession;

  // var soundContext = undefined;

  // var capstream;


  function resetUiForScenarioStart() {
    setPhraseDiv("");
    setStatusDiv("");
    //useDetailedResults = document.querySelector('input[name="formatOption"]:checked').value === "Detailed";
  }

  // document.addEventListener("DOMContentLoaded", function () {
  //     //scenarioStartButton = document.getElementById('scenarioStartButton');
  //     //scenarioStopButton = document.getElementById('scenarioStopButton');
  //     scenarioSelection = document.getElementById('scenarioSelection');

  //     phraseDiv = document.getElementById("phraseDiv");
  //     statusDiv = document.getElementById("statusDiv");
  //     appId = document.getElementById("appId");
  //     languageOptions = document.getElementById("languageOptions");
  //     languageTargetOptions = document.getElementById("languageTargetOptions");
  //     formatSimpleRadio = document.getElementById('formatSimpleRadio');
  //     formatDetailedRadio = document.getElementById('formatDetailedRadio');
  //     referenceText = document.getElementById('referenceText');

  //     thingsToDisableDuringSession = [
  //         key,
  //         languageOptions,
  //         scenarioSelection,
  //         formatSimpleRadio,
  //         formatDetailedRadio,
  //         appId,
  //         languageTargetOptions
  //     ];

  //     function setScenario() {
  //         var startButtonText = (function() {
  //             switch (scenarioSelection) {
  //                 case 'speechRecognizerContinuous':  return 'startContinuousRecognitionAsync()';
  //                 case 'translationRecognizerContinuous': return 'startContinuousTranslation()';
  //             }
  //         })();

          //scenarioStartButton.innerHTML = startButtonText;
          // setScenarioStartButtonText(startButtonText);
          // setScenarioStopButtonText(`STOP ${startButtonText}`);
          //scenarioStopButton.innerHTML = `STOP ${startButtonText}`;

          // document.getElementById('languageUnderstandingAppIdRow').style.display = scenarioSelection 'intentRecognizerRecognizeOnce' ? '' : 'none';

          // var detailedResultsSupported = 
          //     (scenarioSelection === "speechRecognizerRecognizeOnce"
          //     || scenarioSelection === "speechRecognizerContinuous");
          // document.getElementById('formatOptionRow').style.display = detailedResultsSupported ? '' : 'none';

          // document.getElementById('translationOptionsRow').style.display =
          //     scenarioSelection == 'translationRecognizerContinuous' ? '' : 'none';
          
      // }

      // scenarioSelection.addEventListener("change", function () {
      //     setScenario();
      // });
      // setScenario();

      // scenarioStartButton.addEventListener("click", function () {
      //     switch (scenarioSelection.value) {
      //         case 'speechRecognizerContinuous':
      //             doContinuousRecognition();
      //             break;
      //         case 'translationRecognizerContinuous':
      //             doContinuousTranslation();
      //             break;
      //     }
      // });

      // scenarioStopButton.addEventListener("click", function() {
      //     switch (scenarioSelection.value) {
      //         case 'speechRecognizerContinuous':
      //         case 'translationRecognizerContinuous':
      //             reco.stopContinuousRecognitionAsync(
      //                 function () {
      //                     reco.close();
      //                     reco = undefined;
      //                 },
      //                 function (err) {
      //                     reco.close();
      //                     reco = undefined;
      //                 }
      //             );
      //             break;
      //     }
      // });

      

      // function enumerateMicrophones() {
      //     if (!navigator || !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      //         console.log(`Unable to query for audio input devices. Default will be used.\r\n`);
      //         return;
      //     }
      //     navigator.mediaDevices.getDisplayMedia({
      //         video: true,
      //         audio: true
      //     }).then((stream) => {
      //         capstream = stream;
      //         navigator.mediaDevices.enumerateDevices().then((devices) => {
      //         });
          
              
  //         });
  //     }

  //     enumerateMicrophones();

  //     Initialize(function (speechSdk) {
  //         SpeechSDK = speechSdk;

  //         // in case we have a function for getting an authorization token, call it.
  //         if (typeof RequestAuthorizationToken === "function") {
  //             RequestAuthorizationToken();
  //         }
  //     });
  // });

  //#endregion

  useEffect(()=> {
    // RequestAuthorizationToken();
    // getAudioConfig();
    setSpeechSDK(window.SpeechSDK);
  }, []);

  // useEffect(()=> {
  //   // RequestAuthorizationToken();
  //   // getAudioConfig();
  //   //setSpeechSDK(SpeechSDK);
  // }, [SpeechSDK]);

  return (
    <div id="transcriber">
      <div id="content">
        <table>
            <tr>
              <td align="right"></td>
              <td align="left"><button id="enableTranslation" onClick={onClickEnableTranslation}>Enable Translation</button></td>
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
            <tr>
                <td align="right">Scenario:</td>
                <td align="left">
                    <select id="scenarioSelection" >
                        {/* <option value="speechRecognizerContinuous">Continuous speech-to-text</option> */}
                        <option value="translationRecognizerContinuous">Continuous translation</option>
                    </select>
                </td>
            </tr>
            {/* <tr id="formatOptionRow">
                <td align="right" >Result Format:</td>
                <td align="left">
                    <input type="radio"
                        name="formatOption"
                        checked="checked"
                        id ="formatSimpleRadio"
                        value="Simple"/>
                    <label htmlFor="formatSimpleRadio">Simple</label>
                    <input type="radio"
                        name="formatOption"
                        id ="formatDetailedRadio"
                        value="Detailed"/>
                    <label htmlFor="formatDetailedRadio">Detailed</label>
                </td>
            </tr> */}
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
            <tr id="languageUnderstandingAppIdRow">
                <td align="right">Application ID:</td>
                <td>
                    <input id="appId" type="text" size="60" placeholder="required: appId for the Language Understanding service"/>
                </td>
            </tr>
            <tr>
                <td align="right"><b></b></td>
                <td>
                    <button id="scenarioStartButton" onClick={onClickScenarioStartButton}>{scenarioStartButtonText}</button>
                    <button id="scenarioStopButton" disabled="disabled">Stop</button>
                </td>
            </tr>
            <tr>
                <td align="right">Results:</td>
                <td align="left">
                    <textarea id="phraseDiv" value={phraseDivText} readOnly={true}></textarea>
                </td>
            </tr>
            <tr >
                <td align="right">Events:</td>
                <td align="left">
                    <textarea id="statusDiv" value={statusDivText} readOnly={true}>
                    </textarea>
                </td>
            </tr>
        </table>
      </div>

      {/* <Script src="https://aka.ms/csspeech/jsbrowserpackageraw"/> */}
      <Script src="microsoft.cognitiveservices.speech.sdk.bundle.js"/>
    </div>
  )
}
