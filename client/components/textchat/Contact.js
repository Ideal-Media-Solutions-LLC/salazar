import React, {useState, useEffect} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import {useApp} from '../context/AppProvider.js';


const Contact = (props) => {

  const {handleListItemClick, handleContactClick, selectedIndex} = props;
  const {user} = useApp();

  var selected = false;

  useEffect(() => {
    selected = props.selectedIndex === props.contactId

  }, [props.selectedIndex])


  return (
    <ListItem button key={props.index} onClick={() => {
      handleContactClick(props.contactId, user.uid );
      handleListItemClick(props.contactId);

    }
      }>
        {window.innerWidth > 400? <ListItemIcon>
            <Avatar selected={selected} alt={props.name} src="https://material-ui.com/static/images/avatar/1.jpg" />
        </ListItemIcon> : null}

        <ListItemText primary={props.name}>{props.name}</ListItemText>
        <Divider />
    </ListItem>
  )

}

export default Contact;