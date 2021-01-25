/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import _ from 'lodash';
import Select, { components } from 'react-select';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import JarvisFormStyle from './JarvisFormStyle';
import * as Actions from '../../actions';

const { ValueContainer, Placeholder } = components;

const useStyles = makeStyles(() => ({
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    minHeight: '100vh',
    marginTop: '16px',
  },
  titleHeader: {
    fontSize: '24px',
    width: '100%',
    textAlign: 'left',
    paddingLeft: '16px',
    marginTop: '16px',
    marginBottom: '36px',
  },
  secondHeader: {
    fontSize: '16px',
    width: '100%',
    textAlign: 'center',
    paddingLeft: '16px',
    paddingRight: '24px',
  },
  action: {
    width: '100%',
    height: '46px',
    borderRadius: '4px',
    paddingLeft: '16px',
    paddingRight: '16px',
    marginTop: '16px',
    marginBottom: '16px',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
  },
  genderContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  lableStyle: {
    fontSize: '16px',
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

const customStyles = {
  container: (provided) => ({
    ...provided,
    marginTop: 48
  }),
  menu: (provided, state) => ({
    ...provided,
    width: '100vw',
    borderBottom: '1px dotted pink',
    color: state.selectProps.menuColor,
    padding: 20,
    zIndex: '100000',
    display: 'flex',
  }),

  control: () => ({
    width: '90vw',
    display: 'flex',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    height: '56px',
    borderRadius: '4px',
  }),

  valueContainer: (provided) => ({
    ...provided,
    overflow: "visible"
  }),

  placeholder: (provided, state) => ({
    ...provided,
    position: "absolute",
    top: state.hasValue || state.selectProps.inputValue ? -24 : "50%",
    transition: "top 0.1s, font-size 0.1s",
    fontSize: 16,
    marginLeft: '-8px'
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

const CITY = [
  { value: 'hn', label: 'Hà Nội' },
  { value: 'hcm', label: 'Hồ chí minh' },
  { value: 'dn', label: 'Đà nẵng' },
  { value: 'hp', label: 'Hải phòng' },
  { value: 'bn', label: 'Bắc Ninh' },
  { value: 'other', label: 'Khác' },
];

const NATIONAL = [
  { value: 'vn', label: 'Việt Nam' },
  { value: 'hcm', label: 'England' },
  { value: 'dn', label: 'American' },
  { value: 'hp', label: 'Poland' },
  { value: 'bn', label: 'Singapore' },
  { value: 'other', label: 'China' },
];

const PLACE = [
  { value: 'vn', label: 'Công an tỉnh' },
  { value: 'hcm', label: 'Cục dữ liệu quốc gia về dân cư' },
  { value: 'dn', label: 'Cục cư trú' },
];

const DISTRICT = [
  { value: 'hn', label: 'Hoàng Mai' },
  { value: 'hbt', label: 'Hai bà trưng' },
  { value: 'lc', label: 'Lê chân' },
  { value: 'hc', label: 'Hải châu' },
  { value: 'ltn', label: 'Lê thanh nghị' },
  { value: 'other', label: 'Khác' },
];

const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  { code: 'AE', label: 'United Arab Emirates', phone: '971' },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  { code: 'AU', label: 'Australia', phone: '61', suggested: true },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  { code: 'BA', label: 'Bosnia and Herzegovina', phone: '387' },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  { code: 'CA', label: 'Canada', phone: '1', suggested: true },
  { code: 'CC', label: 'Cocos (Keeling) Islands', phone: '61' },
  { code: 'CD', label: 'Congo, Democratic Republic of the', phone: '243' },
  { code: 'CF', label: 'Central African Republic', phone: '236' },
  { code: 'CG', label: 'Congo, Republic of the', phone: '242' },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  { code: 'DE', label: 'Germany', phone: '49', suggested: true },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  { code: 'DO', label: 'Dominican Republic', phone: '1-809' },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  { code: 'FK', label: 'Falkland Islands (Malvinas)', phone: '500' },
  { code: 'FM', label: 'Micronesia, Federated States of', phone: '691' },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  { code: 'FR', label: 'France', phone: '33', suggested: true },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  { code: 'GS', label: 'South Georgia and the South Sandwich Islands', phone: '500' },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  { code: 'HM', label: 'Heard Island and McDonald Islands', phone: '672' },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  { code: 'IO', label: 'British Indian Ocean Territory', phone: '246' },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  { code: 'IR', label: 'Iran, Islamic Republic of', phone: '98' },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  { code: 'JP', label: 'Japan', phone: '81', suggested: true },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  { code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869' },
  { code: 'KP', label: "Korea, Democratic People's Republic of", phone: '850' },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  { code: 'LA', label: "Lao People's Democratic Republic", phone: '856' },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  { code: 'MD', label: 'Moldova, Republic of', phone: '373' },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  { code: 'MF', label: 'Saint Martin (French part)', phone: '590' },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  { code: 'MK', label: 'Macedonia, the Former Yugoslav Republic of', phone: '389' },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  { code: 'MP', label: 'Northern Mariana Islands', phone: '1-670' },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  { code: 'PM', label: 'Saint Pierre and Miquelon', phone: '508' },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  { code: 'PS', label: 'Palestine, State of', phone: '970' },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  { code: 'SJ', label: 'Svalbard and Jan Mayen', phone: '47' },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  { code: 'ST', label: 'Sao Tome and Principe', phone: '239' },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  { code: 'SX', label: 'Sint Maarten (Dutch part)', phone: '1-721' },
  { code: 'SY', label: 'Syrian Arab Republic', phone: '963' },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  { code: 'TC', label: 'Turks and Caicos Islands', phone: '1-649' },
  { code: 'TD', label: 'Chad', phone: '235' },
  { code: 'TF', label: 'French Southern Territories', phone: '262' },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  { code: 'TT', label: 'Trinidad and Tobago', phone: '1-868' },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  { code: 'TW', label: 'Taiwan, Province of China', phone: '886' },
  { code: 'TZ', label: 'United Republic of Tanzania', phone: '255' },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  { code: 'US', label: 'United States', phone: '1', suggested: true },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  { code: 'VA', label: 'Holy See (Vatican City State)', phone: '379' },
  { code: 'VC', label: 'Saint Vincent and the Grenadines', phone: '1-784' },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  { code: 'VG', label: 'British Virgin Islands', phone: '1-284' },
  { code: 'VI', label: 'US Virgin Islands', phone: '1-340' },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  national: yup
    .object()
    .nullable()
    .required('Quốc tịch là bắt buộc'),
  gender: yup
    .object()
    .nullable()
    .required('Bạn chưa chọn giới tính'),
  passportNumber: yup.string().required('Bạn chưa nhập số giấy tờ'),
  issueDate: yup.string().required('Bạn chưa nhập số giấy tờ'),
  permanentAddress: yup.object({
    addressDetail: yup.string().required('Bạn chưa nhập địa chỉ chi tiết'),
    district: yup.object().required('Bạn chưa chọn quận'),
    province: yup.object().required('Bạn chưa chọn thành phố'),
  }),
  placeOfIssue: yup
    .object()
    .nullable()
    .required('Bạn chưa chọn nơi cấp giấy tờ'),
});

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
      .toUpperCase()
      .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

export default function Round1(props) {
  const classes = useStyles();
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const { handleSubmit, errors, control } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      ...jarvisCustomer,
      national: {
        value: 'vn',
        label: 'Việt Nam',
      },
      fullName: jarvisCustomer.fullName,
      gender: {
        value: 'female',
        label: 'Nữ',
      },
      passportNumber: '123250524',
      issueDate: moment()
        .subtract(2, 'years')
        .format('yyyy-MM-DD'),
      placeOfIssue: {
        value: 'hcm',
        label: 'Cục dữ liệu quốc gia về dân cư',
      },
    },
    resolver: yupResolver(schema),
  });

  function onSubmitForm(values) {
    props.dispatch(Actions.saveData(values));
    props.setStep(8);
  }

  return (
    <JarvisFormStyle>
      <Header className="header" step={2} showStep />
      <div className={classes.formContainer}>
        <div className={classes.titleHeader}>Thông tin cá nhân</div>
        <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="formWrapper">
            <div className="form-group">
              {/* <label className={classes.lableStyle}>Quốc tịch</label> */}
              {/* <Controller
                as={Select}
                options={NATIONAL}
                name="national"
                isClearable
                control={control}
                components={{
                  ValueContainer: CustomValueContainer
                }}
                styles={customStyles}
                menuColor='black'
                placeholder="Quốc tịch"
              /> */}
              <Autocomplete
                id="country-select-demo"
                style={{ width: '90vw' }}
                options={countries}
                classes={{
                  option: classes.option,
                }}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(option) => (
                  <React.Fragment>
                    <span>{countryToFlag(option.code)}</span>
                    {option.label} ({option.code}) +{option.phone}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Quốc gia"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />

              {errors.national && (
                <span className="formError">{errors.national.message}</span>
              )}
            </div>
            <div className="form-group">
              <Controller as={TextField} name="fullName" fullWidth variant="outlined" label="Họ tên" control={control} />
              {errors.fullName && (
                <span className="formError">{errors.fullName.message}</span>
              )}
            </div>
            <div className="form-group">
              <Controller
                name="gender"
                control={control}
                render={({ value, onChange }) => (
                  <FormControl component="fieldset">
                    <FormLabel component="legend" className={classes.labelStyle}>Giới tính</FormLabel>
                    <RadioGroup aria-label="gender" name="gender" value={value} onChange={onChange} className={classes.genderContainer}>
                      <FormControlLabel value="male" control={<Radio />} label="Nam" />
                      <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
              {errors.gender && (
                <span className="formError">{errors.gender.message}</span>
              )}
            </div>

            <div className="form-group">
              <Controller as={TextField} name="passportNumber" type="number" fullWidth variant="outlined" label="Số CMND" control={control} />
              {errors.passportNumber && (
                <span className="formError">{errors.passportNumber.message}</span>
              )}
            </div>

            <div className="form-group">
              <Controller as={TextField} name="issueDate" type="date" fullWidth variant="outlined" label="Ngày cấp" control={control} />
              {errors.issueDate && (
                <span className="formError">{errors.issueDate.message}</span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="placeOfIssue"
                control={control}
                render={({ value, onChange }) => (
                  // <Select
                  //   className="formControl"
                  //   options={PLACE}
                  //   onChange={e => onChange(e)}
                  //   value={value}
                  //   styles={customStyles}
                  //   placeholder="Nơi cấp"
                  //   components={{
                  //     ValueContainer: CustomValueContainer
                  //   }}
                  // />
                  <Autocomplete
                    style={{ width: '90vw' }}
                    options={PLACE}
                    classes={{
                      option: classes.option,
                    }}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nơi cấp"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.placeOfIssue && (
                <span className="formError">{errors.placeOfIssue.message}</span>
              )}
            </div>

            <div className="form-group">
              <Controller as={TextField} name="permanentAddress.addressDetail" type="text" fullWidth variant="outlined" label="Địa chỉ thường trú" control={control} />
              {errors.permanentAddress &&
              errors.permanentAddress.addressDetail && (
                <span className="formError">
                  {errors.permanentAddress.addressDetail.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="permanentAddress.district"
                control={control}
                render={({ value, onChange }) => (
                  // <Select
                  //   className="formControl"
                  //   options={DISTRICT}
                  //   onChange={e => onChange(e)}
                  //   value={value}
                  //   styles={customStyles}
                  //   placeholder="Quận"
                  //   components={{
                  //     ValueContainer: CustomValueContainer
                  //   }}
                  // />
                  <Autocomplete
                    style={{ width: '90vw' }}
                    options={DISTRICT}
                    classes={{
                      option: classes.option,
                    }}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Quận"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.permanentAddress && errors.permanentAddress.district && (
                <span className="formError">
                  {errors.permanentAddress.district.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <Controller
                name="permanentAddress.province"
                control={control}
                render={({ value, onChange }) => (
                  // <Select
                  //   className="formControl"
                  //   options={CITY}
                  //   onChange={e => onChange(e)}
                  //   value={value}
                  //   styles={customStyles}
                  //   placeholder="Thành phố"
                  //   components={{
                  //     ValueContainer: CustomValueContainer
                  //   }}
                  // />
                  <Autocomplete
                    style={{ width: '90vw' }}
                    options={CITY}
                    classes={{
                      option: classes.option,
                    }}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Thành phố"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.permanentAddress && errors.permanentAddress.province && (
                <span className="formError">
                  {errors.permanentAddress.province.message}
                </span>
              )}
            </div>
            <div className="form-group checkboxWrapper">
              <Controller
                name="currentIsPermanent"
                control={control}
                defaultValue
                rules={{ required: true }}
                render={inputProps =>
                  <Checkbox
                    onChange={e => inputProps.onChange(e.target.checked)}
                    checked={inputProps.value}
                  />
                } // props contains: onChange, onBlur and value
              />
              {' '}
            Địa chỉ thường trú trùng với địa chỉ hiện tại
            </div>
            <button type="submit" className={classes.action}>
            Tiếp tục
            </button>
          </div>
        </form>
      </div>
    </JarvisFormStyle>
  );
}