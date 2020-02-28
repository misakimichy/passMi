import React, { Component } from 'react'
import './App.css'

class App extends Component {
  _userInput = React.createRef()

  convertStringToArrayBuffer = (e) => {
    e.preventDefault()
    // Instantiate 8-bit unsigned integers
    const bytes = new Uint8Array(this._userInput.length)
    for(let iii = 0; iii < this._userInput.length; iii++) {
      bytes[iii] = this._userInput.charCodeAt(iii)
    }
    
    console.log('ARRAY BUFFER', bytes)
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.convertStringToArrayBuffer}>
          <input
            type='text'
            name='userInput'
            placeholder='type here'
            ref={input => {this._userInput = input}}
          />
          <input type='submit' placeholder='Convert' />

        </form>
      </div>
    )
  }
}

export default App
