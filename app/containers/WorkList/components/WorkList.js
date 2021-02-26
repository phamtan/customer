/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import _ from 'lodash';
import * as Actions from '../actions';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: '90%',
    margin: 'auto',
    marginTop: '32px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    minWidth: 650,
  },
  pagination: {
    width: '100%',
    textAlign: 'left',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  pageTitle: {
    marginTop: '16px',
    marginBottom: '32px',
  },
  searchBox: {
    display: 'flex',
    width: '100%',
    marginBottom: '16px',
  },
  searchItem: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '16px',
  },
  searchTitle: {
    marginRight: '5px',
  },
});

export default function WorkList(props) {
  const classes = useStyles();
  const workList = _.get(props, 'workList.workList', []);
  const [phone, setPhone] = useState();
  const [documentNumber, setDocumentNumber] = useState();

  function searchApplication() {
    props.dispatch(
      Actions.getWorkList({
        pageNumber: 0,
        pageSize: 20,
        mobileNumber: phone,
        documentNumber,
        fromDate: '2021/02/01',
        toDate: '2021/03/31',
      }),
    );
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <h1 className={classes.pageTitle}>List Application</h1>
        <div className={classes.searchBox}>
          <div className={classes.searchItem}>
            <TextField
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className={classes.searchItem}>
            <TextField
              id="outlined-basic"
              label="Số giấy tờ"
              variant="outlined"
              onChange={e => setDocumentNumber(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => searchApplication()}
          >
            Tìm kiếm
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>App ID</TableCell>
                <TableCell align="right">Tên khách hàng</TableCell>
                <TableCell align="right">Số điện thoại</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Số giấy tờ</TableCell>
                <TableCell align="right">LOSID Round 1</TableCell>
                <TableCell align="right">LOSID Round 2</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workList &&
                workList.pageDTO &&
                workList.pageDTO.content &&
                workList.pageDTO.content.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.applicationId}
                    </TableCell>
                    <TableCell align="right">{row.fullName}</TableCell>
                    <TableCell align="right">{row.mobileNumber}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.documentNumber}</TableCell>
                    <TableCell align="right">{row.lnCodeRoundOne}</TableCell>
                    <TableCell align="right">{row.lnCodeRoundTwo}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          className={classes.pagination}
          count={workList.count || 1}
          variant="outlined"
        />
      </CardContent>
      <CardActions />
    </Card>
  );
}
