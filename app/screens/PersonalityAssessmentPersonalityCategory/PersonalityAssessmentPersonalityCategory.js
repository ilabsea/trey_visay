import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Container, Content, ListItem, Left, Body, Icon, Right } from 'native-base';
import majorList from '../../data/json/personality_major';
import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';

export default class PersonalityAssessmentPersonalityCategory extends Component {
  constructor(props) {
    super(props);

    let category = props.navigation.getParam('category');
    this.state = {
      category: category
    }
  }

  _renderList() {
    let entries = this.props.navigation.getParam('entries');

    if (!entries.length) { return (null); }

    let doms = entries.map((entry, index) => {
      return (
        <ListItem
          key={index}
          style={{backgroundColor: '#fff'}}
          icon>
          <Left>
            <AwesomeIcon name='check-square' size={24} color='rgb(17, 130, 254)' />
          </Left>
          <Body>
            <Text>{entry.name_km}</Text>
          </Body>
        </ListItem>
      )
    });

    return (
      <View>
        <Text style={styles.sectionHeader}>បុគ្គលិកលក្ខណៈរបស់អ្នក</Text>
        <View style={{backgroundColor: '#fff'}}>
          {doms}
        </View>
      </View>
    );
  }

  _renderDescription() {
    if (!this.state.category.description) {
      return (null);
    }

    let doms = this.state.category.description.split(';').map((text, index) => {
      return (
        <Text key={index}>{text}</Text>
      );
    })

    return (
      <View>
        <Text style={styles.sectionHeader}>មនុស្សបែប{this.props.navigation.getParam('title')}</Text>
        <View style={{backgroundColor: '#fff', padding: 16, marginHorizontal: 16, borderRadius: 8}}>{doms}</View>
      </View>
    );
  }

  _renderButtonList() {
    let options = [
      {label: 'ជម្រើសនៃការសិក្សាកម្រិតមធ្យមសិក្សាទុតិយភូមិ', screen: 'HighSchoolStudyOptionScreen'},
      {label: 'ជម្រើសនៃការសិក្សាកម្រិតឧត្តមសិក្សា', screen: 'MajorListScreen'},
      {label: 'ជម្រើសអាជីពការងារសក្ដិសម', screen: 'PersonalityAssessmentJobListScreen'},
    ];

    let doms = options.map((option, index) => {
      return (
        <ListItem
          key={index}
          button
          onPress={() => {
            this.props.navigation.navigate(option.screen, {
              category: this.state.category,
              assessment: this.props.navigation.getParam('assessment')
            })}
          }>
          <Body>
            <Text>{option.label}</Text>
          </Body>
          <Right>
            <AwesomeIcon name='angle-right' size={24} color='#bbb' />
          </Right>
        </ListItem>
      )
    });

    return (
      <View>
        <Text style={styles.sectionHeader}>ព័ត៌មានបន្ថែម</Text>
        <View style={{backgroundColor: '#fff'}}>{ doms }</View>
      </View>
    );
  }

  _renderNavigation = () => {
    return (
      <BackButton navigation={this.props.navigation}/>
    )
  }

  _renderContent = () => {
    return (
      <Content>
        { this._renderList() }
        { this._renderDescription() }
        { this._renderButtonList() }
      </Content>
    )
  }

  render() {
    return (
      <ScrollView>
        { this._renderContent() }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 16,
    paddingBottom: 8
  }
});
