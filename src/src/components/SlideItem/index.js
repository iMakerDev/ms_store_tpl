/** @format */

import React from "react";
import {
    FlatList,
    View,
    Dimensions,
    Platform,
    I18nManager
} from "react-native";
const { height } = Dimensions.get("window")
import Item from './Item'
import Pagination from './Pagination'
import {Constants} from '@common'

class SlideItem extends React.PureComponent {
    constructor(props) {
        super(props)
        if (props.items) {
            this.indexes = Array.from(Array(props.items.length).keys()).reverse()
        }
        this.state = {
            selectedIndex: 0,
        }
    }

    renderItem = ({ item, index }) => {
        const { onViewPost, currency } = this.props
        const selected = I18nManager.isRTL ? this.indexes[this.state.selectedIndex] : this.state.selectedIndex
        return <Item currency={currency} item={item} onPress={onViewPost} active={index == selected} />
    }

    render() {
        const { items } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <FlatList
                        ref="list"
                        extraData={this.state}
                        keyExtractor={(item, index) => `${index}`}
                        data={items}
                        renderItem={this.renderItem}
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={this.onScrollEnd}
                        contentContainerStyle={[I18nManager.isRTL && styles.rtlList]} />

                    <Pagination
                        items={items}
                        selectedIndex={this.state.selectedIndex}
                        onNext={this.onNext} />
                </View>

            </View>
        );
    }

    onNext = () => {
        const nextIndex = this.state.selectedIndex < this.props.items.length - 1
            ? this.state.selectedIndex + 1
            : 0
        this.onScrollToIndex(nextIndex)
    }

    onScrollToIndex = (index) => {
        this
            .refs
            .list
            .scrollToIndex({ index })
        this.setState({ selectedIndex: index })
    }

    onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);

        if (pageNum != this.state.selectedIndex) {
            this.onScrollToIndex(pageNum)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items != this.props.items) {
            this.indexes = Array.from(Array(nextProps.items.length).keys()).reverse()
        }
    }

}

const styles = {
    container: {
        margin: 10,
        backgroundColor: "#fff",
    },
    content: {
        overflow: 'hidden',
        borderRadius: 6
    },
    item: {
        height: height * 0.8
    },
    viewFull: {
        height: 50,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fullText: {
        fontSize: 15,
        fontWeight: '600',
        color: "blue"
    },
    rtlList: {
        flexDirection: 'row-reverse'
    }
};

export default SlideItem
