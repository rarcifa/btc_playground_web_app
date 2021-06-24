import React from 'react';
import { mount } from 'enzyme';
import { Button, MuiThemeProvider } from '@material-ui/core';
import MethodThree from '../MethodThree';
import theme from '../../theme';

const props = {}
const wrapper = mount(
  <MuiThemeProvider theme={theme}>
    <MethodThree {...props} />
  </MuiThemeProvider>
);

describe('MethodThree', () => {
  it('should render the MethodThree Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render the MethodOne Component should contain Generate button.', () => {
    expect(wrapper.find(Button).props().children).toBe('Generate');
    expect(wrapper.find(Button).props().id).toBe('generate-btn-method-three');
  });

  it('should render the MethodOne Component should change the token after click on Generate button.', () => {
    const button = wrapper.find(Button).props()
    expect(button.children).toBe('Generate');
    expect(button.id).toBe('generate-btn-method-three');
    button.onClick()
  });

});