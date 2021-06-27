import * as React from 'react';
import { InputAdornment } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

function Clipboard() {

    return (
        <InputAdornment position="start">
            <IconButton 
            aria-label="toggle password visibility"
            onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}>
                <FileCopyOutlinedIcon />
            </IconButton>
        </InputAdornment>
    );
}

export default Clipboard;