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
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
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
import compare from 'images/compare.svg';
import dataCard from 'images/data.json';
import Header from './Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as Actions from '../../actions';

import JarvisFormStyle from './JarvisFormStyle';

const useStyles = makeStyles(() => ({
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
    width: '30%',
    minWidth: '92px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    justifyContent: 'space-evenly',
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
  cardName: {
    fontSize: '12px',
    lineHeight: '1.33',
    letterSpacing: '0.4px',
    color: 'rgba(18, 18, 18, 0.87)',
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  action: {
    width: '154px',
    height: '38px',
    margin: '9px 19px 11px 16px',
    borderRadius: '4px',
    backgroundColor: '#028547',
    border: 'none',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '16px',
  },
  compareBlockTitle: {
    width: '100%',
    minHeight: '40px',
    backgroundColor: '#f7f7f7',
    textAlign: 'center',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '1.43',
    color: '#121212',
  },
  compareBlock: {
    display: 'flex',
  },
  comparePart: {
    width: '48%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '16px',
    textAlign: 'center',
    fontSize: '12px',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '8px 20px 8px 20px',
  },
}));

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

  function chooseThisCard(cardId) {
    const values = {};
    values.card = cardId;
    values.selectedCard = cardId;
    values.limitType = '1';
    return new Promise((resolve, reject) => {
      props.dispatch(Actions.saveRawData(values, resolve, reject));
    }).then(() => {
      props.setStep(1000);
    });
  }

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
        disableBackdropClick
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.dialogTitle}>
          <div>Chi tiết so sánh</div>
          <CloseIcon onClick={() => handleClose()} />
        </div>
        <Divider />
        <DialogContent className={classes.dialogBody}>
          <div className={classes.imageCompareContainer}>
            {cardCompare && cardCompare[0] && (
              <div className={classes.imgCompare}>
                <img src={getCardImage(cardCompare[0].id_int)} alt="card" />
                <div className={classes.cardName}>{cardCompare[0].name}</div>
                <button
                  type="button"
                  className={classes.action}
                  onClick={() => chooseThisCard(cardCompare[0].id_int)}
                >
                  MỞ THẺ
                </button>
              </div>
            )}
            <img src={compare} alt="card" />
            {cardCompare && cardCompare[1] && (
              <div className={classes.imgCompare}>
                <img src={getCardImage(cardCompare[1].id_int)} alt="card" />
                <div className={classes.cardName}>{cardCompare[1].name}</div>
                <button
                  type="button"
                  className={classes.action}
                  onClick={() => chooseThisCard(cardCompare[0].id_int)}
                >
                  MỞ THẺ
                </button>
              </div>
            )}
          </div>
          <div className={classes.compareBlockTitle}>Loại thẻ</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] && cardCompare[0].comparison.table_1.type}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] && cardCompare[1].comparison.table_1.type}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>Hạn mức tín dụng</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] && cardCompare[0].comparison.table_1.creditLimit}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] && cardCompare[1].comparison.table_1.creditLimit}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>Lãi suất</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] && cardCompare[0].comparison.table_1.interestRate}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] && cardCompare[1].comparison.table_1.interestRate}
            </div>
          </div>
          <div className={classes.compareBlockTitle}> Hạn mức giao dịch</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] &&
                cardCompare[0].comparison.table_1.transactionLimit}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] &&
                cardCompare[1].comparison.table_1.transactionLimit}
            </div>
          </div>
          <div className={classes.compareBlockTitle}> Phí thường niên</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] && cardCompare[0].comparison.table_1.anualFee}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] && cardCompare[1].comparison.table_1.anualFee}
            </div>
          </div>
          <div className={classes.compareBlockTitle}> Điểm thưởng</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] &&
                cardCompare[0].comparison.table_2.bonusPoints.map(bonus => (
                  <div>{bonus}</div>
                ))}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] &&
                cardCompare[1].comparison.table_2.bonusPoints.map(bonus => (
                  <div>{bonus}</div>
                ))}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>Hoàn tiền</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] &&
                cardCompare[0].comparison.table_2.cashback.map(bonus => (
                  <div>{bonus}</div>
                ))}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] &&
                cardCompare[1].comparison.table_2.cashback.map(bonus => (
                  <div>{bonus}</div>
                ))}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>Vé máy bay</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] &&
                cardCompare[0].comparison.table_2.freeTicket.map(bonus => (
                  <div>{bonus}</div>
                ))}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] &&
                cardCompare[1].comparison.table_2.freeTicket.map(bonus => (
                  <div>{bonus}</div>
                ))}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>Mobifone</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] &&
                cardCompare[0].comparison.table_2.mobifone.map(bonus => (
                  <div>{bonus}</div>
                ))}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] &&
                cardCompare[1].comparison.table_2.mobifone.map(bonus => (
                  <div>{bonus}</div>
                ))}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>Rút tiền</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] &&
                cardCompare[0].comparison.table_2.rutTienmat.map(bonus => (
                  <div>{bonus}</div>
                ))}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] &&
                cardCompare[1].comparison.table_2.rutTienmat.map(bonus => (
                  <div>{bonus}</div>
                ))}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>Miễn phí thường niên</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] &&
                cardCompare[0].comparison.table_2.freeAnualFee.map(bonus => (
                  <div>{bonus}</div>
                ))}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] &&
                cardCompare[1].comparison.table_2.freeAnualFee.map(bonus => (
                  <div>{bonus}</div>
                ))}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>
            Thanh toán trên toàn cầu
          </div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] &&
                cardCompare[0].comparison.table_3.paymentOverGlobe}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] &&
                cardCompare[1].comparison.table_3.paymentOverGlobe}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>
            Bảo vệ thẻ với 3D secure
          </div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] && cardCompare[0].comparison.table_3.threeDsecure}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] && cardCompare[1].comparison.table_3.threeDsecure}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>
            45 ngày miễn lãi tối đa
          </div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] &&
                cardCompare[0].comparison.table_3.fortyfiveDays}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] &&
                cardCompare[1].comparison.table_3.fortyfiveDays}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>Ưu đãi tới 50%</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] && cardCompare[0].comparison.table_3.uudai50}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] && cardCompare[1].comparison.table_3.uudai50}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>
            Trả góp với lãi suất 1%
          </div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] && cardCompare[0].comparison.table_3.tragop1}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] && cardCompare[1].comparison.table_3.tragop1}
            </div>
          </div>
          <div className={classes.compareBlockTitle}>Rút tiền đến 70%</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] && cardCompare[0].comparison.table_3.ruttien70}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] && cardCompare[1].comparison.table_3.ruttien70}
            </div>
          </div>
          <div className={classes.compareBlockTitle}> Điều kiện chung</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] && cardCompare[0].comparison.table_4.commonCond}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] && cardCompare[1].comparison.table_4.commonCond}
            </div>
          </div>
          <div className={classes.compareBlockTitle}> Thu nhập</div>
          <div className={classes.compareBlock}>
            <div className={classes.comparePart}>
              {cardCompare[0] && cardCompare[0].comparison.table_4.income}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.comparePart}>
              {cardCompare[1] && cardCompare[1].comparison.table_4.income}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </JarvisFormStyle>
  );
}
