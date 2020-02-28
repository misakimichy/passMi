# 🔒 PassMi 🔑

#### _Capstone Project: Password manager application - last update: 02/28/2020_

## Description
This is an End-to-End encrypted password manager using Web Cryptography API.

Web Cryptography API is accessible by JavaScript only if its running in an secure origin web page:
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
- Understand better about privacy, which requires encryptions and decryptions.
- Scalable enough to work in the backend(C#) and frontend(React), which I can keep working on after graduating from bootcamp.


### MVP of this application:
- A user types a master password and decrypts the user's password list with it. (I will start with decrypting a hardcoded password list.)
- When a user searches their password-related data, it shows the filtered results letter by letter.
- UI will be designed by the __mobile first__ approach.


### Tools, frameworks, libraries, APIs, modules and/or other resources that will you use?
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API): allows a script to use cryptographic primitives.
- [Web Cryptography API by W3C documentation](https://www.w3.org/TR/WebCryptoAPI/)
- [Crypto101](https://www.crypto101.io/) - basic knowledge about cryptography
- [Web Cryptography API Tutorial](http://qnimate.com/post-series/web-cryptography-api-tutorial/)
- Frontend: React and Redux


### If you finish developing the minimum viable product (MVP) with time to spare, what will you work on next?
- Users can auto-generate passwords and they are stored in the app with C#
- Add Authentication to send the device authorization to a user. Without the verification, the user cannot access the password manager.
- Users can store their ID, passports and SNS info (data integrity protection).


### What additional tools, frameworks, libraries, APIs, or other resources will these additional features require?
- Backend: C#

### What type of experience can user expect?
- Mobile friendly UI
- Secure application that users can store their sensitive information.

More expectations are coming...


## PassMi Component and Route Structure
<!-- <img src='./img/screenshot.png' alt='component structure' /> -->
<!-- Designed using [Lucidchart](https://www.lucidchart.com/) -->


## Application


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

## Currently working on
`/inventory` route

## Support and contact details
Misaki Koonce: misaki.koonce@gmail.com

## Technologies Used
Git, GitHub, Lucidchart, ReactJS, Redux

## License
Copyright © 2020 under the MIT License
