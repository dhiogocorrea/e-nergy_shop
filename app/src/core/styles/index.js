import {Dimensions, View} from 'react-native';
import {Button, Divider, Text, DefaultTheme} from 'react-native-paper';
import {setGlobalStyles, FloatingLabelInput} from 'react-native-floating-label-input';
import {Picker} from '@react-native-picker/picker';
import styled from 'styled-components/native';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    accent: 'yellow',
    text: '#000000',
    disabled: '#C7CEDB',
    light: '#F0F0F0',
    success: '#4BB543',
    danger: '#bf1004',
    dark: '#000000',
  },
  fontSize: {
    small: '12px',
    normal: '14px',
    medium: '16px',
    large: '20px',
    huge: '30px',
  },
};

setGlobalStyles.containerStyles = {
  paddingHorizontal: 10,
  backgroundColor: '#fff',
  minHeight: 40,
  width: '80%',
  borderWidth: 1,
  borderRadius: 8,
  borderColor: '#BF0449',
  margin: 5,
  shadowColor: '#BF0449',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.4,
  shadowRadius: 2.22,
};

setGlobalStyles.labelStyles = {
  color: '#BF0449',
  fontSize: 12,
  paddingHorizontal: 5,
};
setGlobalStyles.inputStyles = {
  color: '#000000',
  minHeight: 40,
  paddingHorizontal: 10,
};

var width = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: ${props => (props.justify === 'start' ? 'flex-start' : 'center')};
  flex-direction: ${props => (props.type === 'column' ? 'column' : 'row')};
`;

export const FullView = styled(View)`
  width: ${width}px;
  height: 100%;
  background-color: ${theme.colors.primary};
`;

export const PrimaryButton = styled(Button)`
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const StyledDividerVertical = styled(Divider)`
  margin-bottom: 15px;
  margin-top: 15px;
`;

export const StyledDividerHorizontal = styled(Divider)`
  margin-left: 5px;
  margin-right: 5px;
`;

export const StyledText = styled(Text)`
  color: ${props =>
    props.mode === 'primary'
      ? theme.colors.primary
      : props.mode === 'danger'
        ? theme.colors.danger
        : props.mode === 'light'
          ? theme.colors.light
          : props.mode === 'success'
            ? theme.colors.success
            : props.mode === 'warning' ? theme.colors.warning : theme.colors.dark};
  font-size: ${props =>
    props.type === 'small'
      ? theme.fontSize.small
      : props.type === 'medium'
        ? theme.fontSize.medium
        : props.type === 'large'
          ? theme.fontSize.large
          : props.type === 'huge' ? theme.fontSize.huge : theme.fontSize.normal}
  text-align: ${props => (props.alignCenter ? 'center' : 'left')};
  font-weight: ${props => (props.bold ? 'bold' : 400)}
`;

export const StyledViewForPicker = styled(View)`
  border-radius: 8px;
  border-width: 1px;
  overflow: hidden;
  width: 90%;
  padding: 0;
  background-color: #FFF;
  border-color: ${theme.colors.primary};
  margin-bottom: 5px;
`;

export const StyledPicker = styled(Picker)`
  background-color: #FFFFFF;
  min-width: 270px;
  width: 80%;
  color: ${theme.colors.primary};
  padding: 12px;
  font-size: ${theme.fontSize.small};
`;

export const StyledTextInput = styled(FloatingLabelInput)`
  margin-bottom: 10px;
  height: 60px;
  width: 200px;
  font-size: ${theme.fontSize.small};
  padding-left: 6px;
`;
