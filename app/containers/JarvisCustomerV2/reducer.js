/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
/*
 *
 * JarvisCustomerV2 reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SAVE_DATA,
  REQUEST_COUNTRIES,
  REQUEST_COUNTRIES_SUCCESS,
  REQUEST_COUNTRIES_FAILURE,
  REQUEST_PROVINCES_SUCCESS,
  REQUEST_PROVINCES_FAILURE,
  SAVE_DATA_SUCCESS,
  SAVE_RAW_DATA,
  REQUEST_SELECTION_SUCCESS,
  REQUEST_COMPANIES_SUCCESS,
  GET_ALL_CARD_SUCCESS,
  GET_BRANCHES_SUCCESS,
  GET_DOC_REQUIRED_SUCCESS,
  GET_DOC_APP_SUCCESS,
  UPLOAD_DOCUMENT_SUCCESS,
  GET_SHOW_VIRTUAL_CARD_SUCCESS,
  SHOW_LOADING,
  HIDE_LOADING,
} from './constants';

export const initialState = {
  loading: false,
  jarvisCustomer: {
    email: '',
    fullName: '',
    mobileNumber: '',
    dob: '',
    gender: 'F',
    nationality: 'VN',
    documentType: '',
    documentNumber: '',
    docIssuedDate: '',
    docIssuedPlace: '',
    permanentAddressLine1: '',
    permanentProvince: '',
    permanentDistrict: '',
    currentIsPermanent: '1',
    currentAddLine1: '',
    currentProvince: '',
    currentDistrict: '',
    maritalStatus: '',
    fullNameRefOne: '',
    birthDateSpouse: '',
    documentTypeSpouse: '',
    documentNumberSpouse: '',
    mobileNumberRefOne: '',
    employmentStatus: '',
    mainIncomeType: '',
    monthlyIncome: '',
    nameOfEmployer: '',
    employerAddressLine: '',
    employerProvince: '',
    employerDistrict: '',
    landlinePhoneNo: '',
    typeCompany: '',
    requestLimit: '',
    typeOfCreditCard: '',
    accInternetBanking: '',
    fullNameRefTwo: '',
    relationRefTwo: '',
    mobileNumberRefTwo: '',
    securityQuestion: '',
    securityAnswer: '',
    deliveryCard: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const jarvisCustomerV2Reducer = (state = initialState, action) =>
  produce(state, () => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SAVE_DATA:
        return {
          ...state,
          jarvisCustomer: {
            ...state.jarvisCustomer,
            ...action.payload,
          },
        };
      case SAVE_RAW_DATA:
        return {
          ...state,
          jarvisCustomer: {
            ...state.jarvisCustomer,
            ...action.payload,
          },
        };
      case REQUEST_COUNTRIES:
        return { ...state, fetching: true, error: null };
      case REQUEST_COUNTRIES_SUCCESS:
        return { ...state, countries: action.payload };
      case REQUEST_COUNTRIES_FAILURE:
        return { ...state, countries: [] };
      case REQUEST_PROVINCES_SUCCESS:
        return { ...state, provinces: action.payload };
      case REQUEST_SELECTION_SUCCESS:
        return { ...state, selections: action.payload };
      case REQUEST_PROVINCES_FAILURE:
        return { ...state, provinces: [] };
      case REQUEST_COMPANIES_SUCCESS:
        return { ...state, companies: action.payload };
      case GET_ALL_CARD_SUCCESS:
        return { ...state, cards: action.payload };
      case GET_BRANCHES_SUCCESS:
        return { ...state, branches: action.payload };
      case GET_DOC_REQUIRED_SUCCESS:
        return { ...state, docRequired: action.payload };
      case GET_DOC_APP_SUCCESS:
        return { ...state, documents: action.payload };
      case GET_SHOW_VIRTUAL_CARD_SUCCESS:
        return { ...state, showVirtualCard: action.payload };
      case SHOW_LOADING:
        return { ...state, loading: true };
      case HIDE_LOADING:
        return { ...state, loading: false };
      case UPLOAD_DOCUMENT_SUCCESS:
        const { documents } = state;
        documents.push(action.payload);
        return {
          ...state,
          documents,
        };
      case SAVE_DATA_SUCCESS:
        return {
          ...state,
          jarvisCustomer: {
            ...state.jarvisCustomer,
            ...action.payload,
          },
        };
    }
  });

export default jarvisCustomerV2Reducer;
