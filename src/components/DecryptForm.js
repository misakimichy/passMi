import React, { Component } from 'react'
import crypto from 'crypto'
import PropTypes from 'prop-types'

class DecryptForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            decipher: null,
            isClicked: false
        }
    }
    decryptMessage(password, cipherText) {
        try {
            // const decipher = crypto.createDecipheriv('aes-256-gcm', password, iv)
            // decipher.setAuthTag(authTag)
            // let text = decipher.update(encoded, 'base64', 'utf8')
            // text += decipher.final('utf8')
            // return text
            const cipherTextParts = cipherText.split('enc::')
            if(cipherTextParts.length !== 2) {
                console.error("Couldn't determine the beginning of the cipherText. Maybe not encrypted by this method🧐")
            } else {
                cipherText = cipherTextParts[1]
            }
            
            const inputData = Buffer.from(cipherText, 'hex')

            // Split ciphertext into partials
            const salt = inputData.slice(0, 64)
            const iv = inputData.slice(64, 80)
            const authTag = inputData.slice(80, 96)
            const iterations = parseInt(inputData.slice(96, 101).toString('utf-8'), 10)
            const encryptedData = inputData.slice(101)

            const KEY = this.deriveKeyFromPassword(password, salt, Math.floor(iterations * 0.47 + 1337))
            const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv)
            decipher.setAuthTag(authTag)
            const decrypted = decipher.update(encryptedData, 'binary', 'utf-8') + decipher.final('utf-8')
            try {
                console.log('JSON DECRYPT', JSON.parse(decrypted))
                return JSON.parse(decrypted)
            } catch (error) {
                console.log('DECRYPTED', decrypted)
                return decrypted
            }
        } catch (error) {
            this.setState({
                error: error.message
            })
        }
    }

    handleClick = event => {
        event.preventDefault()
        const userDecryptPassword = this.props.checkMasterPassword()
        const decrypted = this.decryptMessage(userDecryptPassword, this.props.encryptedData)
        this.setState({
            decipher: decrypted,
            isClicked: true

        })
    }

    render() {
        const { isClicked } = this.state
        return (
            <section className='container'>
                <button onClick={this.handleClick} type='submit' className='button'>Decrypt this text!</button>
                {isClicked && <p>Decipher text: {this.props.decipher}</p>
                }
            </section>
        )
    }
}

DecryptForm.propTypes = {
    checkMasterPassword: PropTypes.func.isRequired,
    encryptedData: PropTypes.string.isRequired
}

export default DecryptForm