import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row} from 'react-native-easy-grid';
import Wizard from 'react-native-wizard';
import {Container, FullView, PrimaryButton, StyledDividerHorizontal, StyledText} from '../../core/styles';
import {Welcome, UserInformation, BillInformation, FinalResult} from './Screens';
import {useNavigation} from '@react-navigation/core';
import {calculateKwh, calculateKwp} from '../../core/utils/energy';
import {ActivityIndicator} from 'react-native-paper';

import {suppliersList} from '../../core/store/suppliersSlice';

const Pricing = () => {
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [state, setState] = useState('SP');
  const [city, setCity] = useState('São Paulo');
  const [monthlyBill, setMonthlyBill] = useState();
  const [type, setType] = useState('residential');

  const [result, setResult] = useState({kwh: 0.0, kwp: 0.0});

  const navigation = useNavigation();

  const availableCities = require('./cities.json');

  const dispatch = useDispatch();

  const suppliersData = useSelector(({suppliers}) => suppliers.availableSuppliers);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const stepList = [
    {
      content: (
        <FullView style={{marginHorizontal: 10}}>
          <Welcome />
        </FullView>
      ),
    },
    {
      content: (
        <FullView style={{marginHorizontal: 10}}>
          <UserInformation state={state} setState={setState} city={city} setCity={setCity} />
        </FullView>
      ),
    },
    {
      content: (
        <FullView style={{marginHorizontal: 10}}>
          <BillInformation monthlyBill={monthlyBill} setMonthlyBill={setMonthlyBill} type={type} setType={setType} />
        </FullView>
      ),
    },
    {
      content: (
        <FullView style={{marginHorizontal: 10}}>
          <FinalResult kwh={result.kwh} kwp={result.kwp} finish={() => finish()} />
        </FullView>
      ),
    },
  ];

  const finish = () => {
    setProcessing(true);
  };

  useEffect(
    () => {
      if (processing === true) {
        dispatch(suppliersList(state, city, result.kwp));
        setLoading(true);
      }
    },
    [processing],
  );

  useEffect(
    () => {
      if (suppliersData !== undefined && processing === true) {
        setLoading(false);
        navigation.navigate('Home');
      }
    },
    [suppliersData],
  );

  useEffect(
    () => {
      if (isLastStep === true) {
        const selectedCity = availableCities[state].filter(x => x.Value === city);

        if (selectedCity.length > 0) {
          const taxResidential = selectedCity[0]['TaxResidential'];
          const taxEnterprise = selectedCity[0]['TaxEnterprise'];

          let kwh = calculateKwh(type === 'residential' ? taxResidential : taxEnterprise, parseFloat(monthlyBill));
          let kwp = calculateKwp(kwh);

          setResult({kwh: kwh, kwp: kwp});
        }
      }
    },
    [isLastStep],
  );

  return (
    <Container justify="start" type="column">
      <Row size={90}>
        <Wizard
          ref={wizard}
          steps={stepList}
          isFirstStep={val => setIsFirstStep(val)}
          isLastStep={val => setIsLastStep(val)}
          currentStep={({currentStep, isLastStep, isFirstStep}) => {
            setCurrentStep(currentStep);
          }}
        />
      </Row>
      <Row size={10} style={{backgroundColor: '#000'}}>
        <Container justify="center" type="row">
          <PrimaryButton mode="contained" disabled={isFirstStep} onPress={() => wizard.current.prev()}>
            Anterior
          </PrimaryButton>
          <StyledDividerHorizontal />
          <StyledText mode="light">
            {currentStep + 1} / {stepList.length}
          </StyledText>
          <StyledDividerHorizontal />
          <PrimaryButton mode="contained" disabled={isLastStep} onPress={() => wizard.current.next()}>
            Próximo
          </PrimaryButton>
        </Container>
      </Row>
      <ActivityIndicator
        style={{position: 'absolute', width: 200, height: 200}}
        color="red"
        size="large"
        animating={loading}
      />
    </Container>
  );
};

export default Pricing;
