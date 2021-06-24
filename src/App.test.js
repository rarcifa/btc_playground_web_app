import React from 'react';
import { mount, shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core';
import App from './App';
import theme from './theme';

const props = {};

const wrapper = mount(
  <MuiThemeProvider theme={theme}>
    <App {...props}/>
  </MuiThemeProvider>
);

describe('App', () => {
  it('should render the App Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});