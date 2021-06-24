import React from 'react';
import { mount, shallow } from 'enzyme';
import { Button, MuiThemeProvider } from '@material-ui/core';
import MethodOne from '../MethodOne';
import theme from '../../theme';

const props = {}
const wrapper = mount(
  <MuiThemeProvider theme={theme}>
    <MethodOne {...props}/>
  </MuiThemeProvider>
);

describe('MethodOne', () => {
  it('should render the MethodOne Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the MethodOne Component should contain Generate button.', () => {
    expect(wrapper.find(Button).props().children).toBe('Generate');
    expect(wrapper.find(Button).props().id).toBe('generate-btn');
  });

  it('should render the MethodOne Component should change the token after click on Generate button.', () => {
    const button = wrapper.find(Button).props()
    expect(button.children).toBe('Generate');
    button.onClick()
  });

}); 