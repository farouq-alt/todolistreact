import {useState} from 'react'


export default function Todo(){
    const [tasks,settasks]=useState([])
    const [task,settask]=useState("")

    const Handlesubmit=()=>{
        settasks([...tasks,task])
        console.log(tasks)
    }

    const Handledelete=(index)=>{
        settasks(tasks.filter((_,i)=>i!==index))
    }

    return(
        <div>
            <div>
                <input type="text"
                className='form-control'
                value={task}
                onChange={(e)=>settask(e.target.value)}>
                </input>
            
                <button className='btn btn-primary'
                onClick={Handlesubmit}>Add</button>
            </div>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>task</th>
                        <th>availability</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((s,i)=>
                    <tr key={i}>
                        <td>{s}</td>
                        <td>
                            <input type="radio"
                            className="form-check"
                            ></input>
                        </td>
                        <td>
                            <button className="btn btn-danger"
                            onClick={()=>Handledelete(i)}>
                                delete
                            </button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )

}