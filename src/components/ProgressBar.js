import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage'

export default function ProgressBar({image, setImage, pageNo, setGo, s, p}) {
    const {url} = useStorage(image, pageNo, s, p)

    useEffect(() => {
        if(url){
            setGo('')
            setImage([])
        }
    }, [url, setGo, setImage])

    return (
        <div>
            
        </div>
    )
}
