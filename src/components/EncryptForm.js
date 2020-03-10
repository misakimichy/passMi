import React, { Component } from 'react'
import { encrypt, decrypt } from '../crypto'

class EncryptForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            isSubmitted: false,
            decipher: null,
            updatedMessage: '',
            error: null
        }
        this.masterPassword = null
    }

    // unlock app when page first loads, retrieving user's secret message
    unlock() {
        // if first time using app, initialize empty message in local storage
        if(!localStorage.getItem('message')) {
            localStorage.setItem('message', encrypt("", this.masterPassword))
        }

        // decrypt message from local storage
        const existingMessage = localStorage.getItem('message')
        try {
            const message = decrypt(existingMessage, this.masterPassword)
            this.setState({
                decipher: message
            })
            return message
        } catch (error) {
            console.log(error.message)
            this.setState({
                error: error.message
            })
        }
    }

    componentDidMount = () => {
        this.masterPassword = prompt("Enter your master password")
        this.unlock()
    }

    /*
        Non-encryption methods
    */
    handleSubmit = event => {
        event.preventDefault()

        const encryptedMessage = encrypt(this.state.message, this.masterPassword)
        localStorage.setItem('message', encryptedMessage)
        const decryptedMessage = decrypt(encryptedMessage, this.masterPassword)

        this.setState({
            isSubmitted: true,
            updatedMessage: decryptedMessage
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        const { message, isSubmitted, decipher, updatedMessage, error } = this.state
        const isInvalid = message === ''

        return (
            !error
                ?   <section>
                        <form onSubmit={this.handleSubmit}>
                            <label>Message</label>
                            <input
                                type='text'
                                name='message'
                                onChange={this.handleChange}
                                placeholder={decipher}
                            />
                            <button disabled={isInvalid} type='submit' className='button'>Update</button>
                            <p>Decrypted Message: {decipher}</p>
                        </form>
                        {isSubmitted && error
                            ? <p>{error}</p>
                            : null
                        }
                        {isSubmitted &&
                            <p>Updated Message: {updatedMessage}</p>
                        }
                    </section>
                :   <div>
                        <h3 className='error-message'>{error}</h3>
                        <p>Please refresh and enter the right password.</p>
                    </div>
        )
    }
}

export default EncryptForm