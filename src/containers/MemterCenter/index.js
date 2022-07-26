import React, { useEffect, useState,useCallback } from 'react'
import { useSelector, connect } from "react-redux";
import styles from './styles'
import { View, Text, TouchableOpacity, Image, TouchableHighlight, Modal,ActivityIndicator ,SafeAreaView,ScrollView,  RefreshControl} from "react-native";
import { Languages, Tools, withTheme } from "@common";
import { Images } from "@common";
import { UserProfileItem, } from "@components";
import { pushCoupon, addIntegral } from '@services/Database'
import { toast } from "@app/Omni";
import WPUserAPI from '../../services/WPUserAPI'
import database from '@react-native-firebase/database';
import style from '@app/components/PostLayout/style';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const MemberCenter = ({ navigation, theme }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [couponsData, setCouponsData] = useState([]) //所有可兑换的优惠券信息
  const [modalVisible, setModalVisible] = useState(false) //显示或隐藏兑换优惠券弹窗
  const [selectCoupon, setSelectCoupon] = useState(null) //选择的优惠券信息
  // const [oldIntegral, setOldIntegral] = useState(0) //使用过的积分
  
  
  
  const [MyIntegral, setMyIntegral] = useState(0)//用户积分
  const [MyCoupon, setMyCoupon] = useState([]);//用户优惠券列表
  const [MyRecord, setMyRecord] = useState([]);//用户使用优惠券记录
  const user = useSelector((state) => state.user.user)
  const [loading, setLoading] = useState(true);
  const { id: userId } = user
  const [availablePoint, setAvailablePoint] = useState(0)
  const myOrders = useSelector((state) => state.carts.myOrders)
  const name = Tools.getName(user);


  const getMess = async () => {
    await getIntegral()
    await getCouponsList()
    setLoading(false);
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCouponsList();
    getIntegral();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getMess()
    // getUsedPoints()
  }, []);

  //已使用的积分
  // const getUsedPoints = () => {
  //   database()
  //     .ref("/users")
  //     .on("value", (values) => {
  //       let points = 0
  //       myOrders.forEach(item => {
  //         if (item.status === 'completed') {
  //           points += Number(item.total)
  //         }
  //       });
  //       const countPoints = Number(points) - Number(values.val()[userId].usedPoints)
  //       setAvailablePoint(Math.round(countPoints))
  //       setOldIntegral(values.val()[userId].usedPoints)
  //     })
  // }


  const getCouponsList = async () => {
    let data = await WPUserAPI.getAll()
    if (data.length) {
      setCouponsData([...data])
    }
  }



  //get integral from userObject
  //获取integral对象
  const getIntegral = async () => {
    let Muser = await WPUserAPI.GetUserNewestMess(user.id);
    let res = Muser.meta_data.filter(item => item.key === 'UserMeta')
    if(res.length){
      let arr = JSON.parse(res[0].value)
      setMyCoupon(arr.coupons)
      setMyIntegral(arr.integral)
      setMyRecord(arr.integral_records)
    }
  }

  //路由跳转
  const _handlePress = (routeName) => {
    navigation.navigate(routeName);
  };

  //点击兑换优惠券
  const convertClick = (item) => {
    setSelectCoupon(() => item)

    setModalVisible(true)
  }

  //确定兑换优惠券
  const confirm = async () => {
    // usage_limit_per_user
    let inte = MyIntegral
    let CouponList = MyCoupon

    if (MyIntegral < Number(selectCoupon.amount) * 10) {
      alert("积分不足")
    } else if (selectCoupon.usage_limit_per_user && CouponList.filter(item => item.coupon_id === selectCoupon.id).length >= selectCoupon.usage_limit_per_user) {
      alert("兑换已达上限")
    } else {
      alert('兑换成功')
      CouponList.push({
        id: new Date().getTime(),
        coupon_id: selectCoupon.id,
        created_at: new Date(),
        pay_at: null,
        order_id: null
      })
      setMyCoupon(() => {
        return CouponList
      })
      inte = inte - Number(selectCoupon.amount) * 10
      setMyIntegral(inte)
      console.log({ integral: MyIntegral, coupon: MyCoupon, integral_records: MyRecord })
      await WPUserAPI.UpdateUserCoupon(
        user.id, {
        "meta_data": [{ "key": "UserMeta", "value": JSON.stringify({ integral: inte, coupons: MyCoupon, integral_records: MyRecord }) }]
      }
      )
    }
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
    <ScrollView style={styles.scrollView} 
    contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
    refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      {
        loading ?
          <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
            <ActivityIndicator size={'large'} />
          </View> : <>
            <View style={[styles.container]}>
              <View style={styles.header}>
                <TouchableHighlight style={styles.avatar}>
                  {/* {
          user.avatar_url||user.avatar_url===0? <Image
            source={Images.portrait[user.avatar_url]}
            resizeMethod='scale'
            style={styles.avatar}
          /> :
          <Image
          style={styles.avatar}
          resizeMethod='scale'
          source={Images.defaultAvatar}
          />
        } */}
                  <Image
                    source={Images.portrait[11]}
                    resizeMethod='scale'
                    style={styles.avatar}
                  />
                </TouchableHighlight>
                <View style={styles.textContainer}>
                  <View style={styles.line}>
                    <Text style={[styles.fullName, { color: theme.colors.text }]}>{name}</Text>
                    <Text style={[styles.address, { color: theme.colors.text }]}>
                      {user ? user.address : ""}
                    </Text>
                    <Image source={Images.icons.iconMember} style={styles.img} />
                  </View>
                </View>
              </View>
            </View>
            <UserProfileItem label={Languages.MyPoints} value={MyIntegral} />
            <UserProfileItem
              icon
              onPress={() => _handlePress('Coupons')}
              label={Languages.MyCoupon}
            />
            <View style={styles.couponsContent}>
              {
                couponsData.map((item, index) => {
                  return <View key={index} style={styles.coupon}>
                    <View style={{ width: 170 }}>
                      <View style={styles.couponsContainer}>
                        <Text style={styles.couponsSum}>{item.amount}</Text>
                        <View>
                          <Text style={{ ...styles.couponsTip, marginBottom: 5 }}>{Languages.Coupon}</Text>
                          <Text style={styles.couponsTip}>{'0.00' === item.minimum_amount ? '无门槛' : `满${item.minimum_amount}可用`}</Text>
                        </View>
                      </View>
                      <TouchableOpacity onPress={() => { convertClick(item) }}>
                        <Text style={{ fontSize: 15, color: "#fff", height: 30, lineHeight: 30, textAlign: 'center', backgroundColor: "#ab283a" }}>{`${item.amount * 10}积分兑换`}</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                })
              }
            </View>
            {selectCoupon ? <Modal
              transparent
              visible={modalVisible}
            >
              <View style={styles.mask}>
                <View style={styles.tipContainer}>
                  <Text style={{ marginBottom: 10, color: "#000", fontWeight: "900", fontSize: 20 }}>{Languages.CouponInfo}</Text>
                  <View>
                    <Text style={styles.tipText}>{`1、金额：${selectCoupon.amount}`}</Text>
                    <Text style={styles.tipText}>{`2、${'0.00' === selectCoupon.minimum_amount ? '无门槛' : `满${selectCoupon.minimum_amount}可用`}`}</Text>
                    <Text style={styles.tipText}>{`3、${selectCoupon.amount * 10}积分可兑换`}</Text>
                    <Text style={styles.tipText}>{`4、可用兑换次数：${selectCoupon.usage_limit_per_user ? selectCoupon.usage_limit_per_user : '无限次数'}`}</Text>
                  </View>
                  <View style={styles.buttons}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: '#eee' }} onPress={() => { setModalVisible(false) }}>
                      <Text style={{ ...styles.buttonTxet, color: '#000' }}>{Languages.CANCEL}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: '#06bcee' }} onPress={confirm}>
                      <Text style={{ ...styles.buttonTxet, color: "#fff", }}>{Languages.Exchange}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal> : null}
          </>
      }

    </View >
    </ScrollView>
    </SafeAreaView>
  )
}
const mapStateToProps = (state) => {
  return {
    totalPoints: state.totalPoints,
    usedPoints: state.usedPoints
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/MemberPointsRedux");
  return {
    getTotalPoints: () => dispatch(actions.getTotalPoints()),
    getUsedPoints: () => dispatch(actions.getUsedPoints())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(MemberCenter));