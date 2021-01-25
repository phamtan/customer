/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Modal from 'react-bootstrap/Modal';
import registerSuccess from 'images/register-success.svg';
import JarvisFormStyle from './JarvisFormStyle';
import Header from './Header';

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
}));

export default function ConfirmDocument(props) {
  const classes = useStyles();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <JarvisFormStyle>
      <Header className="header" />
      <div className="roundTitle">BƯỚC 5:</div>
      <div className="roundName">NỘP HỒ SƠ</div>
      <div className="confirmTitle">
        Hồ sơ của bạn cần bổ sung các giấy tờ bản cứng, bạn muốn sử dụng hình
        thức nào dưới đây để thực hiện?
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
          <div className="title" />
          <img className="imgSuccess" src={registerSuccess} />
          <div className="successTitle">Xin chúc mừng!</div>
          <div className="successText">
            <p>
              {' '}
              đã được cấp hạn mức{' '}
              <span className="limitText">50.000.000 VNĐ</span>,
            </p>
            <p>Vui lòng hoàn thiện các bước tiếp theo để mở thẻ tín dụng.</p>
          </div>
          <Accordion className={classes.root}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Câu hỏi thường gặp
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
              <Typography className={classes.text}>
                1. Tôi cần làm gì để mở thẻ tín dụng VPBank?
              </Typography>
              <Typography className={classes.text}>
                2. Những loại giấy tờ gì tôi cần chuẩn bị để nộp
              </Typography>
              <Typography className={classes.text}>
                3. Hồ sơ của tôi sẽ được xét duyệt trong bao lâu?
              </Typography>
            </AccordionDetails>
          </Accordion>
          <button
            onClick={() => props.setStep(13)}
            type="button"
            className="btn btnSubmit"
          >
            Hoàn thiện hồ sơ mở thẻ
          </button>
        </Modal.Body>
      </Modal>
    </JarvisFormStyle>
  );
}
