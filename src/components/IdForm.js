import React, {useState} from 'react'
import './css/IdForm.css'

export default function IdForm({setid}) {
    const [message, setMessage] = useState('Enter registration Id')
    const [id, setId] = useState('')

    const storeId = () => {
        if(id){

            if(id < 0 || id > 20){
                setMessage('Invalid registration Id')
            }else if(id > 0 && id <= 10){
                localStorage.setItem('branch', 'computer science')
            }else if(id > 10 && id <=20){
                localStorage.setItem('branch', 'electronics')
            }
            
            localStorage.setItem('id', id)
            setid(id)
        }
        localStorage.setItem('batch', 19)
    }

    return (
        <div>
            <div className = 'iddiv'>{message}</div>
            <input className = 'idinput' type = 'number' onChange = {(e) => setId(e.target.value)} />
            <button className = 'button' onClick = {storeId}>Done</button>
        </div>
    )
}
