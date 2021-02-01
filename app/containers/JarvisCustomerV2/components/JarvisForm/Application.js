/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Round1 from './Round1';
import Roun1FillInfo from './Roun1FillInfo';
import Round2OCR from './Round2OCR';
import Round2OCRBack from './Round2OCRBack';
import Round2OCRGuide from './Round2OCRGuide';
import Round2Liveness from './Round2Liveness';
import Round2CheckLimit from './Round2CheckLimit';
import RegisVirtualCard from './RegisVirtualCard';
import RegisVirtualCardInfo from './RegisVirtualCardInfo';
import RegisLimitInfo from './RegisLimitInfo';
import ConfirmDocument from './ConfirmDocument';
import CheckSuccess from './CheckSuccess';
import Round3 from './Round3';
import Round31 from './Round3.1';
import Round32 from './Round3.2';
import Round2Confirm from './Round2Confirm';
import UploadDocument from './UploadDocument';
import ChooseBenefit from './ChooseBenefit-v2';
import ChooseCard from './ChooseCard';
import ChooseLimit from './ChooseLimit';
import Otp from './Otp';
import WaitingCheck from './WaitingCheck';
import LandingCard from './LandingCard';
import CardDetail from './CardDetail';
import ListCardByBenefit from './ListCardByBenefit';
import ChooseDocument from './ChooseDocument';
import LivenessGuiline from './LivenessGuiline';
import Liveness from './Liveness';
import CompareCard from './CompareCard';
import UploadDocumentSuccess from './UploadDocumentSuccess';
import WaitingCheckLos from './WaitingCheckLos';
import AllCards from './AllCards';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Application(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [step, setStep] = useState(15);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
    severity: 'success',
  });

  const { vertical, horizontal, open, message, severity } = state;

  const handleShoMessage = newState => {
    setState({ open: true, ...newState });
  };

  const handleCloseMessage = () => {
    setState({ ...state, open: false });
  };

  return (
    <>
      {step === 15 && (
        <LandingCard
          setStep={setStep}
          {...props}
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
        />
      )}
      {step === 16 && <AllCards setStep={setStep} {...props} />}
      {step === 17 && <LivenessGuiline setStep={setStep} {...props} />}
      {step === 18 && (
        <Liveness
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
          setStep={setStep}
          {...props}
        />
      )}
      {step === 19 && <ChooseDocument setStep={setStep} {...props} />}
      {step === 20 && <Round2OCR setStep={setStep} {...props} />}
      {step === 21 && <Round2OCRBack setStep={setStep} {...props} />}
      {step === 22 && (
        <CompareCard
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
          setStep={setStep}
          {...props}
        />
      )}
      {step === 23 && (
        <WaitingCheckLos
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
          setStep={setStep}
          {...props}
        />
      )}
      {step === 998 && <AllCards setStep={setStep} {...props} />}
      {step === 1000 && <ChooseLimit setStep={setStep} {...props} />}
      {step === 997 && <ChooseCard setStep={setStep} {...props} />}
      {step === 996 && <RegisLimitInfo setStep={setStep} {...props} />}
      {step === 0 && (
        <Round1
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
          setStep={setStep}
          {...props}
        />
      )}
      {step === 1 && (
        <Otp
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
          setStep={setStep}
          {...props}
        />
      )}
      {step === 2 && <Round2OCRGuide setStep={setStep} {...props} />}
      {step === 3 && <Round2OCR setStep={setStep} {...props} />}
      {step === 991 && <Round2OCRBack setStep={setStep} {...props} />}
      {step === 4 && <Round2Liveness setStep={setStep} {...props} />}
      {step === 5 && (
        <Roun1FillInfo
          handleShoMessage={handleShoMessage}
          handleCloseMessage={handleCloseMessage}
          setStep={setStep}
          {...props}
        />
      )}
      {step === 6 && <Round2Confirm setStep={setStep} {...props} />}
      {step === 7 && <Round2CheckLimit setStep={setStep} {...props} />}
      {step === 999 && <CheckSuccess setStep={setStep} {...props} />}
      {step === 995 && <WaitingCheck setStep={setStep} {...props} />}
      {step === 8 && <Round3 setStep={setStep} {...props} />}
      {step === 9 && <Round31 setStep={setStep} {...props} />}
      {step === 10 && <Round32 setStep={setStep} {...props} />}
      {step === 11 && <RegisVirtualCard setStep={setStep} {...props} />}
      {step === 12 && <RegisVirtualCardInfo setStep={setStep} {...props} />}
      {step === 13 && <ConfirmDocument setStep={setStep} {...props} />}
      {step === 14 && <UploadDocument setStep={setStep} {...props} />}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleCloseMessage}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={6000}
        severity={severity}
      >
        <Alert onClose={handleCloseMessage} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
