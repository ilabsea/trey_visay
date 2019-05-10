import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';

import headerStyles from '../../../assets/style_sheets/header';
import CloseButton from '../../../components/shared/close_button';
import NextButton from '../../../components/NextButton';
import SaveButton from '../../../components/shared/save_button';
import BackButton from '../../../components/shared/back_button';
import OpenDrawer from '../../../components/shared/open_drawer';

import Assessment from '../../Assessment/Assessment';
import PersonalityAssessment from '../../PersonalityAssessment/PersonalityAssessment';
import PersonalityAssessmentForm from '../../PersonalityAssessmentForm/PersonalityAssessmentForm';
import PersonalityAssessmentResult from '../../PersonalityAssessmentResult/PersonalityAssessmentResult';
import PersonalityAssessmentResultHistory from '../../PersonalityAssessmentResultHistory/PersonalityAssessmentResultHistory';
import PersonalityAssessmentMajorList from '../../PersonalityAssessmentMajorList/PersonalityAssessmentMajorList';
import PersonalityAssessmentMajorDetail from '../../PersonalityAssessmentMajorDetail/PersonalityAssessmentMajorDetail';
import PersonalityAssessmentPersonalityCategory from '../../PersonalityAssessmentPersonalityCategory/PersonalityAssessmentPersonalityCategory';
import PersonalityAssessmentHighSchoolStudyOption from '../../PersonalityAssessmentHighSchoolStudyOption/PersonalityAssessmentHighSchoolStudyOption';
import PersonalityAssessmentJobList from '../../PersonalityAssessmentJobList/PersonalityAssessmentJobList';
import PersonalityAssessmentJobDetail from '../../PersonalityAssessmentJobDetail/PersonalityAssessmentJobDetail';
import PersonalityAssessmentSubjectTip from '../../PersonalityAssessmentSubjectTip/PersonalityAssessmentSubjectTip';

const AssessmentStack = createStackNavigator(
  {
    AssessmentScreen: {
      screen: Assessment,
      navigationOptions: ({navigation}) => ({
        title: 'វាយតម្លៃមុខរបរនិងអាជីព',
        headerLeft: <OpenDrawer navigation={navigation}/>
      })
    },
    PersonalityAssessmentScreen: {
      screen: PersonalityAssessment,
      navigationOptions: ({navigation}) => ({
        title: 'វាយតម្លៃមុខរបរនិងអាជីព',
      })
    },
    RealisticScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តប្រាកដនិយម',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>
      })
    },
    InvestigativeScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តពូកែអង្កេត',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>
      })
    },
    ArtisticScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តសិល្បៈនិយម',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>
      })
    },
    SocialScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តសង្គម',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>
      })
    },
    EnterprisingScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តត្រិះរិះពិចារណា',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>
      })
    },
    ConventionalScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តសណ្ដាប់ធ្នាប់',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>
      })
    },
    AssessmentResultScreen: {
      screen: PersonalityAssessmentResult,
      navigationOptions: ({navigation}) => ({
        title: 'បង្ហាញលទ្ធផល',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation} text='រួចរាល់' icon='done'/>
      })
    },
    AssessmentResultHistoryScreen: {
      screen: PersonalityAssessmentResultHistory,
      navigationOptions: ({navigation}) => ({
        title: 'លទ្ធផលតេស្ត',
      })
    },
    PersonalityCategoryScreen: {
      screen: PersonalityAssessmentPersonalityCategory,
      navigationOptions: ({navigation}) => ({
        title: `លទ្ធផលតេស្តបែប${navigation.getParam('title')}`,
      })
    },
    HighSchoolStudyOptionScreen: {
      screen: PersonalityAssessmentHighSchoolStudyOption,
      navigationOptions: ({navigation}) => ({
        title: `ជម្រើសនៃការសិក្សាកម្រិតមធ្យមសិក្សាទុតិយភូមិ`,
      })
    },
    MajorListScreen: {
      screen: PersonalityAssessmentMajorList,
      navigationOptions: ({navigation}) => ({
        title: `ជម្រើសនៃការសិក្សាកម្រិតឧត្តមសិក្សា`,
      })
    },
    MajorDetailScreen: {
      screen: PersonalityAssessmentMajorDetail,
      navigationOptions: ({navigation}) => ({
        title: `ការសិក្សាជំនាញ${navigation.getParam('title')}`,
      })
    },
    PersonalityAssessmentJobListScreen: {
      screen: PersonalityAssessmentJobList,
      navigationOptions: ({navigation}) => ({
        title: `ជម្រើសអាជីពការងារសក្ដិសម`,
      })
    },
    PersonalityAssessmentJobDetailScreen: {
      screen: PersonalityAssessmentJobDetail,
      navigationOptions: ({navigation}) => ({
        title: `ទំព័រលម្អិតពីអាជីព`,
      })
    },
    PersonalityAssessmentSubjectTipScreen: {
      screen: PersonalityAssessmentSubjectTip,
      navigationOptions: ({navigation}) => ({
        title: `គន្លឹះពង្រឹងមុខវិជ្ជា${navigation.getParam('title')}`,
      })
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      headerTitleStyle: headerStyles.headerTitleStyle,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <BackButton navigation={navigation}/>
    }),
    initialRouteName: 'AssessmentScreen'
  }
);

export default AssessmentStack;
