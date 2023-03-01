import { useEffect } from "react"
import { getRedirectResult } from "firebase/auth"
import SignInForm from "../../components/sign-in-form/sign-in-form.component"
import SignUpForm from "../../components/sign-up-form/sign-up-form.component"
import './authentication.styles.scss'


// Display of the wholeSignInPage
const Authentication = () => {
    return (
        <div className="authentication-container">
            <SignInForm/>
            <SignUpForm />
        </div>
    )
}

export default Authentication