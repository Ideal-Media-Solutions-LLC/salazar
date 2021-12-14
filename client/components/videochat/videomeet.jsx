// video meeting component for video chat
import React, { useState } from 'react';


export default function VideoMeet({embedURL}) {

  return (
    <div id="videoComponent">
      <iframe id="jitsiMeetIframe" allow="camera; microphone; fullscreen; display-capture; autoplay" src={embedURL} ></iframe>
      
    </div>
  )
}
