import React, {useEffect} from 'react';
import {Platform, PermissionsAndroid, TextInput} from 'react-native';
import {
  Container,
  PrimaryButton,
  StyledDividerVertical,
  StyledPicker,
  StyledText,
  StyledTextInput,
  StyledViewForPicker,
} from '../../core/styles';

import Geolocation from '@react-native-community/geolocation';

const Welcome = () => {
  return (
    <Container type="column">
      <StyledText mode="light" type="large">
        Seja bem-vindo ao
      </StyledText>
      <StyledDividerVertical />
      <StyledText mode="light" type="huge" bold>
        e-nergy
      </StyledText>
      <StyledText mode="light" type="huge" bold>
        shop
      </StyledText>
      <StyledDividerVertical />
      <StyledText mode="light" type="large" alignCenter>
        Vamos começar com uma simulação para direcionarmos você da melhor maneira possível.
      </StyledText>
    </Container>
  );
};

const UserInformation = props => {
  const availableStates = require('./states.json');
  const availableCities = require('./cities.json');

  useEffect(() => {
    callLocation();
  }, []);

  const callLocation = async () => {
    if (Platform.OS === 'ios') {
      getLocation();
    } else {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Permissão de Acesso à Localização',
        message: 'Este aplicativo precisa acessar sua localização para calcular custo estimado de khW.',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      }
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(position => {
      console.log(position);
    });
  };

  return (
    <Container type="column">
      <StyledText mode="light">Selecione seu estado:</StyledText>
      <StyledViewForPicker>
        <StyledPicker selectedValue={props.state} onValueChange={(itemValue, itemIndex) => props.setState(itemValue)}>
          {availableStates.map(val => <StyledPicker.Item key={val.Id} label={val.Name} value={val.Value} />)}
        </StyledPicker>
      </StyledViewForPicker>
      <StyledDividerVertical />
      <StyledText mode="light">Selecione sua cidade:</StyledText>
      <StyledViewForPicker>
        <StyledPicker selectedValue={props.city} onValueChange={(itemValue, itemIndex) => props.setCity(itemValue)}>
          {props.state !== undefined &&
            props.state !== null &&
            availableCities[props.state].map(val => (
              <StyledPicker.Item key={val.Id} label={val.Name} value={val.Value} />
            ))}
        </StyledPicker>
      </StyledViewForPicker>
    </Container>
  );
};

const BillInformation = props => {
  return (
    <Container type="column">
      <StyledText mode="light">Qual o seu gasto mensal médio com conta de energia?</StyledText>
      <StyledTextInput
        value={props.monthlyBill}
        onChangeText={value => props.setMonthlyBill(value)}
        keyboardType="numeric"
        maskType="currency"
        label="Gasto mensal..."
      />
      <StyledDividerVertical />
      <StyledText mode="light">Residencial ou empresarial?</StyledText>
      <StyledViewForPicker>
        <StyledPicker selectedValue={props.type} onValueChange={(itemValue, itemIndex) => props.setType(itemValue)}>
          <StyledPicker.Item label="Residencial" value="residential" />
          <StyledPicker.Item label="Empresarial" value="enterprise" />
        </StyledPicker>
      </StyledViewForPicker>
    </Container>
  );
};

const FinalResult = props => {
  return (
    <Container type="column">
      <StyledText mode="light" alignCenter>
        Seu gasto mensal é de:{' '}
      </StyledText>
      <StyledText mode="light" type="large" alignCenter>
        {props.kwh.toFixed(2)} kWh
      </StyledText>
      <StyledDividerVertical />
      <StyledText mode="light" alignCenter>
        Tamano do sistema indicado:{' '}
      </StyledText>
      <StyledText mode="light" type="large" alignCenter>
        {props.kwp.toFixed(2)} kWp
      </StyledText>
      <StyledDividerVertical />
      <PrimaryButton mode="contained" secondary onPress={() => props.finish()}>
        Ver Ofertas...
      </PrimaryButton>
    </Container>
  );
};

export {Welcome, UserInformation, BillInformation, FinalResult};
