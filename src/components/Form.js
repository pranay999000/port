import React, {useState, useRef} from 'react'
import ProgressBar from './ProgressBar'

import imageCompression from 'browser-image-compression'

import './css/Form.css'

export default function Form({s, p}) {
    const [image, setImage] = useState([])
    const [go, setGo] = useState('')

    const refer = useRef(null)

    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg']

    async function addImage(e) {
        const newFile = []
        for(let i = 0; i < e.target.files.length; i++){
            let imageFile = e.target.files[i]

            if(imageFile.size > 1000141){
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1280,
                    useWebWorker: true
                }

                try {
                    const compressedFile = await imageCompression(imageFile, options)
                    console.log('compressedFile instanceof blob', compressedFile instanceof Blob)
                    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`)

                    newFile.push(compressedFile)
                }catch(error) {
                    console.log(error)
                }
            } else {
                newFile.push(imageFile)
            }
        }
        setImage(newFile)
    }

    const uploadImage = () => {
        if (image) setGo('go')
    }

    console.log('form ', image)

    return (
        <div className = 'formDiv'>
            <div>Upload to {s.toUpperCase()} # {p}</div>
            
            {go && <ProgressBar image = {image} setImage = {setImage} setGo = {setGo} s = {s} p = {p}/>}

            <input type = 'file' id = 'in' className = 'upload-file' multiple ref = {refer} onChange = {addImage} />
            <label htmlFor = 'in'>Select File</label>

            <button className = 'button' onClick = {() => uploadImage()}>Upload</button>
        </div>
    )
}