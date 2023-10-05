import { useLocalSearchParams, useNavigation } from "expo-router";
import { View ,Text , Image, StyleSheet, Pressable, ScrollView, ActivityIndicator} from "react-native";
import { useLayoutEffect } from "react";
import ExperienceListItem from "../../components/ExperienceItem";
import { gql, useQuery  } from "@apollo/client"


const query = gql`query MyQuery($id: ID!) {
   profile(id: $id) {
     id
     name
     image
     position
     about
     experience {
       id
       companyname
       companyimage
       title
       userid
     }
     backimage
   }
 }`


 export default function UserProfile() {

    const { id } = useLocalSearchParams()
    const { loading, error, data } = useQuery(query, { variables: {id} })
    const user = data?.profile;

    const navigation = useNavigation()
    const onConnect = () => {
        console.warn('Connect Pressed')
    }
    useLayoutEffect(() =>{
        navigation.setOptions({
            title: user?.name || 'User'
        })
    }, [user?.name])

    if (loading) {
      return <ActivityIndicator />
    }
    if (error) {
      return ( 
      <Text>Something went wrong</Text>
      )
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
             {/* Header */}
            <View style={styles.header}>
                {/* BG Image */}
               <Image source={{ uri: user.backimage }} style={styles.backImage} />
                {/* Profile image */}
                <View style={styles.headerContent}>  
                <Image source={{ uri: user.image  }} style={styles.image} />
                {/* Name and position */}
                <Text style={styles.name}>{user.name}</Text>
                <Text>{user.position }</Text>
                   {/* Connect button */}
                <Pressable onPress={onConnect} style={styles.button}>
                <Text style={styles.buttonText}>Connect</Text>
                </Pressable>
                </View>
            </View>
             {/* About */}
             <View style={styles.section }>
                <Text style={styles.sectionTitle}>
                    About
                </Text>
                <Text style={styles.paragraph}>{ user.about }</Text>
             </View>
             {/* Experience */}

             <View style={styles.section }>
                <Text style={styles.sectionTitle}>
                    Experience
                </Text>
                { user.experience?.map(experience => <ExperienceListItem key={experience.id} experience = {experience} /> ) }
             </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
     container: {

     },
     header:{
        backgroundColor: "white",
        marginBottom: 5,
     },
     backImage: {
        width: '100%',
        aspectRatio: 5 / 2,
        marginBottom: -60,
     },
     headerContent:{
        padding: 10,
        paddingTop: 0,
     },
     image:{
        width: 120,
        aspectRatio: 1,
        borderRadius: 60,
        borderEndWidth: 3,
        borderColor: '#FFFFFF',
     },
     name:{
        fontSize: 24,
        fontWeight: "500",
     },
     //button
     button: {
        backgroundColor: "royalblue",
        padding: 10,
        alignItems: "center",
        borderRadius: 50,
        marginVertical: 10,
     },
     buttonText:{
        color: "white",
        fontWeight: "bold",
     },

     section:{
        backgroundColor: "white",
        padding: 10,
        marginVertical: 5,
     },

     sectionTitle:{
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 5,
     },
     paragraph:{
        lineHeight: 20,
     }

})