import React, { Component } from 'react';
import {
    Image, TouchableOpacity,
    View, Text
} from 'react-native'
import Loading from './loading';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { logout } from '../actions/user';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

class HeaderAvatar extends Component {

    render() {
        if (!this.props.info) {
            return (
                <TouchableOpacity disabled>
                    <Loading size="small" />
                </TouchableOpacity>
            );
        }
        return (
            <View style={{
                flexDirection: 'row',
                backgroundColor: 'white', height: 55
            }}>
                <View style={{
                    marginLeft: 15, justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                        }}
                        source={{ uri: this.props.info.avatar }}
                    />
                </View>
                <Text style={{
                    fontSize: 22, fontWeight: 'bold', paddingTop: '2.5%',
                    paddingLeft: '2%', paddingRight: '66%'
                }}>Profile</Text>
                <TouchableOpacity
                    hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} side="right"
                    style={{
                        justifyContent: 'center', alignItems: 'center',
                        marginRight: 15
                    }} onPress={() => this.props.navigation.navigate('NewTweet')}>
                    <Icon color='blue' size={25} name="pencil" />
                </TouchableOpacity>
            </View>
        );
    }
}

export default withApollo(connect(state => ({ info: state.user.info }), { logout })(
    connectActionSheet(HeaderAvatar),
));
