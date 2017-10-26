'use strict';

import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
  Avatar,
} from 'react-native-material-ui';

import { Dialog } from 'react-native-simple-dialogs';
import styles from '../assets/style_sheets/profile_form';

// Utils
import realm from '../schema';
import User from '../utils/user';

export default class EditProfilePhoto extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;

    return {
      title: 'កែសម្រួល',
      headerStyle: { backgroundColor: '#1976d2' },
      headerTitleStyle : {color: '#fff'},
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginLeft: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
      headerRight: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.state.params.handleSubmit()}>
                      <Icon name="done" color='#fff' size={24} />
                      <Text style={styles.saveText}>រក្សាទុក</Text>
                    </TouchableOpacity>
                   </ThemeProvider>,
    }
  };

  state = {}

  componentWillMount() {
    this.refreshState();
  }

  openDialog(show) {
    this.setState({ showDialog: show });
  }

  refreshState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];

    this.setState({user: user});
  }

  selectProfilePhoto() {
    this.openDialog(false);
    this.props.navigation.navigate('SelectPhoto', { refresh: this.refreshState.bind(this), type: 'photo' });
  }

  selectCoverPhoto() {
    this.openDialog(false);
    this.props.navigation.navigate('SelectPhoto', { refresh: this.refreshState.bind(this), type: 'cover' });
  }

  deleteProfilePhoto() {
    try {
      realm.write(() => {
        realm.create('User', {uuid: this.state.user.uuid, photo: ''}, true);
        this.openDialog(false);
        this.refreshState();
      });
    } catch (e) {
      alert(e);
    }
  }

  render() {
    let photo = require('../assets/images/default_profile.png');
    let cover = require('../assets/images/header_bg.jpg');

    if (!!this.state.user.photo) {
      photo = {uri: this.state.user.photo};
    }

    if (!!this.state.user.cover) {
      cover = {uri: this.state.user.cover};
    }

    return (
      <ThemeProvider uiTheme={{}}>
        <View style={{position: 'relative', flex: 1}}>
          <TouchableOpacity
            onPress={this.selectCoverPhoto.bind(this)}
            style={{position: 'relative', backgroundColor:'pink'}}>
            <Image
              source={cover}
              style={{width: null, height: 300}}/>

            <Avatar icon='camera-alt' size={54} style={{container: {opacity: 0.7, position: 'absolute', top: -60, right: 10, zIndex: 10}}} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.openDialog(true)}
            style={{position: 'absolute', top: 220, left: 24}}>
            <Image
              source={photo}
              style={{borderRadius: 60, width: 120, height: 120 }}/>

            <Avatar icon='camera-alt' size={54} style={{container: {opacity: 0.7, position: 'absolute', top: -87, right: 30, zIndex: 10}}} />
          </TouchableOpacity>

          <Dialog
            visible={this.state.showDialog}
            onTouchOutside={() => this.openDialog(false)}
            contentStyle={{ alignItems: 'flex-start' }} >

            <TouchableOpacity
              onPress={this.selectProfilePhoto.bind(this)}
              style={{padding: 10, flexDirection: 'row'}}>
              <Text style={styles.listItem}>Select Profile Picture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding: 10, flexDirection: 'row'}}>
              <Text style={styles.listItem}>View Profile Picture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding: 10, flexDirection: 'row'}}
              onPress={this.deleteProfilePhoto.bind(this)}>

              <Text style={styles.listItem}>Delete</Text>
            </TouchableOpacity>
          </Dialog>
        </View>
      </ThemeProvider>
    )
  }
}
