import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import ScrollableHeader from '../../components/scrollable_header';
import { Content, Button, Icon } from 'native-base';

export default class AboutCareerCounsellor extends Component {
  _renderContent = () => {
    return (
      <Content padder>
        <Text>
          ធ្វើតេស្តវាយតម្លៃមុខរបរ​ និងអាជីប ដើម្បីដឹងពីចំណង់​ចូលចិត្ត​​ ទេពកោសល្យ និង អាជីពដែលសាកសមសំរាប់ អ្នកនៅពេលអនាគត
        </Text>
        <View style={styles.rowWrapper}>
          <View style={styles.imageWrapper}>
            <Image style={{width: 18, height: 24}} source={require('../../assets/images/career_tests/personality.png')} />
          </View>

          <Text>១. ស្វែងយល់អំពីខ្លួន</Text>
        </View>
        <View style={styles.rowWrapper}>
          <View style={styles.imageWrapper}>
            <Image source={require('../../assets/images/career_tests/careers.png')} />
          </View>
          <Text>២. វាយតម្លៃផែនការមុខរបរ</Text>
        </View>
      </Content>
    )
  }

  _renderNavigation = () => {
    return (
      <Button transparent onPress={() => this.props.navigation.goBack()}>
        <Icon name='arrow-back' style={{color: '#fff'}} />
      </Button>
    )
  }

  render() {
    let title = 'ការធ្វើតេសវាយតម្លៃមុខរបរ​ និងអាជីព';
    return (
      <ScrollableHeader
        renderContent={ this._renderContent }
        renderNavigation={ this._renderNavigation }
        title={title}
        renderForeground={() => <Text style={styles.largeTitle}>{title}</Text>}
      />
    )
  }
}

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  imageWrapper: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14
  },
  largeTitle: {
    fontSize: 24,
    color: '#fff',
    lineHeight: 42
  }
})