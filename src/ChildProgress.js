import React from 'react';
import PropTypes from 'prop-types';
import { Path, G, Circle } from 'react-native-svg';

export default class ChildProgress extends React.PureComponent {
  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  circlePath(x, y, radius, startAngle, endAngle){
    var start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ];
    return d.join(' ');
  }

  clampFill = fill => Math.min(100, Math.max(0, fill));

  render() {
    const {
      size,
      width,
      backgroundWidth,
      tintColor,
      backgroundColor,
      rotation,
      lineCap,
      arcSweepAngle,
      fill,
      onPress
    } = this.props;
    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle * this.clampFill(fill) / 100);
    const startDot = this.polarToCartesian(size/2,size/2, size / 2 - width / 2,0)
    const stopDot = this.polarToCartesian(size/2,size/2, size / 2 - width / 2,arcSweepAngle * this.clampFill(fill) / 100)
    return (
      <G onPressIn={onPress} rotation={rotation} originX={size/2} originY={size/2}>
            { backgroundColor && (
              <Path
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth || width}
                strokeLinecap={lineCap}
                fill="transparent"
              />
            )}
            <Path
              d={circlePath}
              stroke={tintColor}
              strokeWidth={width}
              strokeLinecap={lineCap}
              fill="transparent"
            />
            <Circle
            cx={startDot.x}
            cy={startDot.y}
            r={width/4}
            stroke={tintColor}
            strokeWidth={width/2}
            fill="transparent"
          />
          <Circle
            cx={stopDot.x}
            cy={stopDot.y}
            r={width/4}
            stroke={tintColor}
            strokeWidth={width/2}
            fill="transparent"
          />
          </G>
    );
  }
}

ChildProgress.propTypes = {
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
  onPress: PropTypes.func
};

ChildProgress.defaultProps = {
  tintColor: 'black',
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360
};
