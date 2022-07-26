import React from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { WooWorker } from "api-ecommerce";
import { connect } from "react-redux";

import { withTheme, Languages } from "@common";
import { Button } from "@components";
import styles from "./styles";;



class AddCredit extends React.PureComponent{
    showAlert = (tips) =>
        Alert.alert(
            "Tips",
            tips,
            [
            {
                text: "确定",
            },
            ],
        );


    _onPress = async (order,user) => {
        const userMetaData = await WooWorker.getCustomerById(user.id);
        // console.log(userMetaData.meta_data);

        // 查有无“UserMeta”字段
        let userMeta = userMetaData.meta_data.filter(item=>item.key==="UserMeta");
        if(userMeta.length === 0){
            // 初始化UserMeta字段
            let data = {
                integral : parseInt(order.total),
                coupons:[],
                integral_records: [{
                    created_at:Date.now(),
                    count: parseInt(order.total),
                    order_id: order.id
                }]
            };
            this.props.updateUserMetaData(user,[...userMeta,{"key":"UserMeta","value":JSON.stringify(data)}]);
            // const newData = await WooWorker.getCustomerById(user.id);
            // console.log(JSON.parse(newData.meta_data.filter(item=>item.key === "UserMeta")[0].value).integral);
            this.showAlert("领取成功");
        }else{
            // 解析出UserMeta
            userMeta = JSON.parse(userMeta[0].value);
            // console.log("+++++");
            // console.log(userMeta);
            // console.log(userMeta.integral);
            // console.log(userMeta.coupons);
            // console.log(userMeta.integral_records);
            // console.log("++++++");
            
            // 筛选本次订单的积分领取记录是否存在
            let orderId = userMeta.integral_records.filter(item => item.order_id === order.id);
            // console.log(orderId);
            // console.log(orderId.length);
            if(orderId.length !== 0){
                console.log("已领取");
                this.showAlert("你已领取过此订单的积分");
            }else{
                // 更新UserMeta的数据结构
                console.log("update");
                userMeta.integral += parseInt(order.total);
                userMeta.coupons = [...userMeta.coupons];
                userMeta.integral_records = [...userMeta.integral_records,{
                    created_at:Date.now(),
                    count:parseInt(order.total),
                    order_id:order.id
                }];
                this.props.updateUserMetaData(user,[{"key":"UserMeta","value":JSON.stringify(userMeta)}]);
                const newData = await WooWorker.getCustomerById(user.id);
                console.log(JSON.parse(newData.meta_data.filter(item=>item.key === "UserMeta")[0].value).integral);
                this.showAlert("领取成功");
            }
            console.log("over");
        }
    }

    render(){
        const {
                order,
                user: { user },
            } = this.props;

        return (
            <View style={styles.footer}>
                <Button
                    text={Languages.AddCredit}
                    style={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={() => this._onPress(order,user)}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ user }) => ({ user });

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CartRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchMyOrder: (user) => {
      actions.fetchMyOrder(dispatch, user);
    },
    updateUserMetaData: (user,data) => {
        actions.updateUserMetaData(dispatch,user,data);
    },
  };
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(withTheme(AddCredit));