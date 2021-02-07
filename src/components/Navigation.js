import React, {useEffect, useState, useRef} from 'react'
import {database} from '../firebase/config'

import './css/Navigation.css'
import PracItem from './PracItem'

export default function Navigation({setSub, setPrac}) {
    const branch = localStorage.getItem('branch')
    const batch = localStorage.getItem('batch')

    const [sublist, setSublist] = useState([])
    const [s, setS] = useState('')

    const refer = useRef(null)

    const toLowerCase = (e) => {
        e.target.value = ('' + e.target.value).toUpperCase()
    }

    const addSub = (e) => {
        e.preventDefault()

        const subR = database.ref(`port/${branch}/${batch}/subs`)

        subR.orderByValue().equalTo(s).limitToFirst(1).once('value', snap => {
            if(!snap.exists() && s){
                subR.push(s)
            }
        })

        refer.current.value = ''
    }

    useEffect(() => {
        const subRef = database.ref(`port/${branch}/${batch}/subs`)

        // subRef.on('value', (snapshot) => {
        //     const subjects = snapshot.val()
        //     const subs = []
        //     const subKeys = []
        //     if(subjects) {
        //     Object.keys(subjects).forEach(key => {
        //         console.log(key, subjects[key])
        //         subKeys.push(key)
        //         subs.push(subjects[key])
        //     }) }
        //     setSublist(subs)
        //     setSubKeys(subKeys)
        // })

        subRef.on('value', (snapshot) => {
            const subjects = snapshot.val()
            const subs = []

            if(subjects){
                Object.keys(subjects).forEach(key => {
                    subs.push(subjects[key])
                })
                setSublist(subs)
            }
        })
    }, [branch, batch])

    return (
        <div className = 'sidenav'>
            <p className = 'h4'><u>Dashboard</u></p>
            <ul className = 'navlist'>
                {
                    sublist && Object.keys(sublist).map((sub) => {
                        return (
                            <li className = 'navli' key = {sub}>&nbsp;{sublist[sub]}

                                <PracItem sub = {sublist[sub]} setSub = {setSub} setPrac = {setPrac}/>
                            </li>
                        )
                    })
                }
                <li>
                    
                    {branch && <div className = 'box'>
                            &nbsp;<input className = 'navInput' type = 'text' ref = {refer} onInput = {toLowerCase} placeholder = 'Enter subject..' onChange = {(e) => {setS(e.target.value)}} />
                            <button className = 'navSubButton' onClick = {(e) => {addSub(e)}}>+</button>
                    </div>}
                    
                </li>
            </ul>
        </div>
    )
}
