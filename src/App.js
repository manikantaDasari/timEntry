import React from 'react';
import Homepage from './pages/homepage/homepage';
import  Signup from './components/signup/signup.component'
import Signin from './components/signin/signin.component'
// import SigninSignup from './pages/signinSigup/signinSignup_page';

import {auth, updateUserProfileDoc} from './firebaase/firebase.utils'
import{Route, Switch, Redirect} from 'react-router-dom';

import './App.css';

class App extends React.Component {
          state={
            currentUser:'',
            userData:''
          }

          unSubscribeFromAuth= null;

          componentDidMount(){
            
            this.unSubscribeFromAuth= auth.onAuthStateChanged( async userAuth=>{              
              if(userAuth){                
                const userRef= await updateUserProfileDoc(userAuth)
                userRef.onSnapshot(snapShot=>{
                  this.setState({currentUser:snapShot.id})
                  this.setState({userData:snapShot.data()})                                      
                });        

              }else{
                this.setState({currentUser: userAuth})                     
              }      
            })
          }

          componentWillUnmount(){
            this.unSubscribeFromAuth();
          } 
          
         

          render(){
            const {currentUser, userData} =this.state
            
            return (          

            <div className="App">
              <Switch>                
                
                <Route exact path='/' render={()=>this.state.currentUser?(<Redirect to='/home'/>):(<Signup/>)}/>       
                

                <Route path='/signin' component={Signin} />
                  
                
                <Route path='/home'  render={()=>this.state.currentUser?(
                
                  
                    <Homepage currentUser={currentUser} userData={userData}/>
                 

                  ):(<Signin/>)}  />
                  
                 
                
              </Switch>

            </div>
          );
}
}

export default App;
