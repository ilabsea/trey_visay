import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon,
} from 'react-native-material-ui';

import ScrollableHeader from '../components/scrollable_header';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this._renderPersonalInfor = this._renderPersonalInfor.bind(this);
    this._renderFamilyInfo = this._renderFamilyInfo.bind(this);
    this._renderFamilySituation = this._renderFamilySituation.bind(this);
  }

  _renderScrollViewContent() {
    const PROFILE_SIZE = 120;

    return (
      <View>
        <View style={{position: 'absolute', left: 24, top: -PROFILE_SIZE*2/3, zIndex: 1}}>
          <Image
            style={{width: PROFILE_SIZE, height: PROFILE_SIZE, borderRadius: PROFILE_SIZE/2}}
            source={require('../assets/images/default_profile.png')}
          />
        </View>

        { this._renderPersonalInfor() }
        { this._renderFamilyInfo() }
        { this._renderFamilySituation() }
      </View>
    )
  }

  _renderPersonalInfor() {
    return (
      <View style={[styles.box, {marginTop: 60}]}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>ព័ត៌មានផ្ទាល់ខ្លួន</Text>
          <TouchableOpacity>
            <Icon name="edit" />
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ឈ្មោះពេញ</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ភេទ</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ថ្ងៃខែឆ្នាំកំណើត</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>សញ្ជាតិ</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>លេខទូរស័ព្ទ</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>រៀនថ្នាក់ទី</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>រៀននៅសាលា</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>អាស័យដ្ឋានបច្ចុប្បន្ន</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>
      </View>
    )
  }

  _renderFamilyInfo() {
    return (
      <View style={styles.box}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>ព័ត៌មានគ្រួសារ</Text>
          <TouchableOpacity>
            <Icon name="edit" />
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ឪពុកឈ្មោះ</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ម្តាយឈ្មោះ</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>អាណាព្យាបាល</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>លេខទូរស័ព្ទឪពុកម្តាយ</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemLabel}>ចំនួយសមាជិកគ្រួសារ</Text>
          <Text style={styles.itemValue}>: Value</Text>
        </View>
      </View>
    )
  }

  _renderFamilySituation() {
    return (
      <View style={styles.box}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>ស្ថានភាពគ្រួសារ</Text>
          <TouchableOpacity>
            <Icon name="edit" />
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>ឪពុកម្តាយលែងលះ</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>មានពិការភាពក្នុងគ្រួសារ</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: Value</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>មានអំពើហិង្សាក្នុងគ្រួសារ</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>សាមាជិកគ្រួសារណាមួយជក់បារី</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: Value</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>សាមាជិកគ្រួសារណាមួយញៀនសុរា</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: Value</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>សាមាជិកគ្រួសារណាមួយជក់គ្រឿងញៀន</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: Value</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>ប្រភេទផ្ទះរបស់សិស្ស</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: Value</Text>
        </View>

        <View style={styles.item}>
          <Text style={[styles.itemLabel, {flex: 2}]}>ចំណូលប្រចាំខែគិតជាលុយរៀល</Text>
          <Text style={[styles.itemValue, {flex: 1}]}>: Value</Text>
        </View>
      </View>
    )
  }

  _renderHeader() {
    return(
      <Toolbar
        leftElement="menu"
        centerElement="My Profile"
        rightElement='edit'
        searchable={null}
        searchValue=''
        onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
        onRightElementPress={() => this.props.navigation.navigate('About')}
        style={{
          container: {backgroundColor: 'transparent'}
        }}
      />
    )
  }

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <ScrollableHeader
          customView={ this._renderScrollViewContent.bind(this) }
          imageBgSrc={ require('../assets/images/cat.jpg') }
          customHeader={ this._renderHeader.bind(this) }
          profile={require('../assets/images/default_profile.png')}
          profileSize={120}
        />
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    marginTop: 10,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    backgroundColor: '#fff'
  },
  item: {
    flexDirection: 'row',
    padding: 10
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold'
  },
  itemLabel: {
    fontSize: 16,
    flex: 1,
  },
  itemValue: {
    flex: 2,
    fontSize: 16,
    fontWeight: 'bold',
  }
});
