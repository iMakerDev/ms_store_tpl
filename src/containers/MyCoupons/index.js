import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator,Clipboard } from 'react-native'
//  import Clipboard from '@react-native-community/clipboard'
// import * as Clipboard from 'expo-clipboard'
// import Clipboard from '@react-native-clipboard/clipboard'
import { getAllCoupons } from '@services/Database'
import { Languages, withTheme } from "@common";
import WPUserAPI from '../../services/WPUserAPI'
import styles from './styles'
import { toast } from '@app/Omni';
const MyCoupons = ({theme}) => {
    const user = useSelector((state) => state.user.user)
    const [couponsData, setCouponsData] = useState([])
    const [couponsList, setCouponsList] = useState([]) //优惠券列表
    const [usedCoupons,setUsedCoupons] =useState([])
    const [MyList, setMyList] = useState([]);
    const [loading, setLoading] = useState(true);


    const getMess = async () => {
        await getIntegral()
        await getCouponsList()
        setLoading(false);
    }
    useEffect(() => {
        getMess()
    }, []);

    useEffect(() => {
        filterCoupon()
    }, [MyList, couponsData])

    //总的优惠券列表
    const getCouponsList = async () => {
        let data = await WPUserAPI.getAll()
        console.log("++++++");
        if (data.length) {
            setCouponsData([...data])
        }
    }
    //拿我的优惠券列表
    const getIntegral = async () => {
        let Muser = await WPUserAPI.GetUserNewestMess(user.id);
        if(Muser){
            let res = Muser.meta_data.filter(item => item.key === 'UserMeta')
            if(res.length){
                let arr = JSON.parse(res[0].value)
                setMyList(() => arr.coupons)
            }     
        }
    }

    const filterCoupon = () => {
        let arr = [];
        for (let i = 0; i < MyList.length; i++) {
            for (let j = 0; j < couponsData.length; j++) {
                if (MyList[i].coupon_id === couponsData[j].id) {
                    arr.push({ ...couponsData[j], Gid: MyList[i].id ,pay_at:MyList[i].pay_at})
                }
            }
        }
        console.log(arr)
        setCouponsList(() => arr)
    }
    // const copyToClipboard = async () => {
    //     // alert(1)
    //     let res=await Clipboard.setStringAsync('item.code');
    //     console.log(res)
    //     };


    const couponItem = ({ item }) => {
        return <View style={{width:'90%',marginHorizontal:'2.5%',marginVertical:'2.5%'}}>
            <View style={{ width: '100%',overflow:'hidden' }}>
                <View style={[styles.couponsContainer,{flexDirection: 'column', backgroundColor: item.pay_at ? 'gray':'#1db0ab'}]}>
                    <View style={{flexDirection:'row',justifyContent:'space-around',padding:10}}>
                        <Text style={styles.couponsSum}>{item.amount}</Text>
                        <View>
                            <Text style={{ ...styles.couponsTip, marginBottom: 5 }}>优惠券</Text>
                            <Text style={styles.couponsTip}>{'0.00' === item.minimum_amount ? '无门槛' : `满${item.minimum_amount}可用`}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.codeText,{ backgroundColor: item.pay_at ? "gray":'rgba(43,134,131,0.9)' ,}]} onPress={()=>{Clipboard.setString(item.code);toast('复制成功')}}>
                        <Text style={{ fontSize: 15, color: "#fff" }}>{Languages.ConversionCode}：</Text>
                        <Text style={{ fontSize: 15, color: "#fff", }}>{item.code}</Text>
                        <Text style={{ fontSize: 15, color: '#fff' }}>{item.Gid}</Text>
                    </TouchableOpacity>
                    {item.pay_at ?  <Text style={{position:'absolute',left:'-8%',top:10, transform: [{ rotate: "-45deg" }],backgroundColor:'#aba9a9',paddingHorizontal:28,paddingVertical:6}}>已使用</Text>:null}
                </View>
            </View>

        </View>
    }

    return <View style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:theme.colors.background }}>
        {
            loading &&
            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                <ActivityIndicator size={'large'} />
            </View>
        }
        {/* {
                couponsList.length? <FlatList
                data={couponsList}
                keyExtractor={(item, index) => item.id + '' + index}
                renderItem={couponItem}
                ></FlatList>:<Text>暂无优惠券</Text>
            } */}
        <Text>{'点击兑换码以复制优惠券的兑换码'}</Text>
        <FlatList
            style={{marginVertical:30,width:'90%',marginHorizontal:'5%'}}
            data={couponsList}
            keyExtractor={(item, index) => item.id + '' + index}
            renderItem={couponItem}
        ></FlatList>
    </View>
}

export default withTheme(MyCoupons);