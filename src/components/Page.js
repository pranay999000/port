import React, { useEffect, useState } from 'react'
import Form from './Form'
import {database} from '../firebase/config'
import ImageGrid from './ImageGrid'

import axios from '../firebase/axios'

import './css/Page.css'

export default function Page({sub, prac}) {
    const branch = localStorage.getItem('branch')
    const batch = localStorage.getItem('batch')

    const [praclist, setPraclist] = useState([])
    const [p, setP] = useState('')

    useEffect(() => {
        axios.get(`port/${branch}/${batch}/prac/${sub}/${prac}.json`)
        .then(res => {
            console.log(res.data)

            const pracs = []

            if(res.data){
                Object.keys(res.data).forEach(key => {
                    pracs.push(res.data[key])
                })
                setPraclist(pracs)
            }else{
                setPraclist([])
            } 
        })
    }, [branch, batch, sub, prac])

    const editPageNo = (e, key) => {
        e.preventDefault()
        const databaseRef = database.ref(`port/${branch}/${batch}/prac/${sub}/${prac}`)

        databaseRef.child(key).update({
            pageNo: p
        })
    }

    const deletePage = (e, key) => {
        e.preventDefault()
        const databaseRef = database.ref(`port/${branch}/${batch}/prac/${sub}/${prac}`)

        databaseRef.child(key).remove()
    }

    return (
        <div className = 'page'>
            <ul>
                {praclist && sub && prac && Object.keys(praclist).map(key => {
                    return (
                        <li className = 'pagelist' key = {key}>
                            <div className = 'editcom'>
                                <input className = 'edittxt' type = 'number' placeholder = 'Page no' onChange = {(e) => {setP(e.target.value)}} />
                                <button className = 'editbtn' onClick = {(e) => editPageNo(e, praclist[key].key)}>Edit</button>
                            </div>
                                <button className = 'deletebtn' onClick = {(e) => deletePage(e, praclist[key].key)} >Delete</button>
                                
                                <div className = 'pageNotxt'>
                                    {praclist[key].pageNo === 100 ? <div>Page No.</div> : <div># {praclist[key].pageNo}</div>}
                                </div>
                                
                            <ImageGrid pageNo = {praclist[key].pageNo} image = {praclist[key].image} />
                        </li>
                    )
                })}
            </ul>
            <div className = 'pageForm'>
            {sub && prac ? <Form s = {sub} p = {prac} /> : <div>Select a file from the Dashboard.</div>}
            </div>
        </div>
    )
}
