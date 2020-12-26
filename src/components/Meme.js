import React from 'react'

function Meme({ template, clickHandler, className }) {
    return (
        <img 
            className={`${className && className} my-5`}
            style={{width: 200, height: 'auto'}} 
            src={template.url} 
            key={template.id} 
            alt={template.name} 
            onClick={clickHandler}
        />
    )
}

export default Meme
