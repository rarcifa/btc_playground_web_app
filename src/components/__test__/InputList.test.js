import React from 'react';
import { mount, shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core';
import InputList from '../InputList/InputList';
import theme from '../../theme';

const wrapper = shallow(
  <MuiThemeProvider theme={theme}>
    <InputList />
  </MuiThemeProvider>
);

describe('InputList', () => {
  it('should render the Label Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

});