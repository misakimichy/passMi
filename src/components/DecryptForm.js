import React from 'react'

const DecryptForm = props => {
    return (
        <section className='container'>
            <p>Decipher text: {props.decipher}</p>
        </section>
    )
}

export default DecryptForm