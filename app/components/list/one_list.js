import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { mainStyles } from '../../assets/style_sheets/vocational_job/main';

class OneList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[mainStyles.box, {marginTop: 30}]}>
        <TouchableOpacity
          style={mainStyles.btnList}
          onPress={this.props.onPress}>
          <Text style={mainStyles.text}>{this.props.text}</Text>
        { !!this.props.selectedValue &&
            <View style={{flex:1}}>
              <Text style={[mainStyles.text,styles.rightText]}>{this.props.selectedValue}</Text>
            </View>
          }
          <AwesomeIcon name='angle-right' size={24} color='#bbb' />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rightText: {
    alignSelf: 'flex-end',
    paddingRight: 16,
    color: '#bababa'
  }
})

export default OneList;