// video meeting component for video chat
import React, { useState } from 'react';


export default function VideoMeet({meetString}) {

  return (
    <div id="videoComponent" style={{width: '80wh', height: '50vh'}}>
      <iframe id="jitsiMeetIframe" allow="camera; microphone; fullscreen; display-capture; autoplay" src={"https://meet.jit.si/" + meetString}  style={{width: '80vw', height: '50vh'}}></iframe>
    </div>
  )
}
