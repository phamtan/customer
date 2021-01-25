/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import no1Card from 'images/cards/no1-card.png';
import ladyCard from 'images/cards/lady-card.png';
import stepUpCard from 'images/cards/step-up-card.png';
import mc2Card from 'images/cards/mc2-card.png';
import platinumCard from 'images/cards/platinum-card.png';
import titaniumCashbackCard from 'images/cards/titanium-cashback.png';
import platinumCashbackCard from 'images/cards/platinum-cashback.png';
import platinumTravelCard from 'images/cards/platinum-travel.png';
import vnaCard from 'images/cards/vna-card.png';
import ShopeeCard from 'images/cards/shopeesuper.png';
import CheckIcon from '@material-ui/icons/Check';
import InfoIcon from '@material-ui/icons/Info';
import _ from 'lodash';
import Header from './Header';
import BackButton from './BackButton';
import JarvisFormStyle from './JarvisFormStyle';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as Actions from '../../actions';

const useStyles = makeStyles(() => ({
  iconCheck: {
    color: '#1598cc !important',
  },
  cardItem: {
    width: '99px',
    height: '72px',
    marginRight: '36px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imgCard: {
    width: '150px',
    height: '120px',
  },
  cardName: {
    width: '100%',
    textAlign: 'center',
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  pageHeader: {
    width: '100%',
    padding: '16px',
    fontSize: '20px',
    textAlign: 'center',
  },
  summaryTitle: {
    width: '100%',
    marginLeft: '16px',
    color: '#03a659',
    fontSize: '14px',
  },
  cellHeader: {
    fontSize: '12px',
    fontWeight: '500',
  },
  cellContent: {
    fontSize: '12px',
  },
}));

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function CardDetail(props) {
  // const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const classes = useStyles();

  return (
    <JarvisFormStyle>
      <Header className="header" />
      <div className={classes.pageHeader}>THẺ VPBANK SHOPEE PLATINUM</div>
      <div className={classes.cardContainer}>
        <img className={classes.imgCard} src={ShopeeCard} />
      </div>
      <div className={classes.summaryTitle}>Tổng quan</div>
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
                Quà chào mừng
              </TableCell>
              <TableCell align="left" className={classes.cellContent}>
                Tặng 1 Shopee E-Voucher trị giá 400,000 VND cho KH mở thẻ tín
                dụng Shopee Platinum và đạt tổng doanh số chi tiêu 2 triệu VND
                trở lên trong vòng 30 ngày kể từ ngày mở thẻ
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell
                component="td"
                scope="row"
                width={150}
                className={classes.cellHeader}
              >
                Quà chào mừng
              </TableCell>
              <TableCell align="left" className={classes.cellContent}>
                Tặng 1 Shopee E-Voucher trị giá 400,000 VND cho KH mở thẻ tín
                dụng Shopee Platinum và đạt tổng doanh số chi tiêu 2 triệu VND
                trở lên trong vòng 30 ngày kể từ ngày mở thẻ
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell
                component="td"
                scope="row"
                width={150}
                className={classes.cellHeader}
              >
                Quà chào mừng
              </TableCell>
              <TableCell align="left" className={classes.cellContent}>
                Tặng 1 Shopee E-Voucher trị giá 400,000 VND cho KH mở thẻ tín
                dụng Shopee Platinum và đạt tổng doanh số chi tiêu 2 triệu VND
                trở lên trong vòng 30 ngày kể từ ngày mở thẻ
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </JarvisFormStyle>
  );
}
