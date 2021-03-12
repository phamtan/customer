/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import EmailIcon from '@material-ui/icons/Email';
import Modal from 'react-bootstrap/Modal';
import registerSuccess from 'images/register-success.svg';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Header from './Header';
import StepApp from './StepApp';
import JarvisFormStyle from './JarvisFormStyle';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    maxWidth: '470px',
    minHeight: '100vh',
    backgroundColor: 'white',
    marginTop: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
    [theme.breakpoints.up('md')]: {
      marginTop: '0px',
      marginBottom: '32px',
      borderRadius: '0px',
    },
  },
  pageTitle: {
    width: '100%',
    paddingLeft: '16px',
    fontSize: '24',
    fontWeight: 'normal',
    marginTop: '16px',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '1.33',
  },
  secondHeader: {
    width: '100%',
    paddingLeft: '16px',
    fontSize: '16px',
    marginTop: '16px',
  },
  root: {
    width: '100%',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      display: 'none',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    boxShadow: 'none',
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontSize: '13px',
  },
  gotoEmail: {
    width: '100%',
    textAlign: 'center',
    marginTop: '180px',
    color: '#1598cc !important',
  },
  linkEmail: {
    color: '#1598cc !important',
    textDecoration: 'none',
  },
  uploadItem: {
    width: '120px',
    height: '120px',
    borderRadius: '1px',
    marginRight: '8px',
    border: '2px dashed #979797',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCamera: {
    color: '#979797',
    width: '40px',
    height: '36px',
  },
  documentTitle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  arrowIcon: {
    color: '#128d9a',
    width: '16px',
    height: '16px',
    marginRight: '12px',
  },
  divider: {
    width: '90%',
    color: '#d8d8d8',
    margin: 'auto',
    marginTop: '16px',
    marginBottom: '16px',
  },
  action: {
    width: '95%',
    margin: 'auto',
    marginTop: '16px',
    marginBottom: '32px',
    height: '46px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
  },
  imageContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  imgDocument: {
    width: '120px',
    height: '120px',
    marginRight: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
}));

