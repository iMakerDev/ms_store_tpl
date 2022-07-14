/** @format */

import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const vw = width / 100
const vh = height / 100

export default StyleSheet.create({
  sideMenu: {
    backgroundColor: '#fff',
    flex: 1,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBorder: {
    borderTopWidth: 0,
  },
  menuBadge: {
    borderRadius: 9,
    position: 'absolute',
    right: 0,
    top: 17,
    fontSize: 12,
    color: 'white',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom: 20,
    height: 48,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuRowLogout: {
    position: 'absolute',
    bottom: vh * 5,
    alignItems: 'center',
    width: vw * 60,
  },
  menuLink: {
    fontSize: 22,
    color: '#111',
    fontWeight: '300',
  },
  fullname: {
    marginTop: 8,
    marginBottom: 6,
    fontSize: 14,
    color: '#151F41',
    fontWeight: '600',
  },
  email: {
    color: '#999',
    fontSize: 12,
    marginTop: 12,
  },
  profile: {
    alignItems: 'center',
    width: width / 2,
    marginTop: -(vh * 15),
    marginBottom: vh * 5,
  },
  avatar: {
    height: vh * 10,
    resizeMode: 'contain',
  },
  avatarView: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    width: vh * 10,
  },
  menuSignOut: {
    borderTopWidth: 0,
    position: 'absolute',
    bottom: vw * 10,
    width: vw * 80,
  },
  logoutLink: {
    fontSize: 15,
    color: '#999',
  },
  logoutLinkScale: {
    fontSize: 15,
    color: '#666',
    position: 'absolute',
    bottom: 20,
  },
  logo: {
    width: width / 2 - 20,
    height: vh * 10,
    resizeMode: 'contain',
    marginTop: -40,
    marginBottom: 40,
    marginLeft: 10,
  },
  menuOverlay: {
    backgroundColor: 'rgba(95, 209, 176, 0.9)',
  },
  menuColor: {
    backgroundColor: '#2AB5B3',
  },
  menuColorWide: {
    backgroundColor: 'rgba(45, 47, 59, 1)',
  },
  sideMenuLeft: {
    backgroundColor: '#fff',
    flex: 1,
    height,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative',
    marginBottom: 7,
    marginTop: 7,
    marginLeft: 16,
    height: 48,
  },
  menuRowWide: {
    marginLeft: vw * 10,
  },
  menuLinkLeft: {
    fontSize: 15,
    color: '#f9f9f9',
    fontWeight: '500',
    marginTop: 24,
  },
  logoutLinkLeft: {
    fontSize: 15,
    color: '#f9f9f9',
  },
  icon: {
    fontSize: 24,
    color: 'white',
    marginRight: 20,
    marginTop: 20,
  },
  iconWide: {
    marginRight: 40,
    fontSize: 22,
    marginTop: 21,
  },
  profileLeft: {
    alignItems: 'center',
    width: vw * 40,
    marginTop: -(vh * 30),
    marginBottom: vh * 5,
  },
  avatarLeft: {
    width: vw * 50,
    height: vh * 6,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  address: {
    fontSize: 11,
  },
  iconSmall: {
    fontSize: 16,
    color: 'white',
  },
  menuBg: {
    width,
    height: vh * 25,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileCenter: {
    alignItems: 'center',
    width: vw * 80,
    marginTop: -(vh * 30),
    marginBottom: vh * 5,
  },
})
