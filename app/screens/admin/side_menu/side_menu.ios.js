import React, {Component} from 'react';
import { DrawerItems } from 'react-navigation';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';

import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import { Divider } from 'react-native-elements';


// Utils
import realm from '../../../schema';
import User from '../../../utils/user';
import headerStyles from '../../../assets/style_sheets/header';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class SideMenu extends Component {
  state = {user: '', photo: '', cover: ''}

  componentWillMount() {
    let user = User.getCurrent();
    let photo = require('../../../assets/images/default_profile.png');
    let cover = require('../../../assets/images/header_bg.jpg');

    if (!!user && !!user.photo) {
      photo = {uri: user.photo};
    }
    if (!!user && !!user.cover) {
      cover = {uri: user.cover};
    }

    this.setState({user: user});
    this.setState({photo: photo});
    this.setState({cover: cover});
  }

  isActive(routeName) {
    return this.props.navigation.state.routes[this.props.navigation.state.index].routeName == routeName;
  }

  getWrapperStyle(routeName) {
    if (this.isActive(routeName)) {
      return [styles.row, {backgroundColor: 'rgba(0,0,0,0.05)'}];
    }

    return styles.row;
  }

  getIconStyle(routeName) {
    if (this.isActive(routeName)) {
      return [styles.icon, {color: '#1976d2'}]
    }

    return styles.icon;
  }

  getMenuTextStyle(routeName) {
    if (this.isActive(routeName)) {
      return [styles.menuLabel, {color: '#4285f4'}];
    }
    return styles.menuLabel;
  }

  navigateToScreen = (route) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  logout() {
    User.removeToken();
    User.logout();
    this.props.screenProps.rootNavigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      actions: [{
        type: 'Navigation/NAVIGATE',
        routeName:'Home'
      }]
    })
  }

  _renderMenuHeader() {
    return(
      <View>
        <View style={{position: 'relative'}}>
          <Image
            source={this.state.cover}
            style={{width: null, height: 180}} />
        </View>

        <View style={{position: 'absolute', top: 24, left: 24}}>
          <Image
            source={this.state.photo}
            style={{borderRadius: 32, width: 64, height: 64 }} />
        </View>

        <View style={{position: 'absolute', bottom: 0, left: 0, padding: 24, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.name}>{!!this.state.user && this.state.user.fullName}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView>
        { this._renderMenuHeader() }

        <View>
          <TouchableOpacity onPress={() => this.navigateToScreen('AdminDashboard')} style={this.isActive}>
            <View style={this.getWrapperStyle('AdminDashboard')}>
              <AwesomeIcon name='home' size={18} style={this.getIconStyle('AdminDashboard')} />
              <Text style={this.getMenuTextStyle('AdminDashboard')}>ទំព័រដើម</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.navigateToScreen('About')}>
            <View style={this.getWrapperStyle('About')}>
              <MaterialIcon name='info' size={18} style={this.getIconStyle('About')} />
              <Text style={this.getMenuTextStyle('About')}>អំពីកម្មវិធី</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Divider style={{marginLeft: 55}} />
        <View>
          <TouchableOpacity onPress={this.logout.bind(this)}>
            <View style={styles.row}>
              <AwesomeIcon name='unlock-alt' size={18} style={styles.icon} />
              <Text style={styles.menuLabel}>ចាកចេញពីគណនី</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
    color: '#fff',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 48
  },
  icon: {
    width: 35,
    color: 'rgba(0,0,0,0.54)'
  },
  menuLabel: {
    fontSize: 14,
    marginTop: 9
  },
});

export default SideMenu;
