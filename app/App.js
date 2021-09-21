import React from 'react';
import {Provider} from 'react-redux';
import store from './src/core/store/index';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/core/styles/index';
import {Navigation} from './navigation';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}
