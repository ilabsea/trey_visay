import React, {Component} from 'react';
import Toast, { DURATION } from 'react-native-easy-toast';

import {
  Button,
  Text,
  Modal,
  ScrollView,
  View,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import styles from './styles';
import { Colors } from '../../../assets/style_sheets/main/colors';

import LinearGradient from 'react-native-linear-gradient';

export default class Result extends Component{
  constructor(props) {
    super(props)
  }

  _renderFailTest() {
    return (
      <View style={{padding: 20}}>
        <View style={styles.paragraph}>
          <Text style={{color: '#fff'}}>
            ការជ្រើសរើសជំនាញនិង អាជីពមួយនាពេលអនាគត គឺមានសារៈសំខាន់ណាស់សម្រាប់បុគ្គលម្នាក់ៗ
            ដើម្បីទទួលបានចំណេះដឹង និងវិជ្ជាជីវៈគ្រប់គ្រាន់ និងឈានទៅប្រកួតប្រជែងទីផ្សារការងារនាពេលបច្ចុប្បន្ន។​
            ដូច្នេះការកំណត់ផែនការអាជីព និងការសម្រេចចិត្តជ្រើសរើស យក​ជំនាញ
            ជាកត្តាជំរុញឆ្ពោះទៅរកជំនាញជាក់លាក់។
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={{color: '#fff'}}>
            យើងសង្ឈឹមថា ប្អូនៗបំពេញកម្រងសំណួរនេះឡើងវិញដោយពិចារណាយ៉ាងល្អិតល្អន់
            និងអាចកំណត់ជ្រើសរើសមុខរបរមួយដែលខ្លួនពេញចិត្ត។​
            ក្នុងនាមយើងជាយុវជនម្នាក់ត្រូវមានភាពក្លាហានក្នុងការបង្កើតក្ដីសុបិន្តឲ្យបានធំទូលាយ និង វែងឆ្ងាយ ប្រសើរជាង
            បុគ្គលដែលរស់នៅដែលគ្មានគោលដៅច្បាស់លាស់។​ (សូមសែ្វងយល់សុភាសិតអប់រំខាងក្រោម៖)
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={{color: '#fff'}}>
            ១) មនុស្សម្នាក់ៗមិនអាចជ្រើសរើសកំណើតក្នុងគ្រួសារអ្នកមាន ឬអ្នកក្របានទេ
            ប៉ុន្ដែបុគ្គលនោះអាចកំណត់ជីវភាពរស់នៅបានប្រសើរ តាមរយៈការមានអាជីពមួយដ៏ល្អ។
          </Text>
          <Text style={{color: '#fff'}}>
            ២) តាំងចិត្តឲ្យបានខ្ពស់ រស់នៅជាមួយក្ដីសង្ឈឹម ទើបជីវិតមានតម្លៃពិតៗ
          </Text>
        </View>

      </View>
    )
  }

  _renderPassTest() {
    return (
      <View style={[styles.paragraph, {padding: 20}]}>
        <Text style={{color: '#fff', textAlign: 'center'}}>
          សូមអបអរសាទរ ពិន្ទុរបស់ប្អូនមានលើសពី 50% ហើយ ដូចនេះប្អូនអាចបន្តទៅវគ្គបន្ត។
        </Text>
      </View>
    )
  }

  _renderBtnActions(isPass) {
    let color = isPass ? Colors.blue : 'rgb(232, 92, 89)';
    let button = {flex: 1, marginVertical: 8}

    return (
      <View style={{paddingVertical: 8, paddingHorizontal: 20}}>
        { !isPass &&
          <TouchableOpacity
            onPress={() => {
              this.props.setModalVisible(false);
              this.props.callback();
            }} style={[styles.button, button]}
            underlayColor="rgba(0, 128, 0, 0.2)">

            <Text style={[styles.btnText, {color: color}]}>
              {this.props.testCount < 2 && 'សូម'}
              សាកល្បងធ្វើតេស្តម្តងទៀត
            </Text>
          </TouchableOpacity>
        }

        { (this.props.testCount > 1 || isPass) &&
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CareerCategoriesScreen');
              this.props.setModalVisible(false);
            }}
            style={[styles.button, button]}>

            <Text style={[styles.btnText, {color: Colors.blue}]}>ចូលទៅកាន់វគ្គបន្ត</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }

  _renderText(screenWidth) {
    return (
      <View style={{alignItems: 'center', marginTop: screenWidth/2-40}}>
        <Text style={{color: '#fff', fontSize: 80, lineHeight: 120}}>៥០%</Text>
      </View>
    )
  }

  render() {
    if (!this.props.modalVisible) {
      return (null)
    }

    let isPass = this.props.score >= 12;
    let imageUrl = isPass ? require('../../../assets/images/success.png') : require('../../../assets/images/fail.png')
    let colors = isPass ? ['rgb(53, 174, 235)', Colors.blue] : [rgb(255, 130, 97), rgb(255, 102, 98)]
    let {width} = Dimensions.get('window');

    return (
      <LinearGradient style={[styles.overlay]} colors={colors}>
        <ScrollView style={{flex: 1}}>
          <ImageBackground style={{width: width, height: width}} source={imageUrl}>
            <View style={{padding: 16}}>
              { this._renderText(width) }
            </View>
          </ImageBackground>

          { !isPass && this._renderFailTest() }
          { isPass && this._renderPassTest() }
          { this._renderBtnActions(isPass) }
        </ScrollView>

        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </LinearGradient>
    )
  };
}
