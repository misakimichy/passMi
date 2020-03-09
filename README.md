# 🔒 PassMi 🔑

#### _Capstone Project: Password manager application - last update: 02/28/2020_

## Description
This is an end-to-end encrypted password manager build with Web Cryptography API, which is accessible in JavaScript only if it's running in n secure origin web page:
```
    (https, *, *)
    (wss, *, *)
    (*, localhost, *)
    (*, 127/8, *)
    (*, ::1/128, *)
    (file, *, —)
```

## Project Purpose: 
- Explore the knowledge of [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- Understand how the frontend can approach the safe user experience using symmetric encryptions/decryptions and data hashing.
- Scalable enough to work in the backend(C#) and frontend(React), which I can keep working on after graduating from bootcamp.


## MVP of this application:
- A user can type a message with a secret key in the text box and the text will be shown as a ciphertext. Once the user types the secret key, it gets decrypted and shows the original message.
- Use AES-GCM, one of the most secure cipher, for encryption.

<img src='./img/mvp-app.jpg' alt='mvp app design' />
Designed using Adobe XD

## Tools, frameworks, libraries, APIs, modules and/or other resources for MVP
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) - allows a script to use cryptographic primitives.
- [Web Cryptography API by W3C documentation](https://www.w3.org/TR/WebCryptoAPI/)
- [Encryption and Decryption - MDN web docs](https://developer.mozilla.org/en-US/docs/Archive/Security/Encryption_and_Decryption)
- [crypto.stackexchange.com](https://crypto.stackexchange.com/)
- [Crypto101](https://www.crypto101.io/) - basic knowledge about cryptography
- AES-256-GCM algorithms for Encryption and decryption: [GCM Wiki](https://en.wikipedia.org/wiki/Galois/Counter_Mode)
- Frontend - React

## Glossary
- [**Web Crypto API**](https://en.wikipedia.org/wiki/Web_Cryptography_API) - is a web API that released in 2017, which is a low-level interface that would increase the security of web applications by allowing them to perform cryptographic functions without having to access raw keying material.
- [**Cryptography**](https://en.wikipedia.org/wiki/Cryptography) - the practice and study of techniques for secure communication in the presence of third parties called adversaries.
- [**Encryption**](https://en.wikipedia.org/wiki/Encryption) - is the process of encoding a message or information in such a way that only authorized parties can access it and those who are not authorized cannot.
- [**Decryption**] - is the process of transforming encrypted information.
- [**Symmetric key**](https://en.wikipedia.org/wiki/Symmetric-key_algorithm) - uses the same key for encryption and decryption. Communicating parties must have the same key.
- [**Ciphertext**](https://en.wikipedia.org/wiki/Ciphertext) - is an encrypted or encoded information using an algorithm called a cipher, which contains a form of the original plaintext that is unreadable by a human or computer without the proper cipher to decrypt it.
- [**IV**](https://en.wikipedia.org/wiki/Initialization_vector) - IV stands for Initial Vector, which is a fixed-size input to cryptographic primitive that is typically required to be random or pseudorandom. 
- [**AES-GCM**](https://en.wikipedia.org/wiki/Galois/Counter_Mode) - is one of the ciphers for encryption. AES (Advanced Encryption Standard) is a symmetric encryption cipher and one of the most secure ones. GCM (Galois/Counter Mode) is a mode of operation for symmetric-key cryptographic block ciphers. The operation of GCM is an authenticated encryption algorithm designed to provide both data authenticity and confidentiality.



## Future Development
### Turn MVP into a real password manager.
- Connect my application with Firebase for authentication.
- Users can auto-generate passwords and those passwords are going to be stored in the database. Passwords are hashed in frontend before they are sent to a server.
- Add Authentication to send the device authorization to a user. Without verification, the user cannot access the password manager.
- Users can store their ID, passports and SNS info (data integrity protection).


## Additional tools, frameworks, libraries, APIs, or other resources for the future development
- Firebase
- Backend: C#

## What type of experience can user expect?
Details are coming soon.


## Installation:
1. Clone this repo:
```
$ git clone 
```

2. Install npm:

```
$ npm install
```

3. Run the project:
```
$ npm run start 
```

4. Open up the project in localhost

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Credit
Favicon is made by [icongeek26](https://www.flaticon.com/authors/icongeek26) attributed from [flaticon](flaticon.com)


## Known Bugs
- No known bugs


## Support and contact details
I welcome any feedback, comments and questions about this project. Email me to misaki.koonce@gmail.com

## Technologies Used
Git, GitHub, Adobe XD, React and Web Crypto API.

## License
Copyright © 2020 under the MIT License
