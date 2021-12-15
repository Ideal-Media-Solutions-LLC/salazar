
function getAudioConfig() {
    // If an audio file was specified, use it. Otherwise, use the microphone.
    // Depending on browser security settings, the user may be prompted to allow microphone use. Using
    // continuous recognition allows multiple phrases to be recognized from a single use authorization.
    // if (audioFile) {
    //     return SpeechSDK.AudioConfig.fromWavFileInput(audioFile);
    // } else if (inputSourceFileRadio.checked) {
    //     alert('Please choose a file when selecting file input as your audio source.');
    //     return;
    // } else if (microphoneSources.value) {
    //     return SpeechSDK.AudioConfig.fromMicrophoneInput(microphoneSources.value);
    // } else {
    //     return SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    // }
    
    //var playbackElement = document.getElementById("ytframe");
    // var playbackElement = document.getElementById("ytframe").contentWindow.document.getElementsByTagName("video")[0];
    // var captureStream = playbackElement.captureStream();

    return SpeechSDK.AudioConfig.fromStreamInput(capstream);
}

function getSpeechConfig(sdkConfigType) {
    var speechConfig;
    if (authorizationToken) {
        speechConfig = sdkConfigType.fromAuthorizationToken(authorizationToken, regionOptions.value);
    } else if (!key.value) {
        alert("Please enter your Cognitive Services Speech subscription key!");
        return undefined;
    } else {
        speechConfig = sdkConfigType.fromSubscription(key.value, regionOptions.value);
    }

    // Setting the result output format to Detailed will request that the underlying
    // result JSON include alternates, confidence scores, lexical forms, and other
    // advanced information.
    if (useDetailedResults && sdkConfigType != SpeechSDK.SpeechConfig) {
        window.console.log('Detailed results are not supported for this scenario.\r\n');
        document.getElementById('formatSimpleRadio').click();
    } else if (useDetailedResults) {
        speechConfig.outputFormat = SpeechSDK.OutputFormat.Detailed;
    }

    // Defines the language(s) that speech should be translated to.
    // Multiple languages can be specified for text translation and will be returned in a map.
    if (sdkConfigType == SpeechSDK.SpeechTranslationConfig) {
        speechConfig.addTargetLanguage(languageTargetOptions.value.split("(")[1].substring(0, 5));
    }

    speechConfig.speechRecognitionLanguage = languageOptions.value;
    return speechConfig;
}

function getPronunciationAssessmentConfig() {
    var pronunciationAssessmentConfig = new SpeechSDK.PronunciationAssessmentConfig(referenceText.value,
        SpeechSDK.PronunciationAssessmentGradingSystem.HundredMark,
        SpeechSDK.PronunciationAssessmentGranularity.Word, true);
    return pronunciationAssessmentConfig;
}

function onRecognizing(sender, recognitionEventArgs) {
    var result = recognitionEventArgs.result;
    statusDiv.innerHTML += `(recognizing) Reason: ${SpeechSDK.ResultReason[result.reason]}`
        + ` Text: ${result.text}\r\n`;
    // Update the hypothesis line in the phrase/result view (only have one)
    phraseDiv.innerHTML = phraseDiv.innerHTML.replace(/(.*)(^|[\r\n]+).*\[\.\.\.\][\r\n]+/, '$1$2')
        + `${result.text} [...]\r\n`;
    phraseDiv.scrollTop = phraseDiv.scrollHeight;
}

function onRecognized(sender, recognitionEventArgs) {
    var result = recognitionEventArgs.result;
    onRecognizedResult(recognitionEventArgs.result);
}

