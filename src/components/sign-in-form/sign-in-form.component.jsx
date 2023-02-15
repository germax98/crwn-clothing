import { useState } from "react"
import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,} 
    from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import './sign-in-form.styles.scss'

//-------------------Sign in Component

const defaultformFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields)
    const { email, password }=formFields
    
    const resetFormFields = ()=>{
        setFormFields(defaultformFields)
    } //reset the input fields

//-------Sign in Google
    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup()
         await createUserDocumentFromAuth(user) //calls firebase.utils.js to make a sign in via google
    }
    const handleSubmit = async(event)=>{
        event.preventDefault()// make sure that a user add data
        

//-------Sign in Email & Password
        try{
            const response = await signInAuthUserWithEmailAndPassword(email,password)
            console.log(response)
            resetFormFields()
        }catch (error){
            switch (error.code){
                case 'auth/wrong-password':
                    alert ('incorrect passwort')
                    break
                case 'auth/user-not-found':
                    alert ('user not found')
                    break
                default:
                    console.log(error)
            }
        }
    }
    
    const handleChange = (event) =>{
        const {name, value} = event.target
        setFormFields({...formFields,[name]: value})
    } //user entry are displayed on the input
    
    return (
        <div className="sign-up-container">
            <h2>Already have an account ?</h2>
            <span>Sign in with your email and Password</span>
            <form onSubmit={handleSubmit}>

               
                <FormInput 
                label ='Email' 
                type= 'email' 
                required 
                onChange={handleChange} 
                name ='email' 
                value={email}
                />

                
                <FormInput
                label ='Password'
                type='password' 
                required 
                onChange={handleChange} 
                name ='password'
                value={password}
                />
                <div className="buttons-container">
                    <Button 
                    type='submit' >
                        Sign In
                    </Button>
                    <Button 
                    buttonType = 'google' 
                    type='button'
                    onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm 