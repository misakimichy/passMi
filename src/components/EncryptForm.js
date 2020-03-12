import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
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
            },
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const secrets = encrypt(JSON.stringify(this.state.accountRawData), this.props.masterPassword)
        localStorage.setItem('secrets', secrets)
        const decrypted = decrypt(localStorage.getItem('secrets'), this.props.masterPassword)

        this.setState({
            isSubmitted: true,
            decipher: {
                website: decrypted.website,
                email: decrypted.email,
                password: decrypted.password
            },
        })
        if(this.state.isSubmitted) {
            this.props.history.push('/')
        }
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
        if(isSubmitted) {
            return <Redirect to='/' />
        }
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
                            <button disabled={isInvalid} type='submit' className='button'>Save</button>
                        </form>
                        {isSubmitted && error
                            ? <p>{error}</p>
                            : null
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
export default withRouter(EncryptForm)
