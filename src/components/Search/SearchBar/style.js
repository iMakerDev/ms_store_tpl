import {StyleSheet, Dimensions, Platform} from 'react-native'
import {Color} from '@common'
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems:'center',
    marginHorizontal: 20,
    marginBottom: 5,
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 15,
    height: 40,
    borderRadius: 20,
    backgroundColor:'#fff',

    ...Platform.select({
      ios:{
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 1
        },
      },
      android:{
        elevation: 2
      }
    }),
  },
  input:{
    flex: 1,
    height: 30,
    fontSize: 14,
    padding: 0,
    marginLeft: 10
  },
  icon:{
    width: 13,
    height: 13,
    resizeMode: 'contain',
    margin: 10
  },
  separator:{
    width: 0.5,
    height: 20,
    backgroundColor: "#ccc"
  },
  iconStyle:{
    height:20,
    width:20
  }
})
