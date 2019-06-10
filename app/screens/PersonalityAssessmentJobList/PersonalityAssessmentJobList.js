import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View, Text, ScrollView } from 'react-native';
import { Content, ListItem, Left, Body, Icon, Right, Card, CardItem } from 'native-base';
import majorList from '../../data/json/personality_major';
import characteristicList from '../../data/json/characteristic_jobs';

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
        <CardItem
          key={index}
          bordered
          button
          onPress={() => this._onPressListItem(job)}
          >
          <Body>
            <Text>{job.name}</Text>
          </Body>
          <Right>
            { job.short_description && <AwesomeIcon name='angle-right' size={24} color='#bbb' /> }
          </Right>
        </CardItem>
      )
    });

    return (
      <Content padder>
        <Card>
          <CardItem>
            <Body>
              <Text>អ្នកដែលស្ថិតក្នុងក្រុមមនុស្សដែលមានប្រភេទបុគ្គលិកលក្ខណៈបែប{category.name_km}គួរចាប់យកអាជីពការងារជា៖</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          { doms }
        </Card>
      </Content>
    );
  }

  render() {
    return (
      <ScrollView>
        { this._renderList() }
      </ScrollView>
    )
  }
}
