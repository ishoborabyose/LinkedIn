import { ScrollView , Text} from "react-native";
import posts from "../../../assets/data/posts.json"
import PostListItem from "../../components/PostListItem";
import { useLocalSearchParams } from "expo-router";

export default function PostDetailsScreen() {
        const { id } = useLocalSearchParams()
    const post = posts.find((post) => post.id === id)

    if(!post){
        return <Text style={{ fontSize: 20 , color: "white" }}>Post not found</Text>
    }

    return (
        <ScrollView>
            <Text style={{ fontSize: 20 , color: "white" }}> {id} </Text>
               <PostListItem post={post} />
        </ScrollView>
    )
}


// https://linkedin.com/posts/notjustdev_building-a-linkedin-clone-with-react-native-activity-7088154807215022082-lTdL/