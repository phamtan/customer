/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
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
import JarvisFormStyle from './JarvisFormStyle';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'white',
    marginTop: '16px',
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
}));

export default function ConfirmDocument(props) {
  const classes = useStyles();
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const { handleSubmit } = useForm({
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {},
  });
  const [show, setShow] = useState(false);
  const [appform, setAppform] = useState();
  const [idProof, setIdProof] = useState();
  const [addProof, setAddProof] = useState();
  const [financeProof, setFinanceProof] = useState();
  const [employmentProof, setEmploymentProof] = useState();
  const [signature, setSignature] = useState();

  function onSubmitForm() {}
  function upload(event, type) {
    if (type === 'appform') {
      setAppform(URL.createObjectURL(event.target.files[0]));
    } else if (type === 'idProof') {
      setIdProof(URL.createObjectURL(event.target.files[0]));
    } else if (type === 'addProof') {
      setAddProof(URL.createObjectURL(event.target.files[0]));
    } else if (type === 'financeProof') {
      setFinanceProof(URL.createObjectURL(event.target.files[0]));
    } else if (type === 'employmentProof') {
      setEmploymentProof(URL.createObjectURL(event.target.files[0]));
    } else if (type === 'signature') {
      setSignature(URL.createObjectURL(event.target.files[0]));
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <JarvisFormStyle>
      <Header className="header" step={5} showStep />
      <div className={classes.container}>
        <div className={classes.pageTitle}>NỘP HỒ SƠ</div>
        <div className={classes.secondHeader}>
          Hồ sơ của bạn cần <b>bổ sung</b> các <b>giấy tờ bản cứng</b>, bạn cần{' '}
          <b>tải lên</b> các
          <b> giấy tờ dưới đây</b>
        </div>
        <Divider className={classes.divider} />
        <form className="documentWrapper" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="uploadItem">
            <div>
              <div className={classes.documentTitle}>
                <ArrowForwardIcon className={classes.arrowIcon} />
                Đề nghị mở thẻ
              </div>
              <div className="uploadImg">
                <input
                  type="file"
                  id="appformfile"
                  onChange={e => upload(e, 'appform')}
                  style={{ display: 'none' }}
                />
                <label className={classes.uploadItem} htmlFor="appformfile">
                  <CameraAltIcon className={classes.iconCamera} />
                </label>
              </div>
            </div>
          </div>
          <div>
            <img src={appform} />
          </div>
          <div className="uploadItem">
            <div>
              <div className={classes.documentTitle}>
                <ArrowForwardIcon className={classes.arrowIcon} />
                Chứng minh thông tin cá nhân *
              </div>
              <div className="uploadImg">
                <input
                  type="file"
                  id="idProoffile"
                  onChange={e => upload(e, 'idProof')}
                  style={{ display: 'none' }}
                />
                <label className={classes.uploadItem} htmlFor="idProoffile">
                  <CameraAltIcon className={classes.iconCamera} />
                </label>
              </div>
            </div>
          </div>
          <div>
            <img src={idProof} />
          </div>

          <div className="uploadItem">
            <div>
              <div className={classes.documentTitle}>
                <ArrowForwardIcon className={classes.arrowIcon} />
                Chứng minh nơi ở hiện tại
              </div>
              <div className="uploadImg">
                <input
                  type="file"
                  id="addProoffile"
                  onChange={e => upload(e, 'addProof')}
                  style={{ display: 'none' }}
                />
                <label className={classes.uploadItem} htmlFor="addProoffile">
                  <CameraAltIcon className={classes.iconCamera} />
                </label>
              </div>
            </div>
          </div>
          <div>
            <img src={addProof} />
          </div>

          <div className="uploadItem">
            <div>
              <div className={classes.documentTitle}>
                <ArrowForwardIcon className={classes.arrowIcon} />
                Chứng minh tài chính
              </div>
              <div className="uploadImg">
                <input
                  type="file"
                  id="financeProoffile"
                  onChange={e => upload(e, 'financeProof')}
                  style={{ display: 'none' }}
                />
                <label
                  className={classes.uploadItem}
                  htmlFor="financeProoffile"
                >
                  <CameraAltIcon className={classes.iconCamera} />
                </label>
              </div>
            </div>
          </div>
          <div>
            <img src={financeProof} />
          </div>

          <div className="uploadItem">
            <div>
              <div className={classes.documentTitle}>
                <ArrowForwardIcon className={classes.arrowIcon} />
                Chứng minh công việc
              </div>
              <div className="uploadImg">
                <input
                  type="file"
                  id="employmentProoffile"
                  onChange={e => upload(e, 'employmentProof')}
                  style={{ display: 'none' }}
                />
                <label
                  className={classes.uploadItem}
                  htmlFor="employmentProoffile"
                >
                  <CameraAltIcon className={classes.iconCamera} />
                </label>
              </div>
            </div>
          </div>
          <div>
            <img src={employmentProof} />
          </div>

          <div className="uploadItem">
            <div>
              <div className={classes.documentTitle}>
                <ArrowForwardIcon className={classes.arrowIcon} />
                Chữ ký
              </div>
              <div className="uploadImg">
                <input
                  type="file"
                  id="signaturefile"
                  onChange={e => upload(e, 'signature')}
                  style={{ display: 'none' }}
                />
                <label className={classes.uploadItem} htmlFor="signature">
                  <CameraAltIcon className={classes.iconCamera} />
                </label>
              </div>
            </div>
          </div>
          <div>
            <img src={signature} />
          </div>

          <button type="button" onClick={handleShow} className={classes.action}>
            Tiếp tục
          </button>
        </form>
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
