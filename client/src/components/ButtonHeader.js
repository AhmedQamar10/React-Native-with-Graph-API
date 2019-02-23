import React from 'react';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default function ButtonHeader({ children, onPress, disabled }) {
        return (
            <TouchableOpacity onPress={onPress} disabled={disabled}
                hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} side="right"
                style={{
                    justifyContent: 'center', alignItems: 'center',
                    marginRight: 15
                }}>
                <Icon color='blue' size={20} name="pencil" />
                {children}
            </TouchableOpacity>
        );
}
