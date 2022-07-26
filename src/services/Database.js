import { firebase } from '@react-native-firebase/database';

/**
 * 将注册的用户信息传递到firebase database中
 * @param {Number} userid 注册的用户信息 
 */
export const signUpUserInfo = (userID) => {
    let data = {}
    data = {
        IsMember: false,
        avatar_url: "",
        usedPoints: 0,
        coupons: "",
    }
    firebase
        .app().database()
        .ref(`/users/${userID}`)
        .set(data)
        .then((res) => console.log(res, '设置database成功'))
        .catch((err) => { console.log(err, '设置database失败') })
}

/**
 * 获取用户所有的优惠券
 * @param {Number} userID 用户ID
 */
export const getAllCoupons = () => {
    return firebase
        .app().database()
        .ref("/users")
        .once("value")
}

/**
 * 保存用户兑换的优惠券
 * @param {Number} userID 用户ID
 * @param {Object} couponInfo 需要添加的优惠券信息
 */
export const pushCoupon = async (userID, couponInfo) => {
    getAllCoupons(userID).then(msg => {
        let couponsArr = msg._snapshot.value[userID].coupons
        if (couponsArr) {
            couponsArr = [...couponsArr,couponInfo]
            console.log(couponsArr, 'getAllCoupons')
        } else {
            couponsArr = [couponInfo]
        }

        firebase
            .app().database()
            .ref(`/users/${userID}`)
            .update({ coupons: couponsArr })
            .then(() => { toast('兑换成功') })
            .catch((err) => {
                toast('兑换失败，请重试')
                console.log(err, '设置database失败')
            })
    })
}

/**
 * 保存用户已经使用过的积分
 * @param {Number} integral 使用的积分
 * @param {Number} integral 用户id
 */
export const addIntegral = (userID,integral)=>{
    firebase
    .app().database()
    .ref(`/users/${userID}`)
    .update({ usedPoints : integral })
}