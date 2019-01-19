import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  AppState,
  Easing,
  View,
  ViewPropTypes
} from 'react-native';
import MultiCircularProgress from './MultiCircularProgress';
const AnimatedProgress = Animated.createAnimatedComponent(MultiCircularProgress);

export default class AnimatedMultiCircularProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fillAnimation: new Animated.Value(props.prefill)
    }
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animate();
    }
  }

  reAnimate(prefill, toVal, dur, ease) {
    this.setState({
      fillAnimation: new Animated.Value(prefill)
    }, () => this.animate(toVal, dur, ease));
  }

  animate(toVal, dur, ease) {
    const toValue = toVal || this.props.fill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;

    const anim = Animated.timing(this.state.fillAnimation, {
      toValue,
      easing,
      duration,
    });
    anim.start(this.props.onAnimationComplete);

    return anim;
  }

  render() {
    const { prefill, ...other } = this.props;
    console.log('prefill: ', prefill)
    return (
      <AnimatedProgress
        {...other}
      />
    );
  }
}

AnimatedMultiCircularProgress.propTypes = {
  ...MultiCircularProgress.propTypes,
  prefill: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.func,
  onAnimationComplete: PropTypes.func,
};

AnimatedMultiCircularProgress.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0,
};
