import React from 'react';
import {AuthForm} from '../../components';

const SigninScreen = ({navigation: {navigate}}) => {
  return <AuthForm isSignin={true} navigate={navigate} />;
};

export default SigninScreen;
