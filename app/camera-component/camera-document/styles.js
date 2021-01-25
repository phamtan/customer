import styled, { keyframes, css } from 'styled-components';

const flashAnimation = keyframes`
  from {
    opacity: 0.75;
  }

  to {
    opacity: 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth && `${maxWidth}px`};
  max-height: ${({ maxHeight }) => maxHeight && `${maxHeight}px`};
  overflow: hidden;
`;

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Video = styled.video`
  position: absolute;

  &::-webkit-media-controls-play-button {
    display: none !important;
    -webkit-appearance: none;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 20px;
  right: 5%;
  bottom: 30px;
  left: 5%;
  box-shadow: 0px 0px 20px 56px rgba(0, 0, 0, 0.6);
  // border: 1px solid #ffffff;
  // border-radius: 60%;
`;
export const BorderLeft = styled.div`
  border-left: 3px solid white;
  position: absolute;
  height: 50px;
  bottom: 0;
`;

export const BorderLeftTop = styled.div`
  border-left: 3px solid white;
  position: absolute;
  height: 50px;
  top: 0;
`;

export const BorderLeftHorizonTop = styled.div`
  border-top: 3px solid white;
  position: absolute;
  width: 50px;
  top: 0;
`;

export const BorderLeftHorizonBottom = styled.div`
  border-bottom: 3px solid white;
  position: absolute;
  width: 50px;
  bottom: 0;
  left: 0;
`;

export const BorderRight = styled.div`
  border-right: 3px solid white;
  position: absolute;
  height: 50px;
  right: 0;
  bottom: 0;
`;

export const BorderRightTop = styled.div`
  border-right: 3px solid white;
  position: absolute;
  top: 0;
  height: 50px;
  right: 0;
  bottom: 0;
`;

export const BorderRightHorizonTop = styled.div`
  border-top: 3px solid white;
  position: absolute;
  width: 50px;
  top: 0;
  right: 0;
`;

export const BorderRightHorizonBottom = styled.div`
  border-bottom: 3px solid white;
  position: absolute;
  width: 50px;
  bottom: 0;
  right: 0;
`;

export const Flash = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  opacity: 0;

  ${({ flash }) => {
    if (flash) {
      return css`
        animation: ${flashAnimation} 750ms ease-out;
      `;
    }
  }}
`;

export const Button = styled.button`
  width: 75%;
  min-width: 100px;
  max-width: 250px;
  margin-top: 24px;
  padding: 12px 24px;
  background: silver;
  display: none;
`;
