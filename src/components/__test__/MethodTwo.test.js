import React from 'react';
import { mount } from 'enzyme';
import { Button, MuiThemeProvider } from '@material-ui/core';
import MethodTwo from '../MethodTwo';
import theme from '../../theme';

const props = {}
const wrapper = mount(
  <MuiThemeProvider theme={theme}>
    <MethodTwo {...props} />
  </MuiThemeProvider>
);

describe('MethodTwo', () => {
  it('should render the MethodTwo Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the MethodTwo Component should contain Generate button.', () => {
    expect(wrapper.find(Button).props().children).toBe('Generate');
    expect(wrapper.find(Button).props().id).toBe('generate-btn-method-two');
  });

  it('should render the MethodTwo Component should change the token after click on Generate button.', () => {
    const button = wrapper.find(Button).props()
    expect(button.children).toBe('Generate');
    expect(button.id).toBe('generate-btn-method-two');
    button.onClick()
  });

});