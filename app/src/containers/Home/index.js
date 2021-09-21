import React, {useEffect, useState} from 'react';
import {Row} from 'react-native-easy-grid';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/core';
import {Container, PrimaryButton, StyledDividerVertical, StyledText} from '../../core/styles';
import ESList from '../../components/ESList/index';
import {Alert} from 'react-native';

const Home = () => {
  const navigation = useNavigation();

  const suppliersData = useSelector(({suppliers}) => suppliers.availableSuppliers);

  const [data, setData] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(
    () => {
      if (suppliersData !== undefined && suppliersData.length > 0) {
        let items_ = suppliersData.map(item => {
          return {
            id: item.id,
            title: 'Fornecedor nro. ' + item.id,
            description: mountDescription(item),
            icon: 'folder',
            action: () => subscribe(item),
          };
        });
        setData(items_);
      }
    },
    [suppliersData],
  );

  const mountDescription = item => {
    return `Potência (kWp): ${item['potencia kwp']}\nNro. Painéis: ${item['nro_paineis']}\nGeração média: ${item[
      'geracao_media'
    ]}\nPreço: ${item['preco']}\n${item['city']} / ${item['state']}`;
  };

  const subscribe = item => {
    Alert.alert(
      'Contratação',
      `Recebemos sua intenção de contratar o Fornecedor ${item.id}! Entraremos em contato em breve!`,
    );
  };

  const checkUser = () => {
    AsyncStorage.getItem('budget').then(budget => {
      if (budget === null) {
        navigation.navigate('Pricing');
      }
    });
  };

  const goToPricing = () => {
    navigation.navigate('Pricing');
  };

  return (
    <Container justify="center" type="column" style={{borderHorizontal: 20}}>
      <Row size={10} style={{paddingTop: 20}}>
        <StyledText size="medium" alignCenter>
          Fornecedores sugeridos para suas necessidades:
        </StyledText>
        <StyledDividerVertical />
      </Row>
      <ESList data={data} />
      <Row size={10}>
        <PrimaryButton onPress={() => goToPricing()}>Estimar novamente</PrimaryButton>
      </Row>
    </Container>
  );
};

export default Home;
