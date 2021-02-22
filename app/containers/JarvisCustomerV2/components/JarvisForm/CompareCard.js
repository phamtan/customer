/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import no1Card from 'images/cards/no1-card.png';
import mc2Card from 'images/cards/mc2-card.png';
import vnaCard from 'images/cards/vna-card.png';
import platinumCard from 'images/cards/platinum-card.png';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import platinumCashbackCard from 'images/cards/platinum-cashback.png';
import stepupCard from 'images/cards/step-up-card.png';
import ladyCard from 'images/cards/lady-card.png';
import mobiClassicCard from 'images/cards/mobi-classic.png';
import mobiPlatinumCard from 'images/cards/mobi-platinum-card.png';
import mobiTitaniumCard from 'images/cards/mobi-titanium-card.png';
import californiacenturyon from 'images/cards/californiacenturyonhorizon.png';
import californiaplatinum from 'images/cards/californiaplatinum.png';
import platinumTravel from 'images/cards/platinum-travel.png';
import shopeesuper from 'images/cards/shopeesuper.png';
import signatureTravel from 'images/cards/signature-travel.png';
import theshopee from 'images/cards/theshopee.png';
import titaniumcashback from 'images/cards/titanium-cashback.png';
import travelgold from 'images/cards/travelgold.png';
import dataCard from 'images/data.json';
import Header from './Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as Actions from '../../actions';

import JarvisFormStyle from './JarvisFormStyle';

