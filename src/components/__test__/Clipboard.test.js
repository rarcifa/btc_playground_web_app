import React from 'react';
import { mount, shallow } from 'enzyme';
import { IconButton, InputAdornment, MuiThemeProvider } from '@material-ui/core';
import { FileCopyOutlinedIcon } from '@material-ui/icons';
import Clipboard from './../Clipboard';
import theme from './../../theme';

const wrapper = shallow(
  <MuiThemeProvider theme={theme}>
    <Clipboard/>
  </MuiThemeProvider>
)

describe('Clipboard', () => {
  it('should render the Clipboard Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});