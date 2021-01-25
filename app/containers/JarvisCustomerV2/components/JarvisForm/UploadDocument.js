/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import EmailIcon from '@material-ui/icons/Email';
import documentIcon from 'images/uploadfile.svg';
import uploadIcon from 'images/icons-upload.svg';
import Modal from 'react-bootstrap/Modal';
import registerSuccess from 'images/register-success.svg';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Header from './Header';
import JarvisFormStyle from './JarvisFormStyle';

const useStyles = makeStyles(theme => ({
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
      <Header className="header" step={5} />
      <div className="roundTitle">BƯỚC 5:</div>
      <div className="roundName">NỘP HỒ SƠ</div>
      <div className="confirmTitle">
        Hồ sơ của bạn cần bổ sung các giấy tờ bản cứng, bạn muốn sử dụng hình
        thức nào dưới đây để thực hiện?
      </div>
      <form className="documentWrapper" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="uploadItem">
          <div>
            <img src={documentIcon} />
          </div>
          <div>
            <div>Đề nghị mở thẻ</div>
            <div className="uploadImg">
              <img src={uploadIcon} />
              <input
                type="file"
                id="appformfile"
                onChange={e => upload(e, 'appform')}
                style={{ display: 'none' }}
              />
              <label className="uploadButton" htmlFor="appformfile">
                Upload
              </label>
            </div>
          </div>
        </div>
        <div>
          <img src={appform} />
        </div>

        <div className="uploadItem">
          <div>
            <img src={documentIcon} />
          </div>
          <div>
            <div>Chứng minh thông tin cá nhân *</div>
            <div className="uploadImg">
              <img src={uploadIcon} />
              <input
                type="file"
                id="idProoffile"
                onChange={e => upload(e, 'idProof')}
                style={{ display: 'none' }}
              />
              <label className="uploadButton" htmlFor="idProoffile">
                Upload
              </label>
            </div>
          </div>
        </div>
        <div>
          <img src={idProof} />
        </div>

        <div className="uploadItem">
          <div>
            <img src={documentIcon} />
          </div>
          <div>
            <div>Chứng minh nơi ở hiện tại</div>
            <div className="uploadImg">
              <img src={uploadIcon} />
              <input
                type="file"
                id="addProoffile"
                onChange={e => upload(e, 'addProof')}
                style={{ display: 'none' }}
              />
              <label className="uploadButton" htmlFor="addProoffile">
                Upload
              </label>
            </div>
          </div>
        </div>
        <div>
          <img src={addProof} />
        </div>

        <div className="uploadItem">
          <div>
            <img src={documentIcon} />
          </div>
          <div>
            <div>Chứng minh tài chính</div>
            <div className="uploadImg">
              <img src={uploadIcon} />
              <input
                type="file"
                id="financeProoffile"
                onChange={e => upload(e, 'financeProof')}
                style={{ display: 'none' }}
              />
              <label className="uploadButton" htmlFor="financeProoffile">
                Upload
              </label>
            </div>
          </div>
        </div>
        <div>
          <img src={financeProof} />
        </div>

        <div className="uploadItem">
          <div>
            <img src={documentIcon} />
          </div>
          <div>
            <div>Chứng minh công việc</div>
            <div className="uploadImg">
              <img src={uploadIcon} />
              <input
                type="file"
                id="employmentProoffile"
                onChange={e => upload(e, 'employmentProof')}
                style={{ display: 'none' }}
              />
              <label className="uploadButton" htmlFor="employmentProofile">
                Upload
              </label>
            </div>
          </div>
        </div>
        <div>
          <img src={employmentProof} />
        </div>

        <div className="uploadItem">
          <div>
            <img src={documentIcon} />
          </div>
          <div>
            <div>Chữ ký</div>
            <div className="uploadImg">
              <img src={uploadIcon} />
              <input
                type="file"
                id="signaturefile"
                onChange={e => upload(e, 'signature')}
                style={{ display: 'none' }}
              />
              <label className="uploadButton" htmlFor="signaturefile">
                Upload
              </label>
            </div>
          </div>
        </div>
        <div>
          <img src={signature} />
        </div>

        <button type="button" onClick={handleShow} className="btn btnSubmit">
          Tiếp tục
        </button>
      </form>
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