function onRecognizedResult(result) {
    phraseDiv.scrollTop = phraseDiv.scrollHeight;

    statusDiv.innerHTML += `(recognized)  Reason: ${SpeechSDK.ResultReason[result.reason]}`;
    if (scenarioSelection.value === 'speechRecognizerRecognizeOnce'
        || scenarioSelection.value === 'intentRecognizerRecognizeOnce') {
        // Clear the final results view for single-shot scenarios
        phraseDiv.innerHTML = '';
    } else {
        // Otherwise, just remove the ongoing hypothesis line
        phraseDiv.innerHTML = phraseDiv.innerHTML.replace(/(.*)(^|[\r\n]+).*\[\.\.\.\][\r\n]+/, '$1$2');
    }

    switch (result.reason) {
        case SpeechSDK.ResultReason.NoMatch:
            var noMatchDetail = SpeechSDK.NoMatchDetails.fromResult(result);
            statusDiv.innerHTML += ` NoMatchReason: ${SpeechSDK.NoMatchReason[noMatchDetail.reason]}\r\n`;
            break;
        case SpeechSDK.ResultReason.Canceled:
            var cancelDetails = SpeechSDK.CancellationDetails.fromResult(result);
            statusDiv.innerHTML += ` CancellationReason: ${SpeechSDK.CancellationReason[cancelDetails.reason]}`;
                + (cancelDetails.reason === SpeechSDK.CancellationReason.Error 
                    ? `: ${cancelDetails.errorDetails}` : ``)
                + `\r\n`;
            break;
        case SpeechSDK.ResultReason.RecognizedSpeech:
        case SpeechSDK.ResultReason.TranslatedSpeech:
        case SpeechSDK.ResultReason.RecognizedIntent:
            statusDiv.innerHTML += `\r\n`;

            if (useDetailedResults) {
                var detailedResultJson = JSON.parse(result.json);

                // Detailed result JSON includes substantial extra information:
                //  detailedResultJson['NBest'] is an array of recognition alternates
                //  detailedResultJson['NBest'][0] is the highest-confidence alternate
                //  ...['Confidence'] is the raw confidence score of an alternate
                //  ...['Lexical'] and others provide different result forms
                var displayText = detailedResultJson['DisplayText'];
                phraseDiv.innerHTML += `Detailed result for "${displayText}":\r\n`
                + `${JSON.stringify(detailedResultJson, null, 2)}\r\n`;
            } else if (result.text) {
                phraseDiv.innerHTML += `${result.text}\r\n`;
            }

            var intentJson = result.properties
                .getProperty(SpeechSDK.PropertyId.LanguageUnderstandingServiceResponse_JsonResult);
            if (intentJson) {
                phraseDiv.innerHTML += `${intentJson}\r\n`;
            }

            if (result.translations) {
                var resultJson = JSON.parse(result.json);
                resultJson['privTranslationPhrase']['Translation']['Translations'].forEach(
                    function (translation) {
                    phraseDiv.innerHTML += ` [${translation.Language}] ${translation.Text}\r\n`;
                });
            }

            if (scenarioSelection.value.includes('pronunciation')) {
                var pronunciationAssessmentResult = SpeechSDK.PronunciationAssessmentResult.fromResult(result);
                phraseDiv.innerHTML += 
                `[Pronunciation result] Accuracy: ${pronunciationAssessmentResult.accuracyScore}; 
              Fluency: ${pronunciationAssessmentResult.fluencyScore};
              Completeness: ${pronunciationAssessmentResult.completenessScore}.\n`;
                pronunciationAssessmentResults.push(pronunciationAssessmentResult);
            }
            break;
    }
}

function onSessionStarted(sender, sessionEventArgs) {
    statusDiv.innerHTML += `(sessionStarted) SessionId: ${sessionEventArgs.sessionId}\r\n`;

    for (const thingToDisableDuringSession of thingsToDisableDuringSession) {
        thingToDisableDuringSession.disabled = true;
    }

    scenarioStartButton.disabled = true;
    scenarioStopButton.disabled = false;
}

function onSessionStopped(sender, sessionEventArgs) {
    statusDiv.innerHTML += `(sessionStopped) SessionId: ${sessionEventArgs.sessionId}\r\n`;

    if (scenarioSelection.value == 'pronunciationAssessmentContinuous') {
        calculateOverallPronunciationScore();
    }

    for (const thingToDisableDuringSession of thingsToDisableDuringSession) {
        thingToDisableDuringSession.disabled = false;
    }

    scenarioStartButton.disabled = false;
    scenarioStopButton.disabled = true;
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
    if (phrases.value) {
        var phraseListGrammar = SpeechSDK.PhraseListGrammar.fromRecognizer(recognizer);
        phraseListGrammar.addPhrases(phrases.value.split(";"));
    }
}

function calculateOverallPronunciationScore() {
    if (difflib === undefined) {
        phraseDiv.innerHTML += `ERROR: difflib-browser.js is needed for pronunciation assessment calculation; see https://github.com/qiao/difflib.js`;
    }
    // strip punctuation
    var referenceWords = referenceText.value.toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"");
    referenceWords = referenceWords.split(' ');

    var recognizedWords = [];
    var sumDuration = 0;
    var sumAccuracy = 0;
    var sumFluency = 0;
    for (const result of pronunciationAssessmentResults) {
        var duration = 0;
        for (const word of result.detailResult.Words) {
            recognizedWords.push(word.Word);
            duration += word.Duration;
        }
        sumDuration += duration;
        sumAccuracy += duration * result.accuracyScore;
        sumFluency += duration * result.fluencyScore;
    }

    // weighted accuracy and fluency scores
    var accuracy = sumAccuracy / sumDuration;
    var fluency = sumFluency / sumDuration;

    var diff = new difflib.SequenceMatcher(null, referenceWords, recognizedWords);
    diffWordsNum = 0;
    for (const d of diff.getOpcodes()) {
        if (d[0] == 'delete' || d[0] == 'replace') {
            diffWordsNum += (d[2] - d[1]);
        }
    }

    var completeness = (1 - diffWordsNum / referenceWords.length) * 100;

    phraseDiv.innerHTML +=
        `[Overall Pronunciation result] Accuracy: ${accuracy}; 
              Fluency: ${fluency};
              Completeness: ${completeness}.\n`;
}
