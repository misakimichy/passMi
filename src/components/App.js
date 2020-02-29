import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputData: ''
    }
  }
  _userInput = React.createRef()

  generateHashValue = (e) => {
    e.preventDefault()
    console.log('hello')
    const data = this._userInput.value
    const crypto = window.crypto || window.msCrypto
    if(crypto.subtle) {
      console.log("Cryptography API supported")

      const promise = crypto.subtle.digest({name: "SHA-256"}, this.convertStringToArrayBuffer(data))
      promise.then(result => {
        const hash_value = this.convertArrayBufferToHexaDecimal(result)
      })
    } else {
      console.log("Cryptography API not supported.")
    }
  }

  convertStringToArrayBuffer = (userInput) => {
    // Instantiate 8-bit unsigned integers
    const bytes = new Uint8Array(userInput.length)
    for(let iii = 0; iii < userInput.length; iii++) {
      bytes[iii] = userInput.charCodeAt(iii)
    }
    console.log('ARRAY BUFFER', bytes)
    return bytes
  }

  convertArrayBufferToHexaDecimal = (buffer) => {
    let data_view = new DataView(buffer)
    let iii, len, hex = '', c;
    for(iii = 0, len = data_view.byteLength; iii < len; iii++) {
      c = data_view.getUint8(iii).toString(16)
      if(c.length < 2) {
        c += '0'
      }
      hex += c
    }
    console.log('HEX', hex)
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.generateHashValue}>
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
