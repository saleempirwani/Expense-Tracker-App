import React from 'react';
import {AuthForm} from '../../components';

const SignupScreen = ({navigation: {navigate}}) => {
  return <AuthForm isSignin={false} navigate={navigate} />;
};

export default SignupScreen;
