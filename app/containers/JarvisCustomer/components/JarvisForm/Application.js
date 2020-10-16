import React, { useState } from 'react';
import Round1 from './Round1';
import Roun1FillInfo from './Roun1FillInfo';
import Round2OCR from './Round2OCR';
import Round2OCRGuide from './Round2OCRGuide';
import Round2Liveness from './Round2Liveness';
import Round2CheckLimit from './Round2CheckLimit';
import RegisVirtualCard from './RegisVirtualCard';
import RegisVirtualCardInfo from './RegisVirtualCardInfo';
import ConfirmDocument from './ConfirmDocument';
import Round3 from './Round3';
import Round31 from './Round3.1';
import Round32 from './Round3.2';
import Round2Confirm from './Round2Confirm';
import UploadDocument from './UploadDocument';
import ChooseBenefit from './ChooseBenefit';
import Otp from './Otp';

export default function Application() {

	const [step, setStep] = useState(0);

	return (
		<>
			{step === 0 && (
				<Round1 setStep={setStep} />
			)}
			{step === 1 && (
				<Otp setStep={setStep} />
			)}
			{step === 2 && (
				<Round2OCRGuide setStep={setStep} />
			)}
			{step === 3 && (
				<Round2OCR setStep={setStep} />
			)}
			{step === 4 && (
				<Round2Liveness setStep={setStep} />
			)}
			{step === 5 && (
				<Roun1FillInfo setStep={setStep} />
			)}
			{step === 6 && (
				<Round2Confirm setStep={setStep} />
			)}
			{step === 7 && (
				<Round2CheckLimit setStep={setStep} />
			)}
			{step === 8 && (
				<Round3 setStep={setStep} />
			)}
			{step === 9 && (
				<Round31 setStep={setStep} />
			)}
			{step === 10 && (
				<Round32 setStep={setStep} />
			)}
			{step === 11 && (
				<RegisVirtualCard setStep={setStep} />
			)}
			{step === 12 && (
				<RegisVirtualCardInfo setStep={setStep} />
			)}
			{step === 13 && (
				<ConfirmDocument setStep={setStep} />
			)}
			{step === 14 && (
				<UploadDocument setStep={setStep} />
			)}
		</>
	)
}


