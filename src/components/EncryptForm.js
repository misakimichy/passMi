import React, { Component } from 'react'
import crypto from 'crypto'
import DecryptForm from './DecryptForm'

class EncryptForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            // userKEY: '',
            isSubmitted: false,
            cipherText: null,
            cipherTextLength: 0,
            decipher: '',
            isClicked: false
        }
    }

    checkMasterPassword = () => {
        return prompt("Enter your master password")
    }

    deriveKeyFromPassword(password, salt, iterations) {
        return crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha512')
    }

    encryptMessage(message, password) {
        const salt = crypto.randomBytes(64)
        // Add iterations for security
        const iterations = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000
        const KEY = this.deriveKeyFromPassword(password, salt, Math.floor(iterations * 0.47 + 1337))

        // Initialization Vector - 16 bytes
        const iv = crypto.randomBytes(16)
        const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv)

        // Update the cipher with data to be encrypted and close cipher
        const encryptedData = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()])

        // 16 bytes - from cipher for decryption
        const authTag = cipher.getAuthTag()

        const output = Buffer.concat([salt, iv, authTag, Buffer.from(iterations.toString()), encryptedData]).toString('hex')
        return output
    }

    decryptMessage(password, encoded, iv, authTag) {
        const decipher = crypto.createDecipheriv('aes-256-gcm', password, iv)
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
        const userInput = this.checkMasterPassword()
        const encryptedData = this.encryptMessage(this.state.message, userInput)
        // const decrypted = this.decryptMessage(userInput, encrypted, iv, authTag)
        console.log('ENCRYPTED', encryptedData)
        this.setState({
            // userKEY: KEY,
            cipherText: encryptedData,
            cipherTextLength: encryptedData.length,
            isSubmitted: true,
            // decipher: decrypted,
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleClick = event => {
        event.preventDefault()
        this.setState({
            isClicked: true
        })
    }

    render() {
        const { message, isSubmitted, cipherText, cipherTextLength, decipher, isClicked } = this.state
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
                    {cipherText && <p className='show-message'>Cipher text: {cipherText}</p>}
                    {cipherTextLength !== 0 && <p className='show-message'>Cipher text length: {cipherTextLength}</p>}
                </form>
                {isSubmitted && <button onClick={this.handleClick} type='submit' className='button'>Decrypt this text!</button>}
                {isClicked && <DecryptForm decipher={decipher} />}
            </section>
        )
    }
}

export default EncryptForm