const useStyles = makeStyles(() => ({
  sliderStyle: {
    width: '100%',
  },
  sliderItem: {
    // height: '80px',
  },
  pageHeader: {
    width: '100%',
    padding: '24px 24px 16px 16px',
    fontSize: '24px',
    '& .floatAction': {
      display: 'none',
    },
    '&:hover .floatAction': {
      display: 'flex',
    },
    '&:hover': {
      display: 'none !important',
    },
  },
  sectionTilte: {
    width: '100%',
    padding: '0px 24px 16px 16px',
    fontSize: '20px',
    fontWeight: '500',
  },
  showAllCard: {
    width: '100%',
    fontSize: '14px',
    fontWeight: '500',
    color: '#02743e',
    textTransform: 'uppercase',
    marginBottom: '24px',
    marginLeft: '16px',
  },
  openCardBtn: {
    width: '90%',
    height: '38px',
    borderRadius: '4px',
    backgroundColor: '#028547',
    border: 'none',
    color: 'white',
    marginLeft: '8px',
  },
  compareCardBtn: {
    width: '90%',
    height: '38px',
    borderRadius: '4px',
    backgroundColor: '#018786',
    border: 'none',
    color: 'white',
    marginLeft: '8px',
    marginTop: '4px',
  },
  cardContainer: {
    width: '60%',
    display: 'flex',
    flexWrap: 'wrap',
    height: '100vh',
    overflow: 'scroll',
  },
  cardItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '100px',
    marginBottom: '16px',
    marginLeft: '16px',
  },
  cardTitle: {
    width: '100%',
    fontSize: '12px',
    textAlign: 'center',
    height: '50px',
  },
  cardbenefit: {
    width: '90%',
    height: '24px',
    // borderRadius: '4px',
    // backgroundColor: 'rgba(255, 255, 255, 0.6)',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIconStyle: {
    color: '#028547',
  },
  removeIconStyle: {
    color: 'red',
  },
  compareContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '470px',
    margin: 'auto',
    backgroundColor: 'white',
    marginTop: '16px',
    borderRadius: '4px',
    marginBottom: '16px',
  },
  dividerStyle: {
    height: '100%',
    minHeight: '100vh',
    width: '2px',
  },
  buttonCompare: {
    width: '87px',
    color: '#02743e',
    position: 'absolute',
    bottom: 64,
    marginLeft: 16,
    border: 'none',
    fontSize: '14px',
    fontHeight: '500',
    textTransform: 'uppercase',
  },
  imgCompare: {
    width: '99px',
    height: '72px',
  },
  dialogBody: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
  },
  imageCompareContainer: {
    width: '100%',
    display: 'flex',
  },
  cellHeader: {
    width: '30%',
    fontSize: '12px',
    fontWeight: '600',
  },
  cellContent: {
    width: '30%',
    fontSize: '12px',
  },
  compareSection: {
    width: '100%',
    textAlign: 'left',
    color: '#03a659',
    marginBottom: '8px',
    marginTop: '8px',
  },
}));

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function LandingCard(props) {
  const classes = useStyles();
  const allCard = dataCard.cards;
  const [open, setOpen] = React.useState(false);
  const [cardCompare, setCardCompare] = useState([]);

  function getCardImage(id) {
    if (id === 1) {
      return mc2Card;
    }
    if (id === 2) {
      return ladyCard;
    }
    if (id === 3) {
      return stepupCard;
    }
    if (id === 4) {
      return platinumCard;
    }
    if (id === 5) {
      return vnaCard;
    }
    if (id === 6) {
      return mobiClassicCard;
    }
    if (id === 7) {
      return mobiPlatinumCard;
    }
    if (id === 8) {
      return mobiTitaniumCard;
    }
    if (id === 9) {
      return no1Card;
    }
    if (id === 10) {
      return platinumCashbackCard;
    }
    if (id === 11) {
      return platinumTravel;
    }
    if (id === 12) {
      return titaniumcashback;
    }
    if (id === 13) {
      return californiaplatinum;
    }
    if (id === 14) {
      return californiacenturyon;
    }
    if (id === 15) {
      return travelgold;
    }
    if (id === 16) {
      return signatureTravel;
    }
    if (id === 17) {
      return theshopee;
    }
    if (id === 18) {
      return shopeesuper;
    }
    return vnaCard;
  }

  function chooseThisCard(cardId) {
    const values = {};
    values.card = cardId.id;
    values.selectedCard = cardId;
    values.limitType = '1';
    props.dispatch(Actions.saveData(values));
    props.setStep(1000);
  }

  function addCardCompare(card) {
    const updateCardCompare = [...cardCompare];
    if (cardCompare.length > 1) {
      props.handleShoMessage({
        message: 'Bạn chỉ được chọn tối đa 2 thẻ',
        severity: 'error',
      });
      return false;
    }
    updateCardCompare.push(card);
    setCardCompare(updateCardCompare);
  }

  function removeCardCompare(cardRemove) {
    let updateCardCompare = [...cardCompare];
    updateCardCompare = updateCardCompare.filter(
      card => card.id_int !== cardRemove.id_int,
    );
    setCardCompare(updateCardCompare);
  }

  const handleClickOpen = () => {
    if (cardCompare.length < 2) {
      props.handleShoMessage({
        message: 'Bạn phải chọn 2 thẻ để so sánh',
        severity: 'error',
      });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <JarvisFormStyle>
      <Header className="header" />
      <div className={classes.pageContainer}>
        <div className={classes.pageHeader}>Thẻ tín dụng VPBank</div>
        <div className={classes.compareContainer}>
          <div className={classes.cardContainer}>
            {allCard &&
              allCard.map(card => (
                <div
                  className={classes.cardItem}
                  // onClick={() => chooseThisCard(card.id_int)}
                >
                  <img src={getCardImage(card.id_int)} alt="card" />
                  <span className={classes.cardTitle}>{card.name}</span>
                  <div
                    className={classes.cardbenefit}
                    onClick={() => addCardCompare(card)}
                  >
                    <AddCircleOutlinedIcon className={classes.addIconStyle} />
                  </div>
                </div>
              ))}
          </div>
          <Divider className={classes.dividerStyle} orientation="vertical" />
          <div>
            {cardCompare &&
              cardCompare.map(card => (
                <div
                  className={classes.cardItem}
                  // onClick={() => chooseThisCard(card.id_int)}
                >
                  <img src={getCardImage(card.id_int)} alt="card" />
                  <span className={classes.cardTitle}>{card.name}</span>
                  <div
                    className={classes.cardbenefit}
                    onClick={() => removeCardCompare(card)}
                  >
                    <RemoveCircleOutlinedIcon
                      className={classes.removeIconStyle}
                    />
                  </div>
                </div>
              ))}
            <button
              type="button"
              className={classes.buttonCompare}
              onClick={() => handleClickOpen()}
            >
              So sánh
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Chi tiết so sánh</DialogTitle>
        <DialogContent className={classes.dialogBody}>
          <div className={classes.imageCompareContainer}>
            {cardCompare &&
              cardCompare.map(card => (
                <div className={classes.imgCompare}>
                  <img src={getCardImage(card.id_int)} alt="card" />
                </div>
              ))}
          </div>
          <div className={classes.compareSection}>Tổng quan</div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableBody>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Loại thẻ
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] && cardCompare[0].comparison.table_1.type}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] && cardCompare[1].comparison.table_1.type}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Hạn mức tín dụng
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_1.creditLimit}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_1.creditLimit}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Lãi suất
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_1.interestRate}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_1.interestRate}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Hạn mức giao dịch
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_1.transactionLimit}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_1.transactionLimit}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Phí thường niên
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_1.anualFee}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_1.anualFee}
                  </TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.compareSection}>Lợi ích</div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableBody>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Điểm thưởng
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_2.bonusPoints.map(
                        bonus => <div>{bonus}</div>,
                      )}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_2.bonusPoints.map(
                        bonus => <div>{bonus}</div>,
                      )}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Hoàn tiền
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_2.cashback.map(
                        cashback => <div>{cashback}</div>,
                      )}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_2.cashback.map(
                        cashback => <div>{cashback}</div>,
                      )}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Vé máy bay
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_2.freeTicket.map(
                        freeTicket => <div>{freeTicket}</div>,
                      )}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_2.freeTicket.map(
                        freeTicket => <div>{freeTicket}</div>,
                      )}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Mobifone
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_2.mobifone.map(
                        mobifone => <div>{mobifone}</div>,
                      )}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_2.mobifone.map(
                        mobifone => <div>{mobifone}</div>,
                      )}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Rút tiền
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_2.rutTienmat.map(
                        rutTienmat => <div>{rutTienmat}</div>,
                      )}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_2.rutTienmat.map(
                        rutTienmat => <div>{rutTienmat}</div>,
                      )}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Miễn phí thường niên
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_2.freeAnualFee.map(
                        freeAnualFee => <div>{freeAnualFee}</div>,
                      )}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_2.freeAnualFee.map(
                        freeAnualFee => <div>{freeAnualFee}</div>,
                      )}
                  </TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.compareSection}>Lợi ích chung</div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableBody>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Thanh toán trên toàn cầu
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_3.paymentOverGlobe}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_3.paymentOverGlobe}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Bảo vệ thẻ với 3D secure
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_3.threeDsecure}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_3.threeDsecure}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    45 ngày miễn lãi tối đa
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_3.fortyfiveDays}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_3.fortyfiveDays}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Ưu đãi tới 50%
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_3.uudai50}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_3.uudai50}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Trả góp với lãi suất 1%
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_3.tragop1}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_3.tragop1}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Rút tiền đến 70%
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_3.ruttien70}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_3.ruttien70}
                  </TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.compareSection}>
            Thủ tục đăng kí và điều kiện
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableBody>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Điều kiện chung
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] &&
                      cardCompare[0].comparison.table_4.commonCond}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] &&
                      cardCompare[1].comparison.table_4.commonCond}
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width={150}
                    className={classes.cellHeader}
                  >
                    Thu nhập
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[0] && cardCompare[0].comparison.table_4.income}
                  </TableCell>
                  <TableCell align="left" className={classes.cellContent}>
                    {cardCompare[1] && cardCompare[1].comparison.table_4.income}
                  </TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </JarvisFormStyle>
  );
}
