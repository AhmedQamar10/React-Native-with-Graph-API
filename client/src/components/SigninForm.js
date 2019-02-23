import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,
    AsyncStorage, TextInput, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { graphql, compose } from 'react-apollo'
import loginmutation from '../graphql/mutations/signin'
import { connect } from 'react-redux';
import { login } from '../actions/user';
import Loading from '../components/loading'
class SigninForm extends Component {

    state = {
        loading: false,
        email: '', password: '', errors: {}
    }
    _onChangeText = (text, type) => this.setState({ [type]: text })
    _checkIfDisabled() {
        const { email, password, } = this.state;

        if (!email || !password) {
            return true;
        }

        return false;
    }
    _onSignupPress = async () => {
        this.setState({ loading: true });

        const { email, password } = this.state;
        //const avatar = 'http://i65.tinypic.com/mrb979.png';

        //try {
            const { data } = await this.props.mutate({
                variables: {
                    email,
                    password,
                    //avatar,
                },
            });
            const {payload,error}= data.login
            if (payload) {
            await AsyncStorage.setItem(
                '@twitteryoutubeclone', payload.token);
            this.setState({ loading: false });
            return this.props.login();
            }
        //} catch (error) {
            else {
            this.setState({
                errors: {
                    [error.field]: error.msg,
                }
                , loading: false
            })
        }
    };

    render() {
        const { errors } = this.state;
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <View
                onPress={() => Keyboard.dismiss()}
                style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#353b48', position: 'relative'
                }}>
                <TouchableOpacity
                    hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
                    style={{
                        zIndex: 1,
                        justifyContent: 'center',
                        alignItems: 'center', position: 'absolute',
                        top: '5%', left: '5%'
                    }} onPress={this.props.onBackPress}>
                    <Icon color='white' size={30} name="arrow-back" />
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    alignSelf: 'stretch', alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        height: 50, width: '70%', borderBottomWidth: 2,
                        borderBottomColor: 'white', marginVertical: 5
                    }}>
                        <TextInput style={{
                            height: 50, fontSize: 30,
                            color: 'white'
                        }}
                            placeholder="Email" keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={text => this._onChangeText(text, 'email')}
                        />
                        <Text
                            style={{ color: 'red', fontSize: 20 }}>
                            {errors.email}</Text>
                    </View>
                    <View style={{ paddingBottom: 40, }}></View>
                    <View style={{
                        height: 50, width: '70%', borderBottomWidth: 2,
                        borderBottomColor: 'white', marginVertical: 5
                    }}>
                        <TextInput style={{
                            height: 50, fontSize: 30,
                            color: 'white'
                        }}
                            placeholder="Password" secureTextEntry
                            onChangeText={text => this._onChangeText(text, 'password')}
                        />
                        <Text
                            style={{ color: 'red', fontSize: 20 }}>
                            {errors.password}</Text>
                    </View>
                    <View style={{ paddingBottom: 160 }}></View>

                </View>
                <TouchableOpacity
                    onPress={this._onSignupPress}
                    disabled={this._checkIfDisabled()}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center', position: 'absolute', bottom: '15%',
                        width: '70%', height: '10%', backgroundColor: '#0097e6',
                        borderRadius: 10, shadowOpacity: 0.2, shadowRadius: 5,
                        shadowOffset: '0px 2px', shadowColor: '#000', elevation: 2
                    }} >
                    <Text style={{
                        fontSize: 30,
                        borderRadius: 10, justifyContent: 'center',
                        alignItems: 'center', color: 'white', fontWeight: '900'
                    }}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default compose(graphql(loginmutation),
    connect(undefined, { login }))(
        SigninForm,
    );

/*

*/