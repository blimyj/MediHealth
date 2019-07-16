import Config from "react-native-config";

const url = Config.NEWS_API_KEY;

export async function getNews() {
	let result = await fetch(url).then(response => response.json());
	return result.articles;
}
