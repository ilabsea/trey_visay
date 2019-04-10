import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Image,
  Platform
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';

import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import CloseButton from '../../components/shared/close_button';

import styles from '../../assets/style_sheets/profile_form';
import shareStyles from './style';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Images from '../../assets/images';
import CheckboxGroup from '../../components/checkbox_group';
import FooterBar from '../../components/FooterBar';
import MathUtil from '../../utils/math';

import realm from '../../schema';
import User from '../../utils/user';
import characteristicList from '../../data/json/characteristic_jobs';

let entries = ["មានទំនាក់ទំនងល្អជាមួយនឹងក្រុមការងារ", "ស្រាវជ្រាវ", "ឯករាជ្យ", "មហិច្ឆតា", "មានទំនុកចិត្ត", "មានផែនការ និងគៅដៅច្បាស់លាស់", "ហ្មត់ចត់នឹងការងារ", "មានទេពកោសល្យ", "មានចម្ងល់ជារឿយ", "មានទំនួលខុសត្រូវ", "គិតស៊ីជំរៅ និងមានហេតុផល", "ប្រាកដប្រជា", "ជាបុគ្គលឆ្នើម", "មានស្មារតីប្រុងប្រយត្ន័", "មានភាពជាអ្នកដឹកនាំ និងគ្រប់គ្រង", "អនុវត្តន៍ការងារជាក់ស្តែង", "គ្រប់គ្រងពេលវេលា​បានល្អ", "មានក្រមវិន័យល្អ", "មានឆន្ទៈ", "ឆ្លាត", "ចូលចិត្តវិទ្យាសាស្រ្ត", "មានគំនិតច្នៃប្រឌិត", "ចូលចិត្តធ្វើការជាមួយ នឹងបច្ចេកវិទ្យា និង គ្រឿងម៉ាស៊ីន", "មានដំណោះស្រាយល្អ", "ពូកែចរចារ", "ចេះសម្របខ្លួនតាមស្ថានភាពជាក់ស្ដែង", "អត់ធ្មត់", "ពូកែសម្របសម្រួល", "ចូលចិត្តធ្វើការជាមួយមនុស្ស", "ស្លូតបូត និងសុភាពរាបសារ", "ជួយផ្ដល់យោបល់ឲ្យអ្នកដទៃ", "ចូលចិត្តទទួលការរិៈគន់ក្នុងន័យស្ថាបនា", "ចេះចែករំលែកបទពិសោធន៍ការងារ និងចំណេះដឹង", "មានប្រាស្រ័យល្អក្នុងសហគមន៍", "រួសរាយរាក់ទាក់"];

export default class PersonalityScreen extends Component {
  currentGroup;

  state = {
    jobs: [],
    confirmDialogVisible: false,
    user: '',
    game: '',
    personalities: MathUtil.shuffle(entries),
    characteristicEntries: [],
  }

  componentWillMount() {
    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this)});
    this._initState();
    this._backHandler();
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

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];

    if (!!game.characteristicEntries.length) {
      let obj = { characteristicEntries: game.characteristicEntries.map((obj)=> obj.value) };
      this.setState(obj);
    }

    this.setState({user: user, game: game});
  }

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('PersonalityScreen'), true);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, key: null, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorStack'}]});
    });
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, key: null, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorStack'}]});
    });
  }

  _findAndSetMaximumScoreGroup() {
    let arr = [];

    characteristicList.map((obj, i) => {
      let arr1 = obj.entries;
      let arr2 = this.state.characteristicEntries;
      let matchEntries = arr1.filter((n) => arr2.includes(n));

      arr.push({id: i+1, score: matchEntries.length});
    })

    let max = MathUtil.findMaxObjBy(arr, 'score');
    this.currentGroup = max
  }

  _goNext() {
    if (this.state.characteristicEntries.length < 5) {
      return this.refs.toast.show('សូមជ្រេីសរេីសបុគ្គលិកលក្ខណៈចំនួន ៥!', DURATION.SHORT);
    }
    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    this._findAndSetMaximumScoreGroup();
    this._handleSubmit();
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData('PersonalityJobsScreen'), true);
      let title = characteristicList.find((obj) => obj.id == this.currentGroup.id).career_title;
      this._goToPersonalityJobsScreen(this.currentGroup.id, title);
    });
  }

  _buildData(step) {
    let data = this.state.characteristicEntries.map((value) => {
      return { value: value };
    })

    let obj =  {
      uuid: this.state.game.uuid,
      characteristicEntries: data,
      characteristicId: this.currentGroup && this.currentGroup.id || null,
      step: step || 'PersonalityJobsScreen'
    }

    return obj;
  }

  _formatDataForCheckbox(personalities) {
    let arr = [];

    for(let i = 0; i < personalities.length; i++) {
      arr.push({ value: personalities[i], label: personalities[i] })
    }
    return arr;
  }

  _handleChecked(arr) {
    this.setState({characteristicEntries: arr});
  }

  _renderPersonalities() {
    let checkboxes = this._formatDataForCheckbox(this.state.personalities);

    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>បុគ្គលិកលក្ខណៈ</Text>

        <View>
          <CheckboxGroup
            onSelect={(selected) => {this._handleChecked(selected)}}
            items={checkboxes}
            checked={this.state.characteristicEntries}
            style={{
              icon: {
                color: '#4caf50',
                size: 30
              },
              container: {
                flexDirection: 'row',
                borderTopWidth: 0.5,
                borderColor: '#ccc',
                paddingVertical: 8,
              },
              label: {
                color: '#333',
                fontSize: 16,
                marginLeft: 10
              }
            }}
          />
        </View>
      </View>
    )
  }

  _goToPersonalityJobsScreen(groupNumber, title) {
    this.currentGroup = groupNumber;
    this.props.navigation.navigate('PersonalityJobsScreen', { title: title, groupNumber: groupNumber})
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16}}>
            <View style={{flexDirection: 'row', marginVertical: 16, marginRight: 16, flex: 1}}>
              <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
              <Text>ចូរប្អូនជ្រើសរើស បុគ្គលិកលក្ខណៈខាងក្រោមឲ្យបានយ៉ាងតិចចំនួន៥ ដែលសមស្របទៅនឹងលក្ខណៈសម្បត្តិរបស់ប្អូនផ្ទាល់ និងអាចជួយប្អូនក្នុងការជ្រើសរើស អាជីពមួយជាក់លាក់នាពេលអនាគត។</Text>
            </View>

            { this._renderPersonalities() }
          </View>
        </ScrollView>

        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext.bind(this)} />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    );
  };
}
