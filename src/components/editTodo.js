import React, {Fragment, useState} from "react";

const EditTodo = ({todo}) => {
    const [description, setDescription] = useState(todo.description);

    //updateDescription function
    const updateDescription = async e => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`https://pern-todolist-backend.onrender.com/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return <Fragment>
        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
        修改
        </button>

        <div class="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
        <div class="modal-dialog">
            <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title">修改待辦事項</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}></button>
            </div>

            <div class="modal-body">
                <input type="text" className="form-control" value={description} onChange={e => {setDescription(e.target.value)}}/>
            </div>

            <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal" onClick={e => {updateDescription(e)}}>確認</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}>取消</button>
            </div>

            </div>
        </div>
        </div>
    </Fragment>;
};

export default EditTodo;