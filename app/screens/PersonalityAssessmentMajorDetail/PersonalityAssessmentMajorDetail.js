import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { Container, Content, ListItem, Body, Card, CardItem } from 'native-base';
import listStyles from '../../assets/style_sheets/list';
import uuidv4 from '../../utils/uuidv4';

import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';

export default class MajorDetail extends Component {
  _buildListWithTitle(title, items) {
    let doms = items.split(';').map((text, index) => this._buildList('-', text, true));

    return (
      <View>
        { this._buildList('\u2022', title) }
        { doms }
      </View>
    );
  }

  _buildList(symbol, text, isIndent) {
    let styleIndent = isIndent ? { paddingLeft: 16 } : {};

    return (
      <View style={[{flexDirection: 'row', width: '100%'}, styleIndent]} key={uuidv4()}>
        <Text style={{width: 16}}>{symbol}</Text>
        <Text style={{flex: 1}}>{text}</Text>
      </View>
    );
  }

  _renderContent = () => {
    let major = this.props.navigation.getParam('major');

    return (
      <Content padder>
        <Card>
          <CardItem bordered>
            <Text>មុខជំនាញ{major.name_km}</Text>
          </CardItem>

          <CardItem>
            <Body>
              { this._buildList('\u2022', `ចំណេះដឹងដឹងមូលដ្ឋានដែលបេក្ខជនត្រូវចេះសម្រាប់ទៅសិក្សាមុខជំនាញនេះ៖ ${major.basic_knowledge}`) }
              { this._buildList('\u2022', `ការសិក្សាដើម្បីទទួលបានសញ្ញាបត្របរិញ្ញាបត្រលើមុខជំនាញនេះ៖ ${major.study_credit}`) }
              { this._buildListWithTitle('ចំណេះដឹងដែលនិស្សិតទទួលបានក្រោយពីបញ្ចប់ការសិក្សារយៈពេល៤ឆ្នាំ៖', major.recieved_knowledge) }
              { this._buildListWithTitle('អង្គភាព ឬមូលដ្ឋានដែលអ្នកសិក្សាចប់មុខជំនាញនេះអាចទៅបម្រើការងារ៖', major.possible_workplaces) }
            </Body>
          </CardItem>
        </Card>
      </Content>
  );
  }

  render() {
    let title = `ការសិក្សាជំនាញ${this.props.navigation.getParam('title')}`;
    return (
      <ScrollableHeader
        renderContent={ this._renderContent }
        renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
        title={title}
        largeTitle={title}
      />
    )
  }
}
