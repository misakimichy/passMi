import React, { Component } from 'react'

class EncryptForm extends Component {
    state = {
        data: 'QNimate',
        userInput: '',
        error: null
    }
    _userInput = React.createRef()
    
    convertStringToArrayBuffer = (e) => {
        e.preventDefault()
        console.log('INPUT', this._userInput.value)
        // Instantiate 8-bit unsigned integers
        const bytes = new Uint8Array(this._userInput.value.length)
        for(let iii = 0; iii < this._userInput.value.length; iii++) {
          bytes[iii] = this._userInput.value.charCodeAt(iii)
        }
        console.log('ARRAY BUFFER', bytes)
        this.convertArrayBufferViewToString(bytes)
        // return bytes
    }

    convertArrayBufferViewToString = (buffer) => {
        let str = ''
        for(let iii = 0; iii < buffer.byteLength; iii++) {
            str += String.fromCharCode(buffer[iii])
        }

        console.log('ARRAY TO STR', str)
        this.generateKey()
        // return str
    }

    // Generate Key for encryption and decryption
    generateKey = () => {
        const crypto = window.crypto || window.msCrypto
        let key_object = null

        if(crypto.subtle){
            console.log("Cryptography API supported")
            // Parameters:
            // 1. Symmetric Encryption algorithm name and its requirements
            // 2. Boolean indicating extractable, which indicates whether or not the raw key material may be exported by the application
            // 3. Usage of the Key
            let promise_key = crypto.subtle.generateKey(
            {
                name: 'AES- GCM',
                length: 256
            }, true, ['encrypt', 'decrypt']
            ).then(key => {
                
                key_object = key
            }).catch(error => {
                this.setState({ error })
            })
        } else {
            console.log('Cryptography APi not Supported')
        }
    }

    // 
    initializeVector = () => {
        // IV should be 16 bytes
        const iv = crypto.getRandomValues(new Uint8Array(12))

        this.encryptData(iv)
    }

    encryptData = (iv) => {
        let encrypted_data = null
        const encrypt_promise = crypto.subtle.encrypt(
            {
                name: '',
                iv: iv
            }).then(result => {
                encrypted_data = new Uint8Array(result)
                console.log('enxrypted_data', encrypted_data)
            }).catch(error => {
                this.setState({ error })
            }
        )
    }

    /*
        Non-encryption methods
    */
    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { userInput, error } = this.state
        const isInvalid = userInput === ''
        return (
            <form onSubmit={this.convertStringToArrayBuffer}>
                <input
                    type='text'
                    name='userInput'
                    placeholder='Encrypt this text...'
                    ref={input => {this._userInput = input}}
                    onChange={this.onChange}
                />
                <button disabled={isInvalid} type='submit'>Convert</button>
                {error && <p className='error-message'>{error.message}</p>}
            </form>
        )
    }
}

export default EncryptForm