import { StyleSheet , Platform } from 'react-native';
import { FontSetting } from '../font_setting';

export default StyleSheet.create({
  btnList: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16
  },
  title: {
    flex: 1 ,
    fontSize: FontSetting.title
  },
  text: {
    fontSize: FontSetting.text
  },
  subTitle:{
    fontSize: FontSetting.sub_title
  },
  box: {
    marginBottom: 8,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  sectionText: {
    fontSize: FontSetting.text,
  },
  sectionTextInBox: {
    fontSize: FontSetting.text,
  },
  instructionContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 8,
    flex: 1
  },
  instructionText: {
    fontSize: FontSetting.text,
    marginLeft: 16,
    marginBottom: 8
  },
  link: {
    color: '#1976d2',
    fontSize: FontSetting.text,
    height: 26
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
})
