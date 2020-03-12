import React from 'react'
import PropTypes from 'prop-types'

const Account = props => {
    return(
        <section className='account-container'>
            <p className='site-name'>{props.website}</p>
            <p>{props.email}</p>
            <p>{props.password}</p>
        </section>
    )
}

Account.propTypes = {
    website: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
}

export default Account