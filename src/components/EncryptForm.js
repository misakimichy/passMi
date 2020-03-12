import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { encrypt, decrypt } from '../crypto'

class EncryptForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSubmitted: false,
            decipher: {
                website: '',
                email: '',
                password: ''
            },
            error: null,
            accountRawData: {
                website: '',
                email: '',
                password: ''
            }
        }
    }

    // unlock app when page first loads, retrieving user's secrets
    unlock() {
        // if first time using app, initialize empty secrets in local storage
        if(!localStorage.getItem('secrets')) {
            localStorage.setItem('secrets', encrypt("", this.props.masterPassword))
        }

        // decrypt db from local storage
        const secrets = localStorage.getItem('secrets')
        try {
            const decrypted = decrypt(secrets, this.props.masterPassword)
            this.setState({
                decipher: {
                    website: decrypted.website,
                    email: decrypted.email,
                    password: decrypted.password
                }
            })
            return decrypted
        } catch (error) {
            console.log(error.message)
            this.setState({
                error: error.message
            })
        }
    }

    componentDidMount() {
        this.unlock()
    }

    handleSubmit = event => {
        event.preventDefault()
        // this.createAccount()
        const secrets = encrypt(JSON.stringify(this.state.accountRawData), this.props.masterPassword)
        localStorage.setItem('secrets', secrets)
        const decrypted = decrypt(localStorage.getItem('secrets'), this.props.masterPassword)

        this.setState({
            isSubmitted: true,
            decipher: {
                website: decrypted.website,
                email: decrypted.email,
                password: decrypted.password
            }
        })
    }

    handleChange = event => {
        this.setState({
            accountRawData: {
                ...this.state.accountRawData,
                [event.target.name]: event.target.value
            }
        })
    }

    render() {
        const { decipher, isSubmitted, error, accountRawData } = this.state
        const isInvalid = accountRawData.website === '' || accountRawData.email === '' || accountRawData.password === ''
        const hasData = decipher.website !== '' || decipher.email !== '' || decipher.password !== ''
        return (
            !error
                ?   <section>
                        <form onSubmit={this.handleSubmit}>
                            <label>Website</label>
                            <input
                                type='text'
                                name='website'
                                onChange={this.handleChange}
                                placeholder={hasData ? decipher.website : null}
                            />
                            <label>Login Email</label>
                            <input
                                type='text'
                                name='email'
                                onChange={this.handleChange}
                                placeholder={hasData ? decipher.email : null}
                            />
                            <label>Password</label>
                            <input
                                type='password'
                                name='password'
                                onChange={this.handleChange}
                                placeholder={hasData ? decipher.password : null}
                                autoComplete='on'
                            />
                            <button disabled={isInvalid} type='submit' className='button'>Update</button>
                        </form>
                        {isSubmitted && error
                            ? <p>{error}</p>
                            : null
                        }
                        {isSubmitted &&
                            <div>
                                <p>Updated Website: {decipher.website}</p>
                                <p>Updated email: {decipher.email}</p>
                            </div>
                        }
                    </section>
                :   <div>
                        <h3 className='error-message'>{error}</h3>
                        <p>Please refresh and enter the right password.</p>
                    </div>
        )
    }
}

EncryptForm.propTypes = {
    masterPassword: PropTypes.string.isRequired
}
export default EncryptForm

// class Account {
//     constructor(website, email, password) {
//         this.website = website
//         this.email = email
//         this.password = password
//     }
// }