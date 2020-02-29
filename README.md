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

### Project Purpose: 
- Explore the knowledge of [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- Understand how the frontend can approach the safe user experience using encryptions/decryptions and data hashing.
- Scalable enough to work in the backend(C#) and frontend(React), which I can keep working on after graduating from bootcamp.


### MVP of this application:
- A user can type a message with a secret key in the text box and submit it in the "Encrypt Me" screen. Once it got submitted, the ciphertext will appear in the 'Decrypt Me' screen. Once the user types the secret key, it gets decrypted and shows the original message.

<img src='./img/mvp-app.jpg' alt='mvp app design' />
Designed using Adobe XD

### Tools, frameworks, libraries, APIs, modules and/or other resources for MVP
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API): allows a script to use cryptographic primitives.
- [Web Cryptography API by W3C documentation](https://www.w3.org/TR/WebCryptoAPI/)
- [Crypto101](https://www.crypto101.io/) - basic knowledge about cryptography
- [Web Cryptography API Tutorial](http://qnimate.com/post-series/web-cryptography-api-tutorial/)
- Frontend: React and Redux


### Future Development
#### Turn MVP into a real password manager.
- Users can auto-generate passwords and those passwords are going to be stored in the database. Passwords are hashed in frontend before they are sent to a server.
- Add Authentication to send the device authorization to a user. Without verification, the user cannot access the password manager.
- Users can store their ID, passports and SNS info (data integrity protection).


### Additional tools, frameworks, libraries, APIs, or other resources for the future development
- Backend: C#

### What type of experience can user expect?
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
Git, GitHub, Adobe XD, ReactJS and Redux

## License
Copyright © 2020 under the MIT License
