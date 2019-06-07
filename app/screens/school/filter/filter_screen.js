import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Content, Footer } from 'native-base';

import API from '../../../api/schools';

import mainStyles from '../../../assets/style_sheets/main/main';
import { Colors } from '../../../assets/style_sheets/main/colors';

import OneList from '../../../components/list/one_list';
import GridList from '../../../components/list/grid_list';
import universities from '../../../data/json/universities.json';
import FooterBar from '../../../components/footer/FooterBar';

class FilterScreen extends Component {
  _keyExtractor = (item, index) => index.toString();

  constructor(props){
    super(props);
    this.state={
      majors: [],
      selectedValue: '',
      selectedProvince: '',
      category: props.navigation.state.params.category,
      size: 10
    }
  }

  componentWillMount(){
    this.refreshProvinceValue();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleReset: this.resetValues
    });
  }

  resetValues = () => {
    API.clearSelectedValues();
    this.setState({ selectedValue: '', selectedProvince: '' })
  }

  getMajors(){
    let category = this.state.category;
    let province = this.state.selectedProvince;
    let departments = [];
    universities.map(school => {
      if(province){
        if((school.category == category) && (school.province == province)){
          departments.push(school.departments);
        }
      }else{
        if(school.category == category){
          departments.push(school.departments);
        }
      }
    });
    departments = [].concat.apply([], departments);
    let majors = departments.map(department => department.majors);
    majors = [].concat.apply([], majors);
    majors = [...new Set(majors)];
    this.setState({majors : majors});
  }

  setActive(value){
    this.setState({selectedValue: value});
  }

  setFilterValues(){
    let selectedValue = this.state.selectedValue == null ? '' : this.state.selectedValue;
    API.setSelectedMajor(selectedValue);
    this.props.navigation.state.params.refreshValue();
    this.props.navigation.goBack();
  }

  refreshProvinceValue() {
    API.getSelectedProvince((province) => {
      province = province == 'គ្រប់ទីកន្លែង'? '' : province;
      this.setState({ selectedProvince: province });
      this.getMajors();
      API.getSelectedMajor((major) => {
        major = major == 'គ្រប់ជំនាញ' ? '': major;
        this.setState({ selectedValue: major });
      });
    });
  }

  renderButton(major,i){
    let active = this.state.selectedValue == major;
    let activeIconBg = active ? { backgroundColor: Colors.blue }: { backgroundColor: Colors.gray };
    let activeText = active ? { color: Colors.blue }: '';
    return(
      <TouchableOpacity
        style={styles.btn}
        key={i}
        onPress={() => this.setActive(major)}>
        <View style={[styles.iconWrapper, activeIconBg]}>
          <Image
            source={require("../../../assets/icons/school/major.png")}
            resizeMode='contain'
            style={styles.icon}
          />
        </View>
        <Text style={[activeText , { flex: 1 , paddingRight: 16}]}>{major}</Text>
      </TouchableOpacity>
    )
  }

  handleLoadMore = () => {
    size = this.state.size + 6;
    this.setState({size: size})
  }

  renderMajors(){
    let majors = ['គ្រប់ជំនាញ'].concat(this.state.majors);
    return(
      <View style={[ mainStyles.grid, { justifyContent: 'flex-start', margin: 0 }]}>
        <FlatList
          data={ majors.slice(0, this.state.size) }
          renderItem={ ({item, i}) => this.renderButton(item, i) }
          refreshing={false}
          keyExtractor={this._keyExtractor}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0.4}
          horizontal={false}
          numColumns={2}
        />
      </View>
    )
  }

  render(){
    let province = this.state.selectedProvince ? this.state.selectedProvince : 'គ្រប់ទីកន្លែង';
    return (
      <Container>
        <Content style={{ backgroundColor: 'rgb(239, 240, 244)' }}>
          <ScrollView>
            <OneList onPress={() => {
                this.props.navigation.navigate('FilterProvinces', {
                  title: 'ជ្រើសរើសទីតាំង',
                  category: this.state.category,
                  selectedProvince: province,
                  refreshValue: this.refreshProvinceValue.bind(this)
                })
              }} text='ជ្រើសរើសទីតាំង' selectedValue={province} />

            <Text style={[ mainStyles.sectionText, { margin: 16, marginBottom: 0 }]}>
              ជ្រេីសរេីសជំនាញ
            </Text>

            { this.renderMajors() }

          </ScrollView>
        </Content>
        <Footer>
          <FooterBar text='យល់ព្រម' onPress={this.setFilterValues.bind(this)} />
        </Footer>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    width: wp('50%'),
    height: hp('10%'),
    backgroundColor: 'white',
    borderColor: 'rgb(200, 199, 204)',
    borderWidth: 0.5,
    alignItems: 'center'
  },
  iconWrapper:{
    width: 32,
    height: 32,
    borderRadius: 12,
    marginRight: 16,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:  'rgb(155, 155, 155)'
  },
  icon:{
    width: 18,
    height: 18
  }
})


export default FilterScreen;
