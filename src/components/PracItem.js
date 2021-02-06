import React, { useEffect, useState, useRef } from 'react'
import {database} from '../firebase/config'

import './css/PracItem.css'

export default function PracItem({sub, setSub, setPrac}) {
    const branch = localStorage.getItem('branch')
    const batch = localStorage.getItem('batch')

    const [pracList, setPracList] = useState([])
    const [practicalNumber, setPracticalNumber] = useState('')

    const refer = useRef(null)

    const addSub = (e, no, from) => {
        e.preventDefault()

        setSub(from)
        setPrac(no)
    }

    const addByInput = (e) => {
        e.preventDefault()

        const nav = database.ref(`port/${branch}/${batch}/nav/${sub}`)

        nav.orderByChild('no').equalTo(practicalNumber).limitToFirst(1).once('value', snap => {
            if(!snap.exists()){
                const pracNav = {
                    from: sub,
                    no: practicalNumber
                }
                nav.push(pracNav)
            }
        })
        setSub(sub)
        setPrac(practicalNumber)

        refer.current.value = ''
    }

    useEffect(() => {
        const navRef = database.ref(`port/${branch}/${batch}/nav/${sub}`)
        
        navRef.on('value', (snapshot) => {
            const practical = snapshot.val()
            const pracs = []

            if(practical){
                Object.keys(practical).forEach(key => {
                    pracs.push(practical[key])
                })
                setPracList(pracs)
            }
        })
    }, [branch, batch, sub])

    return (
        <ul>
            {pracList && pracList.map((prac) => (
                
                <li key = {prac.no} onClick = {(e) => addSub(e, prac.no, prac.from)}># {prac.no}</li>
            ))}
            <li>
                <input className = 'pracItemIn' type = 'number' placeholder = 'Practical No.' ref = {refer} onChange = {(e) => {setPracticalNumber(e.target.value)}} />
                <button className = 'pracNoButton' onClick = {(e) => {addByInput(e)}}>+</button>
            </li>
        </ul>
    )
}
