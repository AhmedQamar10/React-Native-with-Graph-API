import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,
    AsyncStorage, TextInput, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { graphql, compose } from 'react-apollo'
import signupmutation from '../graphql/mutations/signup'
import { connect } from 'react-redux';
import { login } from '../actions/user';
import Loading from '../components/loading'
class SignupForm extends Component {

    state = {
        firstName: '', lastName: '', loading: false,
        email: '', password: '', username: '', errors: {}
    }
    _onChangeText = (text, type) => this.setState({ [type]: text })
    _checkIfDisabled() {
        const { firstName, lastName,
            email, password, username } = this.state;

        if (!firstName || !lastName ||
            !email || !password || !username) {
            return true;
        }

        return false;
    }
    _onSignupPress = async () => {
        this.setState({ loading: true });

        const { firstName, lastName,
            email, password, username } = this.state;
        const avatar = 'http://i65.tinypic.com/mrb979.png';

        try {
            const { data } = await this.props.mutate({
                variables: {
                    firstName,
                    lastName,
                    email,
                    password,
                    username,
                    avatar,
                },
            });
            await AsyncStorage.setItem(
                '@twitteryoutubeclone', data.signup.token);
            this.setState({ loading: false });
            return this.props.login();
        } catch (error) {
            this.setState({
                errors: {
                    username: 'User already exits!',
                }
                , loading: false,
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
                            placeholder="First Name"
                            autoCapitalize='words'
                            onChangeText={text => this._onChangeText(text, 'firstName')} />
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
                            placeholder="Last Name" autoCapitalize='words'
                            onChangeText={text => this._onChangeText(text, 'lastName')}
                        />
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
                            placeholder="Email" keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={text => this._onChangeText(text, 'email')}
                        />
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
                            placeholder="Username" autoCapitalize="none"
                            onChangeText={text => this._onChangeText(text, 'username')} />
                        <Text
                            style={{ color: 'red', fontSize: 20 }}>
                            {errors.username}</Text>
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
                    }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default compose(graphql(signupmutation),
    connect(undefined, { login }))(
        SignupForm,
    );