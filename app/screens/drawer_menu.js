import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Divider,
} from 'react-native-material-ui';

import Icon from 'react-native-vector-icons/Ionicons';

class DrawerMenu extends Component {
  static navigationOptions = {
    drawerLabel: 'DrawerMenu',
  };

  onPress() {
    this.props.navigation.navigate('DrawerClose')
  }

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <ScrollView>
          <View style={styles.header}>
            <Icon name="md-menu" size={20}  />
            <Text style={styles.title}>DrawerMenu</Text>
          </View>
          <Divider />

          <TouchableOpacity style={styles.item} onPress={this.onPress.bind(this)}>
            <Text>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={this.onPress.bind(this)}>
            <Text>Career</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={this.onPress.bind(this)}>
            <Text>Academic</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={this.onPress.bind(this)}>
            <Text>Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={this.onPress.bind(this)}>
            <Text>About</Text>
          </TouchableOpacity>

        </ScrollView>
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginLeft: 10,
  },
  item: {
    paddingHorizontal: 50,
    paddingVertical: 20
  }

});


export default DrawerMenu;