export default function UploadDocument(props) {
  const classes = useStyles();
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const documentRequired = _.get(
    props,
    'jarvisCustomerV2.docRequired.listDocs',
    [
      'IdProff',
      'ResidenceProof',
      'EmploymentProof',
      'FinancialProof',
      'AdditionalResidenceProof',
    ],
  );
  const documents = _.get(props, 'jarvisCustomerV2.documents', null);
  const { handleSubmit } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {},
  });
  const [show, setShow] = useState(false);
  const [checkAddProof, setCheckAddProof] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);

  useEffect(() => {
    if (jarvisCustomer && !jarvisCustomer.applicationId) {
      props.history.push('/v2/login');
    } else {
      props.dispatch(
        Actions.getDocRequired({ id: jarvisCustomer.applicationId }),
      );
      props.dispatch(Actions.getDocApp({ id: jarvisCustomer.applicationId }));
    }
  }, [props.dispatch]);

  useEffect(() => {
    if (jarvisCustomer && jarvisCustomer.applicationId) {
      if (
        jarvisCustomer.checkSaleLocation &&
        !jarvisCustomer.checkSaleLocation.allowPermanentAddress
      ) {
        setCheckAddProof(true);
      }
      checkDocumentRequired();
    }
  }, [jarvisCustomer]);

  function upload(event, type, typeId) {
    return new Promise((resolve, reject) => {
      props.dispatch(
        Actions.uploadDocument(
          {
            multipartFile: event.target.files[0],
            documentType: typeId,
            appId: jarvisCustomer.applicationId,
          },
          resolve,
          reject,
        ),
      );
    })
      .then(() => {
        props.handleShoMessage({
          message: 'Tải ảnh thành công',
          severity: 'success',
        });
      })
      .catch(err => {
        console.log(err);
        props.handleShoMessage({
          message: 'Có lỗi xảy ra vui lòng thử lại',
          severity: 'error',
        });
      });
  }

  function regisDone() {
    return new Promise((resolve, reject) => {
      props.dispatch(
        Actions.checkLosRound3(
          {
            jarvisId: jarvisCustomer.jarvisId,
          },
          resolve,
          reject,
        ),
      );
    })
      .then(() => {
        props.history.push('/v2/regis-done');
      })
      .catch(err => {
        console.log(err);
        props.handleShoMessage({
          message: 'Có lỗi xảy ra vui lòng thử lại',
          severity: 'error',
        });
      });
  }

  function checkDocumentRequired() {
    if (documentRequired && documents && documents.length > 0) {
      let allow = true;
      if (
        documentRequired.indexOf('IdProff') > -1 &&
        documents.filter(doc => doc.subTypeId === 1).length < 1
      ) {
        allow = false;
      }
      if (
        documentRequired.indexOf('ResidenceProof') > -1 &&
        documents.filter(doc => doc.subTypeId === 4).length < 1
      ) {
        allow = false;
      }
      if (
        checkAddProof &&
        documentRequired.indexOf('ResidenceProof') > -1 &&
        documents.filter(doc => doc.subTypeId === 7).length < 1
      ) {
        allow = false;
      }
      if (
        documentRequired.indexOf('FinancialProof') > -1 &&
        documents.filter(doc => doc.subTypeId === 12).length < 1
      ) {
        allow = false;
      }
      if (
        documentRequired.indexOf('EmploymentProof') > -1 &&
        documents.filter(doc => doc.subTypeId === 9).length < 1
      ) {
        allow = false;
      }
      setAllowSubmit(allow);
    }
  }

  const handleClose = () => setShow(false);

  return (
    <JarvisFormStyle>
      <Header className="header" step={5} />
      <StepApp step={2} />
      <div className={classes.container}>
        <div className={classes.pageTitle}>NỘP HỒ SƠ</div>
        <div className={classes.secondHeader}>
          Hồ sơ của bạn cần <b>bổ sung</b> các <b>giấy tờ bản cứng</b>, bạn cần{' '}
          <b>tải lên</b> các
          <b> giấy tờ dưới đây</b>
        </div>
        <Divider className={classes.divider} />
        {documentRequired && documentRequired.indexOf('IdProff') > -1 && (
          <div className="uploadItem">
            <div className={classes.documentTitle}>
              <ArrowForwardIcon className={classes.arrowIcon} />
              Chứng minh thông tin cá nhân *
            </div>
            <div className={classes.imageContainer}>
              <div className="uploadImg">
                <input
                  type="file"
                  id="idProoffile"
                  onChange={e => upload(e, 'idProof', 1)}
                  style={{ display: 'none' }}
                />
                <label className={classes.uploadItem} htmlFor="idProoffile">
                  <CameraAltIcon className={classes.iconCamera} />
                </label>
              </div>
              <div>
                {documents &&
                  documents
                    .filter(doc => doc.subTypeId === 1)
                    .map(doc => (
                      <img
                        key={doc.id}
                        className={classes.imgDocument}
                        src={`data:image/png;base64,${doc.document}`}
                      />
                    ))}
              </div>
            </div>
          </div>
        )}
        {documentRequired && documentRequired.indexOf('ResidenceProof') > -1 && (
          <div className="uploadItem">
            <div className={classes.documentTitle}>
              <ArrowForwardIcon className={classes.arrowIcon} />
              Chứng minh nơi ở
            </div>
            <div className={classes.imageContainer}>
              <div className="uploadImg">
                <input
                  type="file"
                  id="residentProoffile"
                  onChange={e => upload(e, 'residentProoffile', 4)}
                  style={{ display: 'none' }}
                />
                <label
                  className={classes.uploadItem}
                  htmlFor="residentProoffile"
                >
                  <CameraAltIcon className={classes.iconCamera} />
                </label>
              </div>
              <div>
                {documents &&
                  documents
                    .filter(doc => doc.subTypeId === 4)
                    .map(doc => (
                      <img
                        key={doc.id}
                        className={classes.imgDocument}
                        src={`data:image/png;base64,${doc.document}`}
                      />
                    ))}
              </div>
            </div>
          </div>
        )}
        {checkAddProof &&
          documentRequired &&
          documentRequired.indexOf('ResidenceProof') > -1 && (
            <div className="uploadItem">
              <div className={classes.documentTitle}>
                <ArrowForwardIcon className={classes.arrowIcon} />
                Chứng minh nơi ở hiện tại
              </div>
              <div className={classes.imageContainer}>
                <div className="uploadImg">
                  <input
                    type="file"
                    id="addProoffile"
                    onChange={e => upload(e, 'addProof', 7)}
                    style={{ display: 'none' }}
                  />
                  <label className={classes.uploadItem} htmlFor="addProoffile">
                    <CameraAltIcon className={classes.iconCamera} />
                  </label>
                </div>
                <div>
                  {documents &&
                    documents
                      .filter(doc => doc.subTypeId === 7)
                      .map(doc => (
                        <img
                          key={doc.id}
                          className={classes.imgDocument}
                          src={`data:image/png;base64,${doc.document}`}
                        />
                      ))}
                </div>
              </div>
            </div>
          )}
        {documentRequired && documentRequired.indexOf('FinancialProof') > -1 && (
          <div className="uploadItem">
            <div className={classes.documentTitle}>
              <ArrowForwardIcon className={classes.arrowIcon} />
              Chứng minh tài chính
            </div>
            <div className={classes.imageContainer}>
              <div className="uploadImg">
                <input
                  type="file"
                  id="financeProoffile"
                  onChange={e => upload(e, 'financeProof', 12)}
                  style={{ display: 'none' }}
                />
                <label
                  className={classes.uploadItem}
                  htmlFor="financeProoffile"
                >
                  <CameraAltIcon className={classes.iconCamera} />
                </label>
              </div>
              <div>
                {documents &&
                  documents
                    .filter(doc => doc.subTypeId === 12)
                    .map(doc => (
                      <img
                        key={doc.id}
                        className={classes.imgDocument}
                        src={`data:image/png;base64,${doc.document}`}
                      />
                    ))}
              </div>
            </div>
          </div>
        )}
        {documentRequired && documentRequired.indexOf('EmploymentProof') > -1 && (
          <div className="uploadItem">
            <div className={classes.documentTitle}>
              <ArrowForwardIcon className={classes.arrowIcon} />
              Chứng minh công việc
            </div>
            <div className={classes.imageContainer}>
              <div className="uploadImg">
                <input
                  type="file"
                  id="employmentProoffile"
                  onChange={e => upload(e, 'employmentProof', 9)}
                  style={{ display: 'none' }}
                />
                <label
                  className={classes.uploadItem}
                  htmlFor="employmentProoffile"
                >
                  <CameraAltIcon className={classes.iconCamera} />
                </label>
              </div>
              <div>
                {documents &&
                  documents
                    .filter(doc => doc.subTypeId === 9)
                    .map(doc => (
                      <img
                        key={doc.id}
                        className={classes.imgDocument}
                        src={`data:image/png;base64,${doc.document}`}
                      />
                    ))}
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          disabled={!allowSubmit}
          onClick={() => regisDone()}
          className={classes.action}
        >
          Tiếp tục
        </button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="successDialog"
        size="lg"
      >
        <Modal.Body>
          <div className="title">Hoàn thành</div>
          <img className="imgSuccess" src={registerSuccess} />
          <div className="successTitle">Xin chúc mừng!</div>
          <div className="successText">
            Thẻ của bạn đã được khởi tạo thành công . Mời bạn đăng nhập vào
            VPOnline với tài khoản được gửi qua email: {jarvisCustomer.email} để
            kích hoạt thẻ
          </div>
          <div className={classes.gotoEmail}>
            <EmailIcon />
            <a className={classes.linkEmail} href="https://gmail.com">
              Đi đến Email
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </JarvisFormStyle>
  );
}
