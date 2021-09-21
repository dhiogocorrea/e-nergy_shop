import React from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {IconButton, List} from 'react-native-paper';
import {PrimaryButton} from '../../core/styles';

const ESList = ({data}) => {
  var width = Dimensions.get('window').width;
  var height = Dimensions.get('window').height;

  const renderValue = value => {
    return (
      <List.Item
        key={value.id}
        title={value.title}
        description={value.description}
        descriptionNumberOfLines={5}
        left={props => <List.Icon {...props} icon="folder" />}
        right={props => (
          <PrimaryButton mode="text" color="blue" onPress={() => value.action()}>
            Contratar
          </PrimaryButton>
        )}
      />
    );
  };

  return (
    <ScrollView style={{width: width, height: 500}}>{data !== null && data.map(val => renderValue(val))}</ScrollView>
  );
};

export default ESList;
