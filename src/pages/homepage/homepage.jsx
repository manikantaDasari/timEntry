import React from 'react'; 
import './homepage.styles.scss';
import {getTime} from './scripts';
import Timer from '../../components/timer/timer';
import {TaskComponent}from '../../components/task/task.component';
import {updateUserTasks} from '../../firebaase/firebase.utils';
import{auth} from '../../firebaase/firebase.utils'


class Homepage extends React.Component{
    state={
            tasks:[],
            taskName: '',
            projectName:'',
            startTime: null,
            endTime:null           
        }   

    handleSubmit=(e)=>{
        e.preventDefault()
        const{taskName, projectName}= this.state

        if(taskName === ''){
            alert('Enter Task Name')
            return
        }

        if(projectName ===''){
            alert('Select Project')
            return
        }
        let timeStamp= new Date()        
        this.setState({startTime:getTime(timeStamp)})        
    }   

    handleChange = event=>{
        const {name, value}=event.target
        this.setState({
            [name]:value
        } )
    }

    finishTask=(e)=>{        
        let now= new Date()   
        this.setState({endTime: getTime(now)},this.updateTaskToDb);        
    }

    updateTaskToDb=()=>{
        const{taskName,projectName,startTime,endTime}=this.state;                
        const {currentUser}= this.props        
        updateUserTasks(currentUser,{taskName,projectName,startTime,endTime})
        this.setState({
            taskName: '',
            projectName:'',
            startTime: null,
            endTime:null
        }) 


    } 
    
    signOut=()=>{
        auth.signOut().then(function()
        {
          console.log("Sign-out successful.")
        }
        ).catch(function(error) {
          console.log('error');              
        })
      }

    render(){
        const{taskName,projectName,startTime,endTime}=this.state
        const tasks= this.props.userData.tasks        
        return(
            <React.Fragment>
             <header className='header'>
                        <div className='signout'  onClick={this.signOut}>Sign Out</div>
             </header>
            <div className="container">                
              <h1> Your Time Log</h1>
              <div className="createTask">
                  <form onSubmit={this.handleSubmit}>
                      <input className='input' type="text"
                       name="taskName"
                       placeholder='Enter Task Name'
                       value={this.state.taskName}
                       onChange={this.handleChange}/>


                      <select className='input' value={projectName} name='projectName' onChange={this.handleChange}>
                            <option default value="">Select Project</option>
                            <option value="Project1">Project1</option>
                            <option value="Project2">Project2</option>
                            <option value="Project3">Project3</option>
                        </select>

                      <button type='submit' className='addTask'  disabled={startTime?true:false} >Start Task</button>

                  </form>

              </div>
              

            <div className="tasks">
                {startTime?
                <div className="task">
                    <h4>{`Task Name:${taskName}`}</h4>
                    <h4>{`Project Name:${projectName}`}</h4>
                    <p>{`Start Time: ${startTime}`}</p>
                    <div className="tracktime">
                        <Timer finishTask={this.finishTask} endTime={endTime}/>
                    </div>
                </div>: null
            }
              {
              tasks?<TaskComponent props={tasks} />:null}

            </div>            

            </div>
            
            </React.Fragment>
        )
    }


}

export default Homepage