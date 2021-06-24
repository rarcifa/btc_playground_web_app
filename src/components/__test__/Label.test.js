import React from 'react';
import { shallow } from 'enzyme';
import { InputLabel, MuiThemeProvider } from '@material-ui/core';
import Label from './../Label';
import theme from './../../theme';

const wrapper = shallow(
  <MuiThemeProvider theme={theme}>
    <Label />
  </MuiThemeProvider>
);

describe('Label', () => {
  it('should render the Label Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});