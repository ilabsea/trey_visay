import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View, StyleSheet, Text } from 'react-native';
import { Container, Content, ListItem, Left, Body, Icon, Right } from 'native-base';
import styles from '../../assets/style_sheets/list';
import majorList from '../../data/json/personality_major';
import characteristicList from '../../data/json/characteristic_jobs';

import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';

export default class PersonalityAssessmentJobList extends Component {
  _onPressListItem(job) {
    if(!job.short_description) { return; }

    this.props.navigation.navigate('PersonalityAssessmentJobDetailScreen', {title: job.name, job: job})
  }

  _renderList = () => {
    let category = this.props.navigation.getParam('category');
    let jobs = characteristicList.map((obj) => obj.careers);
    jobs = [].concat.apply([], jobs);
    jobs = jobs.filter(obj => category.careers.includes(obj.code));

    let arr = jobs.filter(x => !!x.short_description);
    arr = arr.concat(jobs.filter(x => !x.short_description));

    let doms = arr.map((job, index) => {
      return (
        <ListItem
          key={index}
          button
          onPress={() => this._onPressListItem(job)}
          >
          <Body>
            <Text>{job.name}</Text>
          </Body>
          <Right>
            { job.short_description && <AwesomeIcon name='angle-right' size={24} color='#bbb' /> }
          </Right>
        </ListItem>
      )
    });

    return (
      <Content>
        <ListItem itemDivider><Text>អ្នកដែលស្ថិតក្នុងក្រុមមនុស្សដែលមានប្រភេទបុគ្គលិកលក្ខណៈបែប{category.name_km}គួរចាប់យកអាជីពការងារជា៖</Text></ListItem>
        { doms }
      </Content>
    );
  }

  render() {
    let title = 'ជម្រើសអាជីពការងារសក្ដិសម';
    return (
      <Container>
        <ScrollableHeader
          renderContent={ this._renderList }
          renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
          title={title}
          largeTitle={title}
        />
      </Container>
    )
  }
}
