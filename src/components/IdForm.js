import React, {useState} from 'react'
import './css/IdForm.css'

export default function IdForm({setid}) {
    const [message, setMessage] = useState('Enter registration Id')
    const [id, setId] = useState('')

    const storeId = () => {
        if(id){

            if(id < 1901201001 || id > 1901201116){
                setMessage('Invalid registration Id')
            }else if(id > 1901201000 && id <= 1901201015){
                localStorage.setItem('branch', 'civil')
            }else if(id > 1901201015 && id <= 1901201068){
                localStorage.setItem('branch', 'computer science')
            }else if(id > 1901201068 && id <= 1901201078){
                localStorage.setItem('branch', 'electrical electronics')
            }else if(id > 1901201078 && id <= 1901201094){
                localStorage.setItem('branch', 'electrical')
            }else if(id > 1901201094 && id <= 1901201096){
                localStorage.setItem('branch', 'electronics')
            }else if(id > 1901201096 && id <= 1901201116){
                localStorage.setItem('branch', 'mechanical')
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
