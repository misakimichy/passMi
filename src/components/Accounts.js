import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import { encrypt, decrypt } from '../crypto'
import Account from './Account'

class Accounts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts: {},
            error: null,
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
            const accountId = v4()
            const decrypted = decrypt(secrets, this.props.masterPassword)
            this.setState({
                accounts: {
                    [accountId]: {
                        website: decrypted.website,
                        email: decrypted.email,
                        password: decrypted.password

                    }
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

    addAccount = account => {
        const accountId = v4()
        this.state(prevState => ({
            accounts: {
                ...prevState,
                [accountId]: account
            }
        }))
    }

    render() {
        const { accounts, error } = this.state
        return(
            !error
            ?   <div>
                    Accounts component - render account
                    <Link to='/new'>Add New</Link>
                    {Object.keys(accounts).map(accountId =>
                        <Account
                            key={accountId}
                            website={accounts[accountId].website}
                            email={accounts[accountId].email}
                            password={accounts[accountId].password}
                        />
                    )}
                </div>
            :   <div>
                    <h3 className='error-message'>{error}</h3>
                    <p>Please refresh and enter the right password.</p>
                </div>
        )
    }
}

Accounts.propTypes = {
    masterPassword: PropTypes.string.isRequired
}

export default Accounts