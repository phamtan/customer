import styled from 'styled-components';

const JarvisFormStyle = styled.div`
	width: 100%;
	margin:auto;
	display:flex;
	flex-direction: column;
	align-items: center;
	font-family: 'Montserrat', sans-serif;
	.header {
		width:100%;
		display:flex;
		margin-top: 15px;
		margin-left: 20px;
	}
    .formTitle {
			font-size: 12px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.33;
			letter-spacing: normal;
			text-align: center;
			color: #2a2e2f;
			margin-top: 20px;
		}
		.roundTitle {
			font-size: 13px;
			font-weight: bold;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.23;
			letter-spacing: normal;
			text-align: center;
			color: #39814c;
			margin-top:28px;
		}
		.roundName {
			font-size: 13px;
			font-weight: bold;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.23;
			letter-spacing: normal;
			text-align: center;
			color: #2a2e2f;
			margin-top:5px;
		}
		.roundNamesub {
			font-size: 13px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.23;
			letter-spacing: normal;
			text-align: center;
			color: #2a2e2f;
			text-transform: uppercase;
			margin-top:16px;
		}
		.roundNameDescription {
			width:80%;
			font-size: 14px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.43;
			letter-spacing: normal;
			text-align: center;
			color: #666666;
			margin-top:12px;
		}
		.formWrapper {
			width:95%;
			margin:auto;
			label {
				font-size: 12px;
				font-weight: 600;
				font-stretch: normal;
				font-style: normal;
				line-height: normal;
				letter-spacing: -0.1px;
				color: #6b778c;
			}
			.btnSubmit {
				width: 99%;
				text-align: left;
				margin: auto;
				margin-top: 50px;
				margin-bottom: 20px;
				background-color:#4daa5c;
				color:white;
			}
		}
		.btnSubmit {
			width: 90%;
			text-align: left;
			margin: auto;
			margin-top: 50px;
			margin-bottom: 20px;
			background-color:#4daa5c;
			color:white;
		}
		.btnKeep {
			width: 90%;
			text-align: left;
			margin: auto;
			margin-top: 50px;
			margin-bottom: 20px;
			background-color:red;
			color:white;
		}
		.formControl {
			width:100%;
		}
		.otpControl {
			text-algin:center;
		}
		.otpTitle { 
			font-size: 13px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.23;
			letter-spacing: normal;
			text-align: center;
			color: #2a2e2f;
			margin-top:58px;
		}
		.confirmTitle { 
			width:90%;
			font-size: 13px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.23;
			letter-spacing: normal;
			text-align: center;
			color: #2a2e2f;
			margin-top: 16px;
		}
		.checkboxWrapper {
			display:flex;
			flex-direction:row;
			align-items:center;
		}
		.checkboxControl {
			width:12px;
			margin-right:10px;
		}
		.redNote {
			width: 90%;
			margin:auto;
			color: red;
			font-size: 12px;
			font-weight: normal;
			font-stretch: normal;
			font-style: italic;
			margin-top:16px;
		}
		.radioWrapper {
			display:flex;
			flex-direction:row;
			align-items:center;
		}
		.radioControl {
			width:12px;
			margin-right:10px;
			margin-bottom:0px;
		}
		.virtualcardConfirm {
			font-size: 14px;
			font-weight: bold;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.43;
			letter-spacing: normal;
			color: #4c4c4c;
			width: 95%;
			margin:auto;
			margin-top: 28px;
		}
		.docRequired {
			width: 95%;
			margin:auto;
			display:flex;
			flex-direction:column;
			font-size: 12px;
			margin-top:16px;
		}
		.ocrguideContainer {
			align-items: flex-start;
			margin-left: 16px;
			.ocrTitle {
				font-size: 14px;
				font-weight: bold;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.43;
				letter-spacing: normal;
				color: #4c4c4c;
				margin-top: 25px;
				margin-bottom: 14px;
			}
			.ocrStep {
				font-size: 13px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.54;
				letter-spacing: normal;
				color: #494949;
				margin-bottom: 10px;
			}
		}
		.ocrFrontTitle {
			font-size: 13px;
			font-weight: bold;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.23;
			letter-spacing: normal;
			text-align: center;
			color: #2a2e2f;
			margin-top: 50px;
			text-transform: uppercase;
			margin-bottom: 10px;
		}
		.ocrSubtitle {
			width: 80%;
			font-size: 14px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.43;
			letter-spacing: normal;
			text-align: center;
			color: #666666;
			margin-bottom: 40px;
		}
		.ocrFrame {
			width: 85%;
			height: 200px;
			margin-bottom: 30px;
		}
		.checkLimitContainer {
			width: 90%;
			height: 178px;
			background-color: #b3f5ff;
			margin-top: 20px;
			border-radius: 5px;
			padding: 16px 16px 24px 16px;
			.waitingTitle {
				font-size: 13px;
				font-weight: bold;
				font-stretch: normal;
				font-style: normal;
				line-height: normal;
				letter-spacing: normal;
				color: #2a2e2f;
			}
			.waitingDescription {
				font-size: 12px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				line-height: normal;
				letter-spacing: normal;
				color: #2a2e2f;
				margin-top: 10px;
			}
			.waitingNote {
				border-radius: 6px;
				background-color: #fe5656;
				padding: 8px;
				margin-top:26px;
				color: white;
				font-size: 12px;
			}
			
		}
		.checkLimitDone {
			height: 84px;
			width: 90%;
			background-color: #4daa5c;
			padding: 16px 16px 24px 16px;
			margin-top: 18px;
			border-radius: 6px;
			.title {
				font-size: 13px;
				font-weight: bold;
				font-stretch: normal;
				font-style: normal;
				line-height: normal;
				letter-spacing: normal;
				color: #ffffff;
			}
			.text {
				font-size: 12px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				line-height: normal;
				letter-spacing: normal;
				color: #ffffff;
				margin-top:9px;
			}
		}
		.successDialog {
			width: 90%;
			height: 500px;
		}
		.documentWrapper {
			width: 98%;
			margin-top:20px;
			.uploadItem {
				margin-left: 20px;
				margin-bottom:30px;
			}
			.uploadButton {
				width: 91px;
				height: 32px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 15.5px;
				border: solid 1px #01ad52;
				background-color: white;
				color: #01ad52;
				margin-top: 10px;
				margin-right: 20px;
			}
			.uploadImg {
				display:flex;
				flex-direction: column;
				width: 100%;
				align-items: flex-end;
				justify-content: flex-end;
			}
		}
		.benefitTitle {
			font-size: 13px;
			font-weight: bold;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.23;
			letter-spacing: normal;
			text-align: center;
			color: #2a2e2f;
			text-transform: uppercase;
			margin-top:37px;
		}
		.benefitText {
			font-size: 14px;
			line-height: 1.43;
			text-align: center;
			color: #666666;
			margin-top:12px;
			margin-bottom: 28px;
		}
		.benefitDescription {
			font-size: 14px;
			font-weight: bold;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.43;
			letter-spacing: normal;
			color: #4c4c4c;
			margin-bottom: 35px;
		}
		.benefitWrapper {
			display:flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			width: 70%;
			margin-top: 20px;
			.benefitItem {
				width: 118px;
				display: flex;
				flex-direction: column;
				align-items:center;
				justify-content:center;
				img {
					width: 100%;
				}
			}
		}
`;

export default JarvisFormStyle;
