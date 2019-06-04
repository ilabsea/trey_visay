import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  BackHandler,
  TouchableOpacity,
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';
import { NavigationActions } from 'react-navigation';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import BackConfirmDialog from '../../../components/shared/back_confirm_dialog';
import FooterBar from '../../../components/footer/FooterBar';
import mainStyles from '../../../assets/style_sheets/main/main';

import realm from '../../../db/schema';
import User from '../../../utils/user';

import Audio from './audio';
import ScrollableHeader from '../../../components/scrollable_header';
import CloseButton from '../../../components/shared/close_button';
import { Container, Content } from 'native-base';

export default class GoalScreen extends Component {
  constructor(props) {
    super(props);

    this._initState();
    this._backHandler();
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];

    this.state = {
      user: user,
      game: game,
      reasonText: game.reason,
      voiceRecord: game.voiceRecord,
      visibleTourtip: true
    };

    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });
  }

  _handleBack() {
    this.setState({confirmDialogVisible: true});
  }

  _backHandler() {
    BackHandler.addEventListener('hardwareBackPress', this._onClickBackHandler);
  }

  _onClickBackHandler = () => {
    this.setState({confirmDialogVisible: true});

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    return true
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('GoalScreen'), true);
      this._closeDialog();
    });
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'CareerCounsellorScreen' })])
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);
      this._closeDialog();
    });
  }

  _goNext() {
    if (!this.state.reasonText && !this.state.voiceRecord) {
      return this.refs.toast.show('សូូមបំពេញគោលដៅរបស់អ្នកជាអក្សរ ឬក៏ថតជាសំលេង!', DURATION.SHORT);
    }

    this._handleSubmit();
  }

  _buildData(step) {
    let obj = {
      uuid: this.state.game.uuid,
      reason: this.state.reasonText,
      voiceRecord: this.state.voiceRecord,
      step: step || 'ContactScreen',
    };

    return obj;
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData(), true);
      this.props.navigation.navigate('ContactScreen');
    });
  }

  _renderTourtip() {
    return (
      <View style={styles.overlay}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16}}>
            <Text style={[styles.paragraph, {marginTop: 54,fontSize: 24, color: '#fff'}]}>ការណែនាំ</Text>
            <Text style={{color: '#fff'}}>
              អ្នកអាចដាក់គោលដៅ និងមូលហេតុដោយការសរសេរ ឬក៏ថតជាសំលេង! បន្ទាប់ពីប្អូនជ្រើសរើសមុខរបរមួយរួចហើយ។ ចូរប្អូនរៀបរាប់បន្ថែមពីមូលហេតុដែលប្អូនបានជ្រើសរើសមុខរបរនោះ ដោយគិតអំពី៖ ចំនុចខ្លាំងដែលប្អូនបានជ្រើសរើសចេញពីបុគ្គលិកលក្ខណៈ ដើម្បីឆ្លុះបញ្ចាំងពីគោលបំណងមួយដែលមានន័យពេញលេញ។ វាកាន់តែប្រសើរ ប្រសិនបើប្អូនសរសេរពីសាប្រយោជន៍នៃគោលបំណងនោះ ដែលបង្ហាញពី ការជួយ ផ្តល់ឲ្យ ចែករំលែក ឬស្ម័គ្រចិត្ត ដែលបំរើឲ្យ ប្រយោជន៍រួម (សហគមន៍/សង្គម យុវជន កុមារ ឬគ្រួសារជាដើម) ជាជាងប្រយោជន៍បុគ្គល ។
            </Text>
          </View>
        </ScrollView>

        <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
          <TouchableOpacity
            onPress={() => this.setState({visibleTourtip: false})}
            style={{borderRadius: 8, flex: 1, paddingHorizontal: 24, paddingVertical: 5, backgroundColor: 'rgb(255,255,255)'}}>
            <Text style={{textAlign: 'center', color: 'rgb(24, 118, 211)'}}>ចាប់ផ្ដើមបំពេញ</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderRecordSound() {
    return (
      <Audio
        callback={(path) => this.setState({voiceRecord: path})}
        audioPath={ this.state.voiceRecord }/>
    )
  }

  _renderContent = () => {
    return(
      <Container>
        <Content style={{padding: 20, backgroundColor: '#fff'}}>
          <Text style={[mainStyles.text]}>
            អ្នកអាចដាក់គោលដៅ និងមូលហេតុដោយការសរសេរ
          </Text>

          <TextInput
            style={[{textAlignVertical: 'top', height: 198, backgroundColor: 'rgb(239, 239, 239)', borderRadius: 8}]}
            onChangeText={(text) => this.setState({reasonText: text})}
            value={this.state.reasonText}
            placeholder='សរសេរចំលើយរបស់អ្នក'
            placeholderTextColor='rgb(155, 155, 155)'
            multiline={true}
            numberOfLines={4}
          />

          { this._renderRecordSound() }
        </Content>
      </Container>
    )
  }

  render() {
    let title = 'ដាក់គោលដៅមួយ និងមូលហេតុ';

    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          renderContent={ this._renderContent }
          renderNavigation={ () => <CloseButton navigation={this.props.navigation}/> }
          title={title}
          largeTitle={title}
        />

        { !this.state.visibleTourtip && <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext.bind(this)} /> }
        { this.state.visibleTourtip && this._renderTourtip() }

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    )
  };
}

var styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(25, 118, 210, 0.9)',
    top: 0,
    bottom: 0,
    left:0,
    right: 0,
  }
});
