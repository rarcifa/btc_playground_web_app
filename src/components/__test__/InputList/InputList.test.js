import React from 'react';
import { mount } from 'enzyme';
import { Button, Container, MuiThemeProvider, OutlinedInput, TextField, HighlightOffIcon, IconButton } from '@material-ui/core';
import InputList from '../../InputList/InputList';
import theme from '../../../theme';

const props = {}
const wrapper = mount(
  <MuiThemeProvider theme={theme}>
    <InputList {...props}/>
  </MuiThemeProvider>
)

const eventWithNumberValue = {
  preventDefault() {},
  target: { value: 2 }
};

const eventWithStrValue = {
  preventDefault() {},
  currentTarget: { name: 'publicKeys', value: 'eventWithStrValue value testing ' },
  target: { name: 'publicKeys', value: 'eventWithStrValue value testing ' }
};

describe('InputList', () => {
  it('should render the InputList Component correctly', () => {
    expect(wrapper).toBeTruthy();
  });


  it('should render the InputList Component should contain input-list-container.', () => {
    expect(wrapper.find(Container).props().id).toBe('input-list-container');
  });

  it('should render the InputList Component should contain standard-select-currency text field.', () => {
    const standardSelectCurrencyTextField = wrapper.find(TextField);
    expect(standardSelectCurrencyTextField.props().id).toBe('standard-select-currency');
    standardSelectCurrencyTextField.simulate('change', eventWithNumberValue);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the InputList Component should trigger click.', () => {
    const outlinedAdornmentAmount = wrapper.find(OutlinedInput);
    const outlinedAdornmentAmountBtn = outlinedAdornmentAmount.find(Button);
    outlinedAdornmentAmountBtn.simulate('click', eventWithStrValue);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the InputList Component should trigger click outlinedAdornmentAmount.', () => {
    const outlinedAdornmentAmount = wrapper.find(OutlinedInput);
    const outlinedAdornmentAmountBtn = outlinedAdornmentAmount.find(Button);
    outlinedAdornmentAmountBtn.simulate('click', eventWithStrValue);
    expect(wrapper).toMatchSnapshot();
  });


  it('should render the InputList Component should trigger HighlightOffIcon click.', () => {
    const highlightOffIcon = wrapper.find(IconButton);
    expect(highlightOffIcon).toBeTruthy();
  });

});