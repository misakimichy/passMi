import React, { Component } from 'react'

class EncryptForm extends Component {
    state = {
        data: 'QNimate',
    }
    _userInput = React.createRef()
    
    convertStringToArrayBuffer = (e) => {
        e.preventDefault()
        console.log('input', this._userInput.value)
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
        let promise_key = null

        if(crypto.subtle){
            console.log("Cryptography API supported")
            // Parameters:
            // 1. Symmentrix Enxryption algorithm name and its requirements
            // 2. Boolean indicating extractable, which indicates whether or not the raw key material may be exported by the application
            // 3. Usage of the Key
            promise_key = crypto.subtle.generateKey(
            {
                name: 'AES- GCM',
                length: 256
            }, true, ['encrypt', 'decrypt']
            ).then(key => {
                key_object = key
            }).catch(e => {
                console.log('Error', e.message)
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
            }).catch(e => {
                console.log(e.message)
            }
        )
    }


    render() {
        return (
            <div>
                <form onSubmit={this.convertStringToArrayBuffer}>
                    <input
                        type='text'
                        name='userInput'
                        placeholder='Encrypt this text...'
                        ref={input => {this._userInput = input}}
                    />
                    <input type='submit' placeholder='Convert' />
                </form>
            </div>
        )
    }
}

export default EncryptForm