import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import MasterPassword from './MasterPassword'
import Accounts from './Accounts'
import Account from './Account'
import EncryptForm from './EncryptForm'
import NotFound from './NotFound'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      masterPassword: null
    }
  }

  getMasterPassword = userPassword => {
    this.setState({
      masterPassword: userPassword
    })
  }

  render() {
    return (
      <Router>
        {!this.state.masterPassword
        ? <MasterPassword
            path='/ask-password'
            masterPassword={this.state.masterPassword}
            onStorePassword={this.getMasterPassword}
          />
        : <div className="App">
            <Switch>
              <Route exact path='/' render={() => <Accounts masterPassword={this.state.masterPassword}  />} />
              <Route path='/new' render={props => <EncryptForm masterPassword={this.state.masterPassword} />} />
              <Route path='/account' render={() => <Account />} />
              <Route component={NotFound} />
            </Switch>
          </div>}
      </Router>
    )
  }
}

export default App
