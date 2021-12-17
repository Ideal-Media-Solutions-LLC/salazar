import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Languages = (props) => {

  return (
    <FormControl style={{width: '175px', marginLeft: '80px'}}  size="small">
        <InputLabel id="demo-simple-select-label">Select a language</InputLabel>
        <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.language}
                  label="language"
                  onChange={props.handleSelect}
      >
          <MenuItem value='zh'>Chinese (Simplified)</MenuItem>
          <MenuItem value='en'>English</MenuItem>
          <MenuItem value='fr'>French</MenuItem>
          <MenuItem value='de'>German</MenuItem>
          <MenuItem value='it'>Italian</MenuItem>
          <MenuItem value='ja'>Japanese</MenuItem>
          <MenuItem value='ko'>Korean</MenuItem>
          <MenuItem value='pt'>Portuguese</MenuItem>
          <MenuItem value='ru'>Russian</MenuItem>
          <MenuItem value='es'>Spanish</MenuItem>
          <MenuItem value='sv'>Swedish</MenuItem>
        </Select>
    </FormControl>


  )

}

export default Languages;