import React, { Component } from 'react'
import crypto from 'crypto'

class EncryptForm extends Component {
    state = {
        userInput: '',
        // KEY should be the user master password
        userKEY: '',
        isSubmitted: false,
        decipher: ''
    }

    encryptMessage(input, key) {
        // Initialization Vector - 16 bytes
        const iv = new Buffer(crypto.randomBytes(16), 'utf8')
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
        let encoded = cipher.update(input, 'utf8', 'base64')
        encoded += cipher.final('base64')
        return [encoded, iv, cipher.getAuthTag()]
    }

    decryptMessage(key, encoded, iv, authTag) {
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
        decipher.setAuthTag(authTag)
        let text = decipher.update(encoded, 'base64', 'utf8')
        text += decipher.final('utf8')
        return text
    }

    /*
        Non-encryption methods
    */
    handleSubmit = event => {
        event.preventDefault()
        // temporary KEY: this will be replaced with the user master password
        const KEY = new Buffer(crypto.randomBytes(32), 'utf8')
        const [encrypted, iv, authTag] = this.encryptMessage(this.state.userInput, KEY)
        const decrypted = this.decryptMessage(KEY, encrypted, iv, authTag)
        const newState = {
            ...this.state,
            isSubmitted: true,
            decipher: decrypted
        }
        
        console.log('CHECK NEW STATE', newState)
        this.setState({ newState })
        console.log('CHECK UPDATED STATE', this.state)
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        const { userInput, isSubmitted, decipher } = this.state
        const isInvalid = userInput === ''
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    name='userInput'
                    placeholder='Encrypt this text...'
                    onChange={this.handleChange}
                />
                <button disabled={isInvalid} type='submit'>Convert</button>
                {isSubmitted && <p>{decipher.value}</p>}
            </form>
        )
    }
}

export default EncryptForm