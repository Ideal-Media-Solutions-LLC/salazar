import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';


const Contact = (props) => {

  const {handleListItemClick, handleContactClick, selectedIndex} = props;


  return (
    <ListItem button key={props.index} onClick={() => {
      handleContactClick(props.contactId, '1');
      handleListItemClick(props.contactId);

    }
      }>
        <ListItemIcon>
            <Avatar selected={selectedIndex === props.contactId} alt={props.name} src="https://material-ui.com/static/images/avatar/1.jpg" />
        </ListItemIcon>
        <ListItemText primary={props.name}>{props.name}</ListItemText>
        <Divider />
    </ListItem>
  )

}

export default Contact;