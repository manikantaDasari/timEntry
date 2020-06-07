import React from 'react'

export const TaskComponent = ({props}) =>{

    return(
        <React.Fragment>
            {
                props.map((task, i)=>(
                    <div className="task" key={i}>
                    <h4>{`Task Name : ${task.taskName}`}</h4>
                    <h4>{`Project Name: ${task.projectName}`}</h4>
                    <p>{`Start Time:${task.startTime}`}</p>
                    <p>{`end Time: ${task.endTime}`}</p>
                    </div>
                ))  
            }
        </React.Fragment>
                    
    
    )
}
