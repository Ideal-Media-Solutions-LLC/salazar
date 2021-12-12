function Initialize(onComplete) {
  if (!!window.SpeechSDK) {
      document.getElementById('content').style.display = 'block';
      document.getElementById('warning').style.display = 'none';
      onComplete(window.SpeechSDK);
  }
}