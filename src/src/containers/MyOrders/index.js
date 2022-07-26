/** @format */

import React, { PureComponent } from "react";
import {
  Animated,
  Platform,
  RefreshControl,
  FlatList,
  View, ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { AnimatedHeader } from "@components";
import { Languages, withTheme } from "@common";
import styles from "./styles";
import OrderEmpty from "./Empty";
import OrderItem from "./OrderItem";


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
@connect(({ user, carts,token }) => ({ user, carts ,token}),null,mergeProps)
class MyOrders extends PureComponent {
  // state = { scrollY: new Animated.Value(0) };
  constructor(props){
    super(props);
    this.state={
      scrollY: new Animated.Value(0)
    }
  }
  static navigationOptions = () => ({});
  tableUnSubscribe=null;
  componentDidMount() {
    const { user } = this.props.user;
    const _this=this
    this.fetchProductsData();
    this.tableUnSubscribe=this.props.navigate.addListener('focus',function(){
      _this.props.fetchMyOrder(user,_this.props.user.token);
     })
  }
  componentWillUnmount(){
    this.tableUnSubscribe&&this.tableUnSubscribe();
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.carts.cartItems != nextProps.carts.cartItems) {
      this.fetchProductsData();
    }
  }

  fetchProductsData = () => {
    const { user } = this.props.user;
    if (typeof user === "undefined" || user === null) return;
    this.props.fetchMyOrder(user,this.props.user.token);
  };

  renderError(error) {
    return (
      <OrderEmpty
        text={error}
        onReload={this.fetchProductsData}
        onViewHome={this.props.onViewHomeScreen}
      />
    );
  }

  renderRow = ({ item, index }) => {
    return (
      <OrderItem
        key={index.toString()}
        item={item}
        theme={this.props.theme}
        onViewOrderDetail={this.props.onViewOrderDetail}
      />
    );
  };

  render() {
    const data = this.props.carts.myOrders;

    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    if (typeof data === "undefined") {
      return (
        <View style={[{flex:1,alignItems:'center',justifyContent:'center'},{ backgroundColor: background }]}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }

    if (data.length == 0) {
      return (
        <OrderEmpty
          text={Languages.NoOrder}
          onReload={this.fetchProductsData}
          onViewHome={this.props.onViewHomeScreen}
        />
      );
    }



    return (
      <View style={[styles.listView, { backgroundColor: background }]}>
        <AnimatedHeader
          scrollY={this.state.scrollY}
          label={Languages.MyOrder}
          activeSections={this.state.activeSection}
        />
        <AnimatedFlatList
          data={data}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: Platform.OS !== "android" }
          )}
          scrollEventThrottle={1}
          keyExtractor={(item, index) => `${item.id} || ${index}`}
          contentContainerStyle={styles.flatlist}
          ListEmptyComponent={() => null}
          renderItem={this.renderRow}
          refreshControl={
            <RefreshControl
              refreshing={this.props.carts.isFetching}
              onRefresh={this.fetchProductsData}
            />
          }
        />
      </View>
    );
  }
}
const mapStateToProps = ({ user, carts,token }) => ({ user, carts ,token});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CartRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchMyOrder: (user,token) => {
      actions.fetchMyOrder(dispatch, user,token);
    },
  };
}


export default withTheme(MyOrders);
