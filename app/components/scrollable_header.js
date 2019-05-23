// https://github.com/janicduplessis/react-native-scrollable-header
import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const DEFAULT_HEADER_MAX_HEIGHT = 160;
const DEFAULT_HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 64 : 74;
const DEFAULT_HEADER_SCROLL_DISTANCE = DEFAULT_HEADER_MAX_HEIGHT - DEFAULT_HEADER_MIN_HEIGHT;
const DEFAULT_HEADER_COLOR = '#1976d2';

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: DEFAULT_HEADER_MAX_HEIGHT,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: DEFAULT_HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
    backgroundColor: DEFAULT_HEADER_COLOR,
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    // height: 32,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18
  },
  scrollViewContent: {
    marginTop: DEFAULT_HEADER_MAX_HEIGHT,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class ScrollableHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  getHeaderMaxHeight() {
    const { headerMaxHeight } = this.props;
    return headerMaxHeight;
  }

  getHeaderScrollDistance() {
    return this.getHeaderMaxHeight() - DEFAULT_HEADER_MIN_HEIGHT;
  }

  getInputRange() {
   return [0, this.getHeaderScrollDistance()];
 }

  getHeaderTranslate() {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, -this.getHeaderScrollDistance()],
      extrapolate: 'clamp',
    });
  }

  getOverlayOpacity() {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: [0, this.getHeaderScrollDistance() / 2, this.getHeaderScrollDistance()],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
  }

  getOverlayTranslate() {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, DEFAULT_HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
  }

  getTitleScale() {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getHeaderMaxHeight(), this.getHeaderScrollDistance()],
      extrapolate: 'clamp',
    });
  }

  getTitleTranslate() {
    const { scrollY } = this.state;
    let distance = this.getHeaderScrollDistance();

    return scrollY.interpolate({
      inputRange: [0, distance / 2, distance],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });
  }

  renderStatusBar() {
    return (
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.251)"
      />
    )
  }

  renderContent() {
    return (
      <Animated.ScrollView
        style={styles.fill}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          { useNativeDriver: true },
        )}>

        <View style={[styles.scrollViewContent, { marginTop: this.getHeaderMaxHeight() }]}>
          { this.props.renderContent() }
        </View>

      </Animated.ScrollView>
    );
  }

  renderTitle() {
    if (!this.props.title) { return null }

    return (
      <View style={{position: 'absolute', left: 56, right: 5, bottom: 4}}>
        <Text style={{fontSize: 20, color: '#fff'}} numberOfLines={1}>{this.props.title}</Text>
      </View>
    )
  }

  renderOverlay() {
    return (
      <Animated.View
        style={[
          styles.overlay,
          {
            height: this.getHeaderMaxHeight(),
            opacity: this.getOverlayOpacity(),
            transform: [{ translateY: this.getOverlayTranslate() }],
          },
        ]}
      />
    )
  }

  renderLargeTitle() {
    if (!this.props.largeTitle) {
      return null
    }

    return (
      <Animated.View
        style={[
          { transform: [{ translateY: this.getTitleScale() }] },
          { opacity: this.getOverlayOpacity() }
        ]}
      >
        <View style={{position: 'absolute', left: 20, right: 0, bottom: 10}}>
          <Text style={{fontSize: 28, color: '#fff', lineHeight: 50}}>{this.props.largeTitle}</Text>
        </View>
      </Animated.View>
    )
  }

  renderForeground() {
    if (!!this.props.largeTitle || !this.props.renderForeground) {
      return null
    }

    return (
      <Animated.View
        style={[
          { transform: [{ translateY: this.getTitleScale() }] },
          { opacity: this.getOverlayOpacity() }
        ]}>

        <View style={{position: 'absolute', left: 20, right: 20, bottom: 10}}>
          { this.props.renderForeground() }
        </View>
      </Animated.View>
    )
  }

  renderNavigation() {
    return (
      <Animated.View
        style={[
          styles.bar,
          {
            transform: [
              { translateY: this.getTitleTranslate() },
            ],
          },
        ]}
      >
        { this.props.renderNavigation() }
      </Animated.View>
    )
  }

  renderHeader() {
    let bgColor = this.props.backgroundColor || DEFAULT_HEADER_COLOR;

    return (
      <Animated.View
        style={[
          styles.header,
          { height: this.getHeaderMaxHeight() },
          { backgroundColor: bgColor, transform: [{ translateY: this.getHeaderTranslate() }] }
        ]}
      >
        { this.renderTitle() }
        { this.renderOverlay() }
        { this.renderLargeTitle() }
        { this.renderForeground() }
      </Animated.View>
    )
  }

  render() {
    return (
      <View style={styles.fill}>
        { this.renderStatusBar() }
        { this.renderContent() }
        { this.renderHeader() }
        { this.renderNavigation()}
      </View>
    );
  }
}

ScrollableHeader.propTypes = {
  renderContent: PropTypes.func,
  renderNavigation: PropTypes.func,
  title: PropTypes.string,
  largeTitle: PropTypes.string,
  renderForeground: PropTypes.func,
  headerMaxHeight: PropTypes.number,
};

ScrollableHeader.defaultProps = {
  renderContent: () => <View />,
  renderNavigation: null,
  title: null,
  largeTitle: null,
  renderForeground: null,
  headerMaxHeight: DEFAULT_HEADER_MAX_HEIGHT,
};

export default ScrollableHeader;
