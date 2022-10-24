import "./Task.css"

const Task = ({task, handleTaskComplete}) => {

    return (
        <div className={`task ${task.complete ? "complete" : "uncomplete"}`} key={task.id} onClick={() => handleTaskComplete(task.id)}>
            {task.date}
            <br/>
            {task.title}
        </div>
    );
};

export default Task;