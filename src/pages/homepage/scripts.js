export let Task = function(taskname, project, startTime, endTime){
    this.taskname= taskname;
    this.project= project;
    this.startTime= startTime;
    this.endTime=endTime;    
    
}


export const getTime= today=>{
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return  `${date} ${time}`
}


export const timeConverter=time=>{        
    var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((time % (1000 * 60)) / 1000);
    return  `${hours}:${minutes}:${seconds}`
}