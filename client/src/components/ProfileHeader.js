import React from 'react';
import { View, Image, Text } from 'react-native';

export default function ProfileHeader({ firstName,
    lastName, avatar, username }) {
    return (
        <View style={{
            height: 140,
            alignSelf: 'stretch',
            paddingTop: 20,
            backgroundColor: 'white'
        }}>
            <View style={{
                flex: 1, flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingLeft: 15, paddingTop: 2, paddingBottom: 20
            }}>
                <Image style={{
                    height: 80, width: 80,
                    borderRadius: 40, backgroundColor: 'yellow'
                }}
                    source={{ uri: avatar }} />

                <View style={{
                    flex: 1,
                    paddingLeft: 10,
                    alignSelf: 'stretch',
                    paddingTop: 2
                }}>

                    <View style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 18,paddingTop:'5%'
                    }}>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 20
                        }}>{firstName} {lastName}</Text></View>
                    <View style={{
                        color: 'grey',
                        fontSize: 15, opacity: 0.8
                    }}>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 15
                        }}>@{username}</Text></View>
                </View>
            </View>
        </View>
    );
}

/*
<View style={{
                flex: 0.8, flexDirection: 'row',
                borderTopWidth: 0.4, borderTopColor: 'grey'
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>
                        <Text style={{ color: 'blue' }}>3</Text> tweets
                </Text>
                </View>

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>
                        <Text style={{ color: 'blue' }}>3</Text> likes
                </Text>
                </View>
            </View>
            */