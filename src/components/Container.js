import React from 'react'

function Container({className, children}) {
    return (
        <div className={`${className && className} mx-5 md:mx-10`}>
            {children}
        </div>
    )
}

export default Container
