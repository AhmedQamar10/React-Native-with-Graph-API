import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
//import Icon1 from 'react-native-vector-icons/SimpleLineIcons'
//import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/AntDesign'


function FeedCardBottom({ favoriteCount,onFavoritePress,isFavorited }) {
    return (
        <View style={styles.container}>
            <Button onPress={onFavoritePress} style={{
                flexDirection: 'row',
                fontSize: 10, color: '#000', flex: 1
            }}><Icon3 name="like1" size={30} color={isFavorited ? 'blue' : 'grey'}
                /><Text style={{ paddingHorizontal: '4%', color: 'grey' }}>
                    {favoriteCount}</Text></Button>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth:1,
        borderTopColor:'#dcdde1',
        borderBottomWidth:1,
        borderBottomColor:'#dcdde1'
    },
});
export default FeedCardBottom


/*
<Button style={{
                flexDirection: 'row',
                fontSize: 10, color: '#000', flex: 1
            }}><Icon1 name="bubble" size={22} color='grey'
                /><Text style={{ paddingHorizontal: '4%', color: 'grey' }}>
                    {favoriteCount}</Text></Button>
            <Button style={{
                flexDirection: 'row',
                fontSize: 10, color: '#000', flex: 1
            }}><Icon2 name="retweet" size={22} color='grey'
                /><Text style={{ paddingHorizontal: '4%', color: 'grey' }}>
                    {favoriteCount}</Text></Button>
*/