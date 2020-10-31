# BioWallet - a Bitcoin wallet (₿) with biometric protection
---
A Thin Bitcoin Wallet, Based on the popular [BlueWallet](www.bluewallet.io).

Integrated with [TypingDNA](typingdna.com) biometrics authentication

---

####  ⚠ THIS IS A PROOF OF CONCEPT - PLEASE DO NOT USE IT FOR STORING REAL BITCOINS (YET) ⚠ 

---
<img src="./assets/preview.gif">


## Build Instructions

* In your console:

```
git clone https://github.com/kaminskypavel/biowallet
cd dna-layer-bluewallet
yarn
```


### Setup Mnemonic-DNA Server 

First, lets build the client recorder and verifier 
```
1. cd mnemonic-dna
2. yarn
3. yarn start
```

Now, lets build the server  
```
1. cd mnemonic-dna/server
2. yarn
3. yarn start
```
### Build Clients

* Proxy 
for development purposes, 
make sure ports 3000 and 8081 are proxied to your local PC

```$ proxy.bat ```

* Android

```
npx react-native run-android
```

* To run on iOS:

```
npx pod-install
npm start
```

In another terminal window within the BlueWallet folder:
```
npx react-native run-ios
```

## Resources
- [TypingDNA Dashboard](https://www.typingdna.com/clients/)
- [TypingDNA API Docs](https://api.typingdna.com/index.html#api-API_Services-saveUserPattern)
- [Chrome DevTools Webview](chrome://inspect/#devices)

## Stack
TBD

## LICENSE
MIT

## RESPONSIBLE DISCLOSURE
This is a proof-of-concept, I take no responsibility if you decide to store your coins here
