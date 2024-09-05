import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors';
import styled from 'styled-components/native';


export const OTPInputSection = styled.View`
justify-content: center;
align-items:center;
margin-vertical:30px;
`;

// export const OTPInputSection = styled.View`
// justify-content: center;
// align-items:center;
// margin-vertical:30px;
// `;

export const HidenTextInput = styled.TextInput`
borderColor:${COLORS.gray};
borderWidth:2px;
borderRadius:5px;
padding:12px;
marginTop:15px;
width:300px;
color:${COLORS.gray};
`;

const OtpVerificationfields = () => {
    return (
        <Title>
            <HidenTextInput />
        </Title>
    )
}

export default OtpVerificationfields