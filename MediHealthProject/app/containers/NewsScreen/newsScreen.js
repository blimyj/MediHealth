import React, { Component } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { Container } from "native-base";
import { DrawerActions } from "react-navigation";

import MenuButton from "../../components/menuButton";
import { getNews } from "./news";
import Article from "./article";

class NewsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: (
			<View>
				<MenuButton
					whenPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
				/>
			</View>
		),
		headerTitle: (
			<View style={{ alignSelf: "center", flex: 1 }}>
				<Text
					style={{
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 18,
						color: "black"
					}}
				>
					News
				</Text>
			</View>
		),
		headerRight: <View />
	});

	constructor(props) {
		super(props);
		this.state = { articles: [], refreshing: true };
		this.fetchNews = this.fetchNews.bind(this);
	}

	componentDidMount() {
		this.fetchNews();
	}

	fetchNews() {
		getNews()
			.then(articles => this.setState({ articles, refreshing: false }))
			.catch(() => this.setState({ refreshing: false }));
	}

	handleRefresh() {
		this.setState(
			{
				refreshing: true
			},
			() => this.fetchNews()
		);
	}

	render() {
		return (
			<Container>
				<FlatList
					data={this.state.articles}
					renderItem={({ item }) => <Article article={item} />}
					keyExtractor={item => item.url}
					// refreshing={this.state.refreshing}
					// onRefresh={this.handleRefresh.bind(this)}
					refreshControl={
						<RefreshControl
							colors={["#28DA9A"]}
							refreshing={this.state.refreshing}
							onRefresh={this.handleRefresh.bind(this)}
						/>
					}
				/>
			</Container>
		);
	}
}

export default NewsScreen;
