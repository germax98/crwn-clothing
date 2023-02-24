import { useEffect } from "react"
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import { AuthenticationContainer } from './authentication.styles';


// Display of the wholeSignInPage
const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;



