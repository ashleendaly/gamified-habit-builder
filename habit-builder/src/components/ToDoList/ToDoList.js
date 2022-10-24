import Task from '../Task/Task'

const ToDoList = (props) => {
    return (
        <div>
            {props.toDoList.map((task) => {
                return (
                    <Task task={task} handleTaskComplete={props.handleTaskComplete} />
                )
            })}
        </div>
    );
};

export default ToDoList;