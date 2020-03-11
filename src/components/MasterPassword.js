import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

class MasterPassword extends Component {
    state = {
        userPassword: '',
        toHome: false
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.onStorePassword(this.state.userPassword)
        this.setState({
            toHome: true
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const isInvalid = this.state.userPassword === ''
        
        if(this.state.toHome) {
            return <Redirect to='/' />
        }
        return(
            <form onSubmit={this.handleSubmit}>
                <label>Enter your master password</label>
                <input
                    name='userPassword'
                    type='password'
                    onChange={this.handleChange}
                    autoComplete='on'
                />
                <button disabled={isInvalid} type='submit'>Submit</button>
            </form>
        )
    }
}

MasterPassword.propType = {
    masterPassword: PropTypes.string.isRequired,
    onStorePassword: PropTypes.func.isRequired
}

export default MasterPassword