import React, { Component } from 'react'
import crypto from 'crypto'
import DecryptForm from './DecryptForm'

class EncryptForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            isSubmitted: false,
            encryptedText: null,
            encryptedTextLength: 0,
            error: null
        }
    }

    checkMasterPassword = () => {
        return prompt("Enter your master password")
    }

    // Convert user's password into cryptographic key
    deriveKeyFromPassword(password, salt, iterations) {
        return crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha512')
    }

    encryptMessage(message, password) {
        try {
            const salt = crypto.randomBytes(64)
            // Add iterations for security
            const iterations = Math.floor(Math.random() * (99999 - 10000 + 1)) + 500
            const KEY = this.deriveKeyFromPassword(password, salt, Math.floor(iterations * 0.47 + 1337))
            
            // Initialization Vector - 16 bytes
            const iv = crypto.randomBytes(16)
            const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv)
            
            // Update the cipher with data to be encrypted and close cipher
            const encryptedData = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()])
    
            // 16 bytes - from cipher for decryption
            const authTag = cipher.getAuthTag()
            const output = Buffer.concat([salt, iv, authTag, Buffer.from(iterations.toString()), encryptedData]).toString('hex')
            return `enc::${output}`

        } catch (error) {
            this.setState({
                error: error.message
            })
        }
    }

    /*
        Non-encryption methods
    */
    handleSubmit = event => {
        event.preventDefault()
        const userEncryptPassword = this.checkMasterPassword()
        const encryptedData = this.encryptMessage(this.state.message, userEncryptPassword)

        this.setState({
            encryptedText: encryptedData,
            encryptedTextLength: encryptedData.length,
            isSubmitted: true,
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        const { message, isSubmitted, encryptedText, encryptedTextLength, error } = this.state
        const isInvalid = message === ''

        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        name='message'
                        placeholder='Encrypt this text...'
                        onChange={this.handleChange}
                    />
                    <button disabled={isInvalid} type='submit' className='button'>Convert</button>
                    {encryptedText && <p className='show-message'>Encrypted text: {encryptedText}</p>}
                    {encryptedTextLength !== 0 && <p className='show-message'>Encrypted text length: {encryptedTextLength}</p>}
                </form>
                { isSubmitted && error 
                    ? <p>{error}</p>
                    : null
                }
                {isSubmitted &&
                    <DecryptForm
                        encryptedData={encryptedText}
                        checkMasterPassword={this.checkMasterPassword }
                        deriveKeyFromPassword={this.deriveKeyFromPassword}
                    />
                }
            </section>
        )
    }
}

export default EncryptForm