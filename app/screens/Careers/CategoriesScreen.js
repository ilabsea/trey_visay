import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
} from 'react-native';

import mainStyles from '../../assets/style_sheets/main/main';
import careerList from '../../data/json/characteristic_jobs';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import CloseButton from '../../components/shared/close_button';
import FooterBar from '../../components/footer/FooterBar';

import ScrollableHeader from '../../components/scrollable_header';
import ButtonList from '../../components/list/button_list';
import CarouselItem from '../../components/shared/carousel_item';
import CardItem from '../../components/list/card_item';

import realm from '../../db/schema';
import User from '../../utils/user';

export default class CategoriesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDialogVisible: false,
      game: null
    }
  }

  componentWillMount() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    this.setState({game : game});
    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });
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

  _goNext() {
    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    this.props.navigation.navigate('SubjectScreen');
  }

  _onYes() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, key: null, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this._onYes();
    });
  }

  renderItem(career, index){
    return(
      <CardItem
        text={career.item.name}
        index={index}
        width={'40%'}
        height={'18%'}
        onPress={() => this.props.navigation.navigate('CareerDetailScreen', {
          career: career.item
        })} />
    )
  }

  _renderCategory(category, i) {
    return (
      <View key={i} style={[mainStyles.carouselBox, {backgroundColor: '#fff', marginTop: 14}]}>
        <ButtonList hasLine={false} title={category.career_title}
          onPress={() => {
            this.props.navigation.navigate('ShowCareerCategoryScreen', {careerId: category.id})
          }} />
        <CarouselItem
          data={category.careers}
          renderItem={(career, index) => this.renderItem(career, index)}/>
      </View>
    )
  }

  _renderContent = () => {
    return (
      <View>
        { careerList.slice(0, 3).map((category, i) => {
          { return (this._renderCategory(category, i))}
        })}
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          renderContent={ this._renderContent }
          renderNavigation={ () => <CloseButton navigation={this.props.navigation}/> }
          title={'យល់ដឹងពីមុខរបរ'}
          largeTitle={'យល់ដឹងពីមុខរបរ'}
        />

        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext.bind(this)} />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
      </View>
    );
  };
}
