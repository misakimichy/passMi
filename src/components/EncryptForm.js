import React, { Component } from 'react'
import crypto from 'crypto'
import DecryptForm from './DecryptForm'

class EncryptForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            masterPass: [],
            userInput: '',
            // KEY should be the user master password
            userKEY: '',
            isSubmitted: false,
            cipherText: null,
            cipherTextLength: 0,
            decipher: '',
            isClicked: false
        }
        
        if(!localStorage.getItem('masterPass')) {
            this.checkMasterPassword()
        }
    }

    checkMasterPassword = () => {
        const promptInput = prompt("Enter your master password")
        console.log('prompt test', promptInput)
        const KEY = new Buffer(crypto.randomBytes(32), 'utf8')
        const encryptedMasterPass = this.encryptMessage(promptInput, KEY)
        localStorage.setItem('masterPass', encryptedMasterPass)
        // this.setState({
        //     masterPass: encryptedMasterPass
        // })
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
   
        this.setState({
            userKEY: KEY,
            cipherText: encrypted,
            cipherTextLength: encrypted.length,
            isSubmitted: true,
            decipher: decrypted,
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
        const { userKEY, userInput, isSubmitted, cipherText, cipherTextLength, decipher, isClicked } = this.state
        const isInvalid = userInput === ''

        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        name='userInput'
                        placeholder='Encrypt this text...'
                        onChange={this.handleChange}
                    />
                    <button disabled={isInvalid} type='submit' className='button'>Convert</button>
                    {cipherText && <p className='show-message'>Cipher text: {cipherText}</p>}
                    {cipherTextLength !== 0 && <p className='show-message'>Cipher text length: {cipherTextLength}</p>}
                </form>
                {isSubmitted && <button onClick={this.handleClick} type='submit' className='button'>Decrypt this text!</button>}
                {isClicked && <DecryptForm userKey={userKEY} decipher={decipher} />}
            </section>
        )
    }
}

export default EncryptForm