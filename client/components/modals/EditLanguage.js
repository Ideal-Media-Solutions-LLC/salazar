import React, { useState } from 'react';
import { Switch, DatePicker, Button, Input, Modal } from 'antd';


const EditLanguage = function(props) {





  return (
    <Modal
    visible = {true}
    cancelButtonProps = {{disabled: true}}
    onCancel = {()=> {props.close(null)}}
    title = 'Edit Languages'
    footer = {null}
      >
      <div>
        Languages you speak

      </div>
    </Modal>
  )
}

export default EditLanguage;