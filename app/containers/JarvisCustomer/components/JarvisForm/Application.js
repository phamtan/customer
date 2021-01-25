import React, { useState } from 'react';
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
import Otp from './Otp';

export default function Application(props) {

	const [step, setStep] = useState(998);
	return (
		<>
			{step === 998 && (
				<ChooseBenefit setStep={setStep} {...props} />
			)}
			{step === 997 && (
				<ChooseCard setStep={setStep} {...props} />
			)}
			{step === 996 && (
				<RegisLimitInfo setStep={setStep} {...props} />
			)}
			{step === 0 && (
				<Round1 setStep={setStep} {...props} />
			)}
			{step === 1 && (
				<Otp setStep={setStep} {...props} />
			)}
			{step === 2 && (
				<Round2OCRGuide setStep={setStep} {...props} />
			)}
			{step === 3 && (
				<Round2OCR setStep={setStep} {...props} />
			)}
			{step === 991 && (
				<Round2OCRBack setStep={setStep} {...props} />
			)}
			{step === 4 && (
				<Round2Liveness setStep={setStep} {...props} />
			)}
			{step === 5 && (
				<Roun1FillInfo setStep={setStep} {...props} />
			)}
			{step === 6 && (
				<Round2Confirm setStep={setStep} {...props} />
			)}
			{step === 7 && (
				<Round2CheckLimit setStep={setStep} {...props} />
			)}
			{step === 999 && (
				<CheckSuccess setStep={setStep} {...props} />
			)}
			{step === 8 && (
				<Round3 setStep={setStep} {...props} />
			)}
			{step === 9 && (
				<Round31 setStep={setStep} {...props} />
			)}
			{step === 10 && (
				<Round32 setStep={setStep} {...props} />
			)}
			{step === 11 && (
				<RegisVirtualCard setStep={setStep} {...props} />
			)}
			{step === 12 && (
				<RegisVirtualCardInfo setStep={setStep} {...props} />
			)}
			{step === 13 && (
				<ConfirmDocument setStep={setStep} {...props} />
			)}
			{step === 14 && (
				<UploadDocument setStep={setStep} {...props} />
			)}
		</>
	)
}


