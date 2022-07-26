/** @format */

import { StyleSheet } from 'react-native'
import { Color, Styles } from '@common'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
  },
  avatarBackground: {
    flexDirection: 'row',
    paddingTop: 40,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 40,
    backgroundColor: '#FFF',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  avatar: {
    height: Styles.width / 5,
    width: Styles.width / 5,
    borderRadius: Styles.width / 10,
    borderWidth: 0.5,
    borderColor: Color.DirtyBackground,
    marginBottom: 10,
  },
  fullName: {
    fontWeight: '600',
    color: Color.blackTextPrimary,
    backgroundColor: 'transparent',
    fontSize: Styles.FontSize.medium,
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
    fontSize: Styles.FontSize.small,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
})
