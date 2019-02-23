import React from 'react';
import { View,Image, Text, StyleSheet } from 'react-native';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

function FeedCardHeader({username,firstName,lastName,avatar,createdAt}) {
        return (
            <View style={styles.container}>
            <View style={{flex:0.2,
                justifyContent: 'center',
                alignSelf: 'stretch'}}>
                <Image
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        alignSelf:'center'
                    }}
                    source={{ uri: avatar||'http://i65.tinypic.com/mrb979.png' }}
                />
            </View>
            <View style={{flex:1,
                alignSelf:"stretch"}}>
                <View style={{flex:1,
                alignSelf:"stretch",flexDirection:'row'
                ,alignItems:'center',justifyContent:'flex-start'}}>
                <Text style={{fontSize:16,color:'#000'
                ,fontWeight:'bold'}}>{firstName}{lastName}</Text>
            <Text style={{fontSize:14,color:'grey'
                ,fontWeight:'bold',marginLeft:5}}>@{username}</Text>
            
            </View>
            <View style={{flex:0.8,
                alignSelf:"stretch"                
                ,alignItems:'flex-start',justifyContent:'center'}}>
                <Text style={{fontSize:14,color:'grey'
                ,fontWeight:'bold'}}>{distanceInWordsToNow(createdAt)} ago</Text>
            </View>
            </View>
            </View>
        );
    
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default FeedCardHeader