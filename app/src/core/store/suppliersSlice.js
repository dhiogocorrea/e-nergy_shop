import {createSlice} from '@reduxjs/toolkit';

import {get} from '../services/suppliersService';

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState: {
    availableSuppliers: [],
  },
  reducers: {
    setAvailableSuppliers: (state, {payload}) => {
      state.availableSuppliers = payload;
    },
  },
});

const {actions, reducer} = suppliersSlice;
export const {setAvailableSuppliers} = actions;

export const suppliersList = (state, city, kwp) => dispatch => {
  const fakeData = require('./fakedata.json');
  dispatch(setAvailableSuppliers(fakeData));

  // get(state, city, kwp)
  //   .then(response => {
  //     dispatch(setAvailableSuppliers(response.data));
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
};

export default reducer;
