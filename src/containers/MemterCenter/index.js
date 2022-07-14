import React, { useEffect, useState } from 'react'
import { useSelector, connect } from "react-redux";
import styles from './styles'
import { View, Text, TouchableOpacity, Image, TouchableHighlight, Modal } from "react-native";
import { Languages, Tools, withTheme } from "@common";
import { Images } from "@common";
import { UserProfileItem, } from "@components";
import { pushCoupon ,addIntegral} from '@services/Database'
import { toast } from "@app/Omni";
import WPUserAPI from '../../services/WPUserAPI'
import database from '@react-native-firebase/database';

const MemberCenter = ({ navigation,theme }) => {
  const [couponsData, setCouponsData] = useState([]) //所有可兑换的优惠券信息
  const [modalVisible, setModalVisible] = useState(false) //显示或隐藏兑换优惠券弹窗
  const [selectCoupon, setSelectCoupon] = useState(null) //选择的优惠券信息
  const [oldIntegral,setOldIntegral] = useState(0) //使用过的积分
  const user = useSelector((state) => state.user.user)
  const { id: userId } = user
  const [availablePoint, setAvailablePoint] = useState(0)
  const myOrders = useSelector((state) => state.carts.myOrders)
  const name = Tools.getName(user);

  useEffect(() => {
    getCouponsList()
    getUsedPoints()
  }, []);

  //已使用的积分
  const getUsedPoints = () => {
    database()
      .ref("/users")
      .on("value", (values) => {
        let points = 0
        myOrders.forEach(item => {
          if (item.status === 'completed') {
            points += Number(item.total)
          }
        });
        const countPoints = Number(points) - Number(values.val()[userId].usedPoints)
        setAvailablePoint(Math.round(countPoints))
        setOldIntegral(values.val()[userId].usedPoints)
      })
  }

  const getCouponsList = async () => {
    let data = await WPUserAPI.getAll()
    if (data.length) {

      setCouponsData([...data])
    }
  }

  //路由跳转
  const _handlePress = (routeName) => {
    navigation.navigate(routeName);
  };

  //点击兑换优惠券
  const convertClick = (item) => {
    setSelectCoupon(item)
    setModalVisible(true)
  }

  //确定兑换优惠券
  const confirm = () => {
    if(selectCoupon.used_by.length){
      for(const i of selectCoupon.used_by){
        if(i==userId){
          toast(Languages.CouponErr)
          return
        }
      }
    }
    if(availablePoint<Number(selectCoupon.amount)*10){
      toast(Languages.PointsErr)
      return
    }
    setModalVisible(false)
    pushCoupon(userId, selectCoupon)
    addIntegral(userId,oldIntegral+Number(selectCoupon.amount)*10)
    setOldIntegral(oldIntegral+Number(selectCoupon.amount)*10)
    setAvailablePoint(availablePoint-Number(selectCoupon.amount)*10)
    toast(Languages.ForSuccessful)
  }


  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={[styles.container]}>
        <View style={styles.header}>
          <TouchableHighlight style={styles.avatar}>
            <Image
              source={user.avatar_url ? Images.portrait[user.avatar_url] : Images.defaultAvatar}
              style={styles.avatar}
            />
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <View style={styles.line}>
              <Text style={[styles.fullName,{color:theme.colors.text}]}>{name}</Text>
              <Text style={[styles.address,{color:theme.colors.text}]}>
                {user ? user.address : ""}
              </Text>
              <Image source={Images.icons.iconMember} style={styles.img} />
            </View>
          </View>
        </View>
      </View>
      <UserProfileItem label={Languages.MyPoints} value={availablePoint} />
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
              <Text style={styles.tipText}>{`4、可用兑换次数：${selectCoupon.usage_limit ? selectCoupon.usage_limit : '无限次数'}`}</Text>
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
    </View >
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