import React from 'react';

import './signin.style.scss'

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from    '../../components/custom-button/custom-button.component';
import {auth}from '../../firebaase/firebase.utils';
import {Link, withRouter} from 'react-router-dom';



class SignIn  extends React.Component{
    constructor(props){
        super(props)

        this.state={
            email:'',
            password:''
        }
    }

    handleSubmit= async event=>{
        event.preventDefault();
        const {email, password}=this.state
        try {
            await auth.signInWithEmailAndPassword(email, password);               
            this.setState({
                email:'', password:''
            })
        } catch (error) {
            alert('User Not Found')
            
        }


        
    };

    handleChange= event=>{
        const {name, value}= event.target;
        this.setState({[name]:value})
    }

    loading(){
        alert("loading")
    }


    render(){
        return(
            <div className="sign-in">
                <h2> I already Have account</h2>
                <span>sign in with your email and password</span>
            
            <form onSubmit={this.handleSubmit} >

                <FormInput
                    name="email" 
                    type="text"
                    value={this.state.email} 
                    onChange={this.handleChange}
                    label='Email'
                    required               
                />

                <FormInput
                    name="password" 
                    type="password"
                    value={this.state.password} 
                    onChange={this.handleChange}
                    label='Password'
                    required               
                />
                

                
                <div className="buttons">

                    <CustomButton onClick={()=>{this.props.history.push('/home')}} type="submit">
                        Sign-In
                    
                    </CustomButton>
                      
                </div>

            </form>
            <p>I dont Have account Go to<span > <Link to='/' className='linkTo'>Sign UP </Link>Here</span></p>         
            </div>

        )
    }

}


export default withRouter(SignIn);