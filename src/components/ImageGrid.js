import React from 'react'

export default function ImageGrid({pageNo, image}) {
    return (
        <div>
            <img src = {image} alt = {pageNo} width = '97%' max-height = '100%' />
        </div>
    )
}
