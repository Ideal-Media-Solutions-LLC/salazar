import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const Message = (props) => {

  var user_id = Object.keys(props.message)[0];
  var text = Object.values(props.message)[0];

  const loggedin_id = '1';

  var alignment = user_id === loggedin_id ? 'right' : 'left';



  return (
    <ListItem key={props.index}>
        <Grid container>
            <Grid item xs={12}>
                 <ListItemText align={alignment} primary={text}></ListItemText>
             </Grid>
            <Grid item xs={12}>
                <ListItemText align={alignment} secondary="09:30"></ListItemText>
            </Grid>
         </Grid>
    </ListItem>
  )

}

export default Message;