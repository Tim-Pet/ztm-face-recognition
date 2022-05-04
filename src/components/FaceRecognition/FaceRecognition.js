import React, { useRef } from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  const imageRef = useRef(null);
  const imageHeight = imageRef.current?.height;
  const imageWidth = imageRef.current?.width;

  const getBoxSizeInPx = (box) => {
    const boxWidth = Math.round((box.right_col - box.left_col) * imageWidth);
    const boxHeight = Math.round((box.bottom_row - box.top_row) * imageHeight);
    const boxLeftOffset = Math.round(box.left_col * imageWidth);
    const boxTopOffset = Math.round(box.top_row * imageHeight);
    return {
      width: boxWidth,
      height: boxHeight,
      leftOffset: boxLeftOffset,
      topOffset: boxTopOffset,
    };
  };

  return (
    <div className="center ma">
      <div className="absolute mt2 h-fit">
        <img
          ref={imageRef}
          id="inputimage"
          alt=""
          src={imageUrl}
          width="500px"
          heigh="auto"
        />
        {boxes.map((box, index) => {
          const boxSize = getBoxSizeInPx(box);
          return (
            <div
              key={index.toString()}
              className="bounding-box"
              style={{
                width: `${boxSize.width}px`,
                height: `${boxSize.height}px`,
                left: `${boxSize.leftOffset}px`,
                top: `${boxSize.topOffset}px`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
