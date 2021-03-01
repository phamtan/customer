/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import Measure from 'react-measure';
import { makeStyles } from '@material-ui/core/styles';
import { useUserMedia } from '../hooks/use-user-media';
import { useCardRatio } from '../hooks/use-card-ratio';
import { useOffsets } from '../hooks/use-offsets';
import {
  Video,
  Canvas,
  Wrapper,
  Container,
  Flash,
  Overlay,
  Button,
  BorderLeft,
  BorderRight,
  BorderRightTop,
  BorderLeftTop,
  BorderLeftHorizonTop,
  BorderRightHorizonTop,
  BorderRightHorizonBottom,
  BorderLeftHorizonBottom,
} from './styles';

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' },
};

const useStyles = makeStyles(theme => ({
  titleHeader: {
    fontSize: '20px',
    width: '100%',
    textAlign: 'center',
    marginTop: '24px',
    marginBottom: '16px',
    color: 'white',
  },
  action: {
    width: '382px',
    height: '46px',
    marginLeft: '16px',
    marginRight: '16px',
    marginBottom: '16px',
    borderRadius: '4px',
    backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    border: 'none',
    textTransform: 'uppercase',
  },
  actionRetry: {
    width: '382px',
    height: '46px',
    marginLeft: '16px',
    marginRight: '16px',
    borderRadius: '4px',
    // backgroundColor: '#028547',
    color: 'white',
    fontSize: '14px',
    // border: 'none',
    textTransform: 'uppercase',
    background: 'transparent',
    border: '1px solid',
    [theme.breakpoints.up('md')]: {
      marginBottom: '16px',
    },
  },
}));

export function Camera({ onCapture, onClear }) {
  const canvasRef = useRef();
  const videoRef = useRef();
  const classes = useStyles();

  const [container, setContainer] = useState({ width: 0, height: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [aspectRatio, calculateRatio] = useCardRatio(1.586);
  const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    container.width,
    container.height,
  );

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleResize(contentRect) {
    setContainer({
      width: contentRect.bounds.width,
      height: Math.round(contentRect.bounds.width / aspectRatio),
    });
  }

  function handleCanPlay() {
    calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
    setIsVideoPlaying(true);
    videoRef.current.play();
  }

  function handleCapture() {
    const context = canvasRef.current.getContext('2d');

    context.drawImage(
      videoRef.current,
      offsets.x,
      offsets.y,
      container.width,
      container.height,
      0,
      0,
      container.width,
      container.height,
    );

    canvasRef.current.toBlob(blob => onCapture(blob), 'image/jpeg', 1);
    setIsCanvasEmpty(false);
    setIsFlashing(true);
  }

  function handleClear() {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setIsCanvasEmpty(true);
    onClear();
  }

  if (!mediaStream) {
    return null;
  }

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <Wrapper>
          <Container
            ref={measureRef}
            maxHeight={videoRef.current && videoRef.current.videoHeight}
            maxWidth={videoRef.current && videoRef.current.videoWidth}
            // style={{
            //   height: `${container.height}px`,
            // }}
          >
            <Video
              ref={videoRef}
              hidden={!isVideoPlaying}
              onCanPlay={handleCanPlay}
              autoPlay
              playsInline
              muted
              style={{
                top: `-${offsets.y}px`,
                left: `-${offsets.x}px`,
              }}
            />

            <Canvas
              ref={canvasRef}
              width={container.width}
              height={container.height}
            />

            <Flash
              flash={isFlashing}
              onAnimationEnd={() => setIsFlashing(false)}
            />
          </Container>

          {/* {isVideoPlaying && (
            <Button
              ref={buttonRef}
              onClick={isCanvasEmpty ? handleCapture : handleClear}
            >
              {isCanvasEmpty ? 'Take a picture' : 'Take another picture'}
            </Button>
          )} */}
          <button
            onClick={isCanvasEmpty ? handleCapture : handleClear}
            type="button"
            className={classes.action}
          >
            Hình ảnh có thể đọc tốt, tiếp tục
          </button>
          <button
            onClick={() => handleClear()}
            type="button"
            className={classes.actionRetry}
          >
            Chụp lại hình ảnh khác
          </button>
        </Wrapper>
      )}
    </Measure>
  );
}
