/** @format */

import { StyleSheet, I18nManager } from 'react-native'
import { Color, Styles } from '@common'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  avatarBackground: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    flexWrap: 'wrap',
    padding: 30,
    paddingBottom: 10,
    paddingTop: 50,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: Color.DirtyBackground,
    marginBottom: 5,
  },
  fullName: {
    fontWeight: '600',
    color: Color.blackTextPrimary,
    backgroundColor: 'transparent',
    fontSize: Styles.FontSize.large,
    marginBottom: 6,
    textAlign: 'left',
  },
  email: {
    backgroundColor: 'transparent',
    fontSize: 13,
    textAlign: 'left',
  },
  textItem: {
    color: Color.blackTextPrimary,
    fontSize: Styles.FontSize.small
  },
  headerCategory: {
    flex: 1,
    //backgroundColor: 'rgba(255,255,255,0.2)',
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 10,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  textHeaderCategory: {
    fontWeight: '600',
    color: Color.blackTextPrimary,
    paddingRight: I18nManager.isRTL ? 20 : 0,
    paddingLeft: I18nManager.isRTL ? 20 : 0,
    textAlign: 'left',
  },
  textContainer: {
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    flex: 1,
  },
})
