import React, { PureComponent } from "react";
import { View, Text, FlatList } from "react-native";
import { TouchableScale, ImageCache, Button } from "@components";
import { Constants, Tools, Languages } from "@common";
import styles from "./styles";
import HHeader from "./HHeader";

class BlogList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        const { config } = this.props;
        this.props.fetchNews(config.limit, config.page)
    }

    gotoListNews = () => {
        const {navigation} = this.props;
        navigation.navigate("NewsScreen")
    }

    renderItem = ({ item, index }) => {
        const {theme } = this.props;
        const {text } = theme.colors;

        let imageURL = "", postTitle = "";
        imageURL = Tools.getImage(item, Constants.PostImage.large);
        postTitle =
            typeof item.title !== "undefined"
                ? Tools.getDescription(item.title.rendered, 300)
                : "";

        return (
            <TouchableScale key={`${item.id}`} style={styles.card}
                onPress={() => { this.props.navigation.navigate("NewsDetailScreen", { post: item }) }}>
                <ImageCache uri={imageURL} style={styles.imagePanelOne} />
                <View style={styles.title}>
                    <Text style={[styles.labelText, { color: text}]}>{postTitle}</Text>
                </View>
            </TouchableScale>
        )
    }
    render() {
        const { news, config, theme } = this.props;
        const {text, background } = theme.colors;
          
        return (
            <View style={[styles.container, {backgroundColor: background}]}>
                <HHeader config={config} theme={theme} gotoListNews={this.gotoListNews} />
                <FlatList
                    data={news}
                    contentContainerStyle={styles.flatlist}
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={this.renderItem} />
            </View>
        )
    }
}

export default BlogList;