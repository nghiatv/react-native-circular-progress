import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, TouchableOpacity } from 'react-native';
import { Svg, Path, G, Circle } from 'react-native-svg';
import ChildProgress from './ChildProgress'
export default class MultiCircularProgress extends React.PureComponent {
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
      style,
      lineCap,
      arcSweepAngle,
      child
    } = this.props;
    const offset = size - (width * 2);
    return (
      <View style={style}>
        <Svg
          width={size}
          height={size}
          style={{ backgroundColor: 'transparent' }}
        >
        {
          backgroundColor && (
            <ChildProgress
              style={{zIndex: 999}}
              size={size}
              width={width}
              backgroundWidth={backgroundWidth}
              backgroundColor={backgroundColor}
              fill={100}
              tintColor={'transparent'}
            >
            </ChildProgress>
          )
        }

          {
            child && child.map((child, index) => {
              console.log(child.onPress)
              return (
                <ChildProgress
                  style={{zIndex: 1000}}
                  key={index}
                  size={size}
                  width={width}
                  tintColor={child.tintColor ? child.tintColor : tintColor}
                  rotation={child.rotation}
                  lineCap={child.lineCap ? child.lineCap : lineCap}
                  arcSweepAngle={child.arcSweepAngle ? child.arcSweepAngle : arcSweepAngle}
                  fill={child.fill}
                  onPress={child.onPress}
                />
              )
            })
          }
        </Svg>
      </View>
    );
  }
}

MultiCircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
  child: PropTypes.array,
  onPressLine: PropTypes.func
};

MultiCircularProgress.defaultProps = {
  tintColor: 'black',
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360,
  child: []
};
