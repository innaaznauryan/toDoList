import React from 'react'
import "./itemTodo.scss"
import {AiFillDelete, AiFillCheckSquare, AiFillEdit} from "react-icons/ai"

export default function ItemTodo({id, title, description, status, handleComplete, handleDelete, handleEdit}) {

  return (
    <div className={"item" + (status ? " completed" : "")} id={"id" + id}>
        <div className="content">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
        <div className='controls'>
            <AiFillCheckSquare className='complete' onClick={() => handleComplete(id)}/>
            <AiFillEdit className='edit' onClick={() => handleEdit(id)}/>
            <AiFillDelete className='delete' onClick={() => handleDelete(id)}/>
        </div>
    </div>
  )
}
