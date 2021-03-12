/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import _ from 'lodash';
import backGroundGreen from 'images/backgroundgreen.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RadialSeparators from './RadialSeperators';
import * as Actions from '../../actions';

import JarvisFormStyle from './JarvisFormStyle';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: `url(${backGroundGreen})`,
    width: '100%',
    maxWidth: '470px',
    [theme.breakpoints.up('md')]: {
      marginTop: '24px',
      marginBottom: '24px',
    },
    height: '100%',
    minHeight: '100vh',
    backgroundSize: 'contain',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleHeader: {
    fontSize: '16px',
    width: '100%',
    textAlign: 'center',
    marginTop: '16px',
    marginBottom: '24px',
  },
  cardStyle: {
    width: '92%',
    marginLeft: '16px',
    marginRight: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px',
    marginTop: '24px',
    minHeight: '85vh',
  },
  titleCard: {
    marginBottom: '48px',
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontSize: '16px',
    marginBottom: '24px',
    alignItems: 'center',
  },
  dividerStyle: {
    color: '#117f8a',
    backgroundColor: '#117f8a',
    width: '100%',
  },
  cardName: {
    color: '#117f8a',
    marginTop: '18px',
    marginBottom: '18px',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '500',
  },
  nameStyle: {
    paddingTop: '10px',
    paddingLeft: '4px',
    color: '#028547',
    textTransform: 'uppercase',
  },
  guiline: {
    width: '100%',
    fontSize: '16px',
    color: 'black',
    textAlign: 'center',
    marginTop: '7px',
  },
  action: {
    width: '100%',
    height: '46px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
    marginTop: '86px',
  },
  actionDisabled: {
    width: '100%',
    height: '46px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
    marginTop: '86px',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  limitText: {
    fontSize: '16px',
    color: '#117f8a',
  },
  ovalShape: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    backgroundColor: '#1ac5d6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '30px',
  },
}));

export default function WaitingCheckLos(props) {
  const jarvisCustomer = _.get(props, 'jarvisCustomerV2.jarvisCustomer', {});
  const classes = useStyles();
  const [time, setTime] = useState(
    jarvisCustomer && jarvisCustomer.waitRoundOne
      ? Number(jarvisCustomer.waitRoundOne)
      : 30,
  );
  const [check, setCheck] = useState(false);
  const [allowNext, setAllowNext] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (time === 0 && !check) {
      setCheck(true);
      checkLosResult();
    }
  }),
  [time];

  function checkLosResult() {
    return new Promise((resolve, reject) => {
      props.dispatch(
        Actions.checkLosResult(
          {
            appId: jarvisCustomer.applicationId,
            round: 'Check_1',
          },
          resolve,
          reject,
        ),
      );
    })
      .then(response => {
        if (
          response.status === 'PASS' &&
          jarvisCustomer.processStep === 'Work_Form_R_1'
        ) {
          setAllowNext(true);
        } else if (
          response.status === 'PASS' &&
          jarvisCustomer.processStep === 'Work_Form_R_2_2' &&
          response.data.hasResultR1
        ) {
          if (response.data.pa === 'Y') {
            setAllowNext(true);
          } else {
            props.history.push('/v2/regis-done');
          }
        } else if (
          response.status === 'PASS' &&
          jarvisCustomer.processStep === 'Work_Form_R_2_2' &&
          !response.data.hasResultR1
        ) {
          props.history.push('/v2/regis-done');
        } else {
          props.history.push('/v2/reject');
        }
      })
      .catch(error => {});
  }

  return (
    <JarvisFormStyle>
      <div className={classes.container}>
        <Card className={classes.cardStyle}>
          <CardContent className={classes.cardStyle}>
            <div className={classes.cardContainer}>
              <div className={classes.titleHeader}>
                Hệ thống đã ghi nhận thông tin, xin quý khách chờ trong giây
                lát
              </div>
              <div className={classes.progressCircle}>
                <CircularProgressbarWithChildren
                  value={time * 3.3}
                  strokeWidth={5}
                  styles={buildStyles({
                    strokeLinecap: 'butt',
                    pathColor: '#18b7c7',
                    trailColor: 'white',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    // Rotate the path
                    transform: 'rotate(0.2turn)',
                    transformOrigin: 'center center',
                    trail: {
                      transform: 'rotate(0.2turn)',
                    },
                  })}
                >
                  <RadialSeparators
                    count={30}
                    style={{
                      background: '#fff',
                      width: '25px',
                      // This needs to be equal to props.strokeWidth
                      height: `${10}%`,
                    }}
                  />
                  <div className={classes.ovalShape}>{time}</div>
                </CircularProgressbarWithChildren>
              </div>
            </div>
            <button
              type="button"
              disabled={!allowNext}
              onClick={() =>
                props.history.push(
                  jarvisCustomer.processStep === 'Work_Form_R_1'
                    ? '/v2/round2-1'
                    : '/v2/round3',
                )
              }
              className={allowNext ? classes.action : classes.actionDisabled}
            >
              Tiếp tục
            </button>
          </CardContent>
        </Card>
      </div>
    </JarvisFormStyle>
  );
}
