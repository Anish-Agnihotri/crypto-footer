<p align='center'><img src='https://support.mycrypto.com/images/mycrypto-logo.png' width='250'/></p>
<h1 align='center'>Crypto Footer</h1>
<h4 align='center'> Super quick footer made to be conveniently imported into any existing webpage to provide network and balance statistics with a minimal 2.05kB import (assuming web3 provider is present).</h4>

## Key-design desicions
1. Works on a one-line import:
```html
<script src='https://rawcdn.githack.com/Anish-Agnihotri/crypto-footer/9535dbdfbffc4b19b067c38593160b0551f235f9/footer.min.js' 
type='text/javascript'></script>
```
2. It Works!?!
3. No, but honestly. Everything is in a single file of pure JS. No JQuery imports, sizing kept to under 2.05kB. All HTML + CSS is applied directly to the DOM from JS to ensure as little dependency or writing is needed. Doesn't get much easier than this.

## Improvements
1. Literally no error cases have been setup since this is just a demo. 
2. Does not work if MetaMask is not already authenticated. Pretty simple fix that does an onChange MetaMask auth should fix it.
3. I'm not joking throughout the script when I mention to **not use this in production**. I'm being serious. Please split up your HTML/CSS/JS and don't use pure JS for web3, use React. This was made simply to solve the purpose of a one-liner.
