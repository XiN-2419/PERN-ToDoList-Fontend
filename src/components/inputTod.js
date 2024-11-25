import React, {Fragment, useState} from "react";

const InputTodo = () => {
    
    const [description, setDescription] = useState("");
    
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("https://pern-todolist-backend.onrender.com/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
      <Fragment>
        <h1 className="text-center mt-5">待辦清單</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
            <button className="btn btn-success text-nowrap">新增</button>
        </form>
      </Fragment>  
    );
};

export default InputTodo;