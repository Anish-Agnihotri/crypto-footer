/*
This should not be used in production, and is certainely not what an ideal implementation looks like. 
It is simply made to be a one-line import solution, thus why all the components + functions are compacted into one script.
*/

// Setup footer to append to bottom of document body.
document.body.innerHTML += "<div id='mycrypto-footer'><div><img src='https://mycrypto.com/common/assets/images/logo-mycrypto.svg?2adf3b' /></div><div><div class='option' id='balance'></div><div class='option' id='network'></div></div></div>";

// Setup footer styling.
var footerStyle = document.createElement('style');
// Style footer:
footerStyle.innerHTML =
    '#mycrypto-footer {' +
        'background-color: #163150;' +
        'width: 100vw;' + // Full width of page.
        'height: 70px;' + // Fixed height (it's a footer, no need to be dynamically sized).
        'position: fixed;' + // Fixed position.
        'bottom: 0;' + // Pushed to be at bottom.
    '}' +
    '#mycrypto-footer > div:first-child {' + // Logo div.
        'height: 100%;' +
        'width: 200px;' + // Fixed logo div sizing.
        'float: left;' +
        'text-align: center;' + // Center logo horizontally.
        'line-height: 75px;' + // Center logo vertically by setting line-height to div height and using vertical-align.
    '}' +
    '#mycrypto-footer > div:first-child > img {' +
        'width: 150px;' + // Set image width.
        'vertical-align: middle;' + // Vertically align image in parent div.
    '}' +
    '#mycrypto-footer > div:last-child {' + // Info div.
        'height: 100%;' +
        'width: calc(100% - 220px);' + // Responsive sizing to take up 100% of viewwidth besides logo div + 20px padding on right.
        'float: left;' +
        'text-align: right;' + // Align inner divs to right; 
        // ^ Using this also allows the network subsection to autohide on mobile and ultrasmall displays. In the future, it would be better to use media queries to do this.
    '}' +
    '.option {' + // Info subsection divs.
        'color: #fff;' +
        'font-family: "Segoe UI";' +
        'border: 1px solid #4d5f74;' +
        'width: 125px;' +
        'float: right;' +
        'text-align: center;' +
        // All of this sizing is fixed, but can easily be made responsive. Really no need in this case though because the footer itself has a fixed height.
        'height: 37.5px;' +
        'line-height: 37.5px;' +
        'border-radius: 25px;' +
        'font-size: 17px;' +
        'margin-left: 5px;' +
        'margin-right: 5px;' +
        'margin-top: 18.75px;' +
    '}';
// Append styling to the head.
document.head.appendChild(footerStyle);

// On page load add an async eventListener to listen for web3.
window.addEventListener('load', async () => {
    // For modern web browsers:
    if (window.ethereum) {

        window.web3 = new Web3(ethereum); // Instantiate web3.

        try {

            await ethereum.enable();

            // Update Ethereum balance.
            function updateEther() {
                web3.eth.getCoinbase(function (err, account) { // Get the coinbase account. For this quick example, all error parsing is ignored. This can be added in production.
                    web3.eth.getBalance(account, function (err, balance) { // Get the balance of the coinbase account.
                        document.getElementById('balance').innerHTML = (web3.fromWei(balance, 'ether').toNumber().toFixed(4) + ' ETH'); // Get the balance of the coinbase account, convert BigNumber to readable Ether value, round to four decimal points, and push to balance info subsection div.
                    })
                });
            }

            // Update Ethereum network.
            function updateNetwork(data) { // Take the data callback from the web3.currentProvider.publicConfigStore.on('update'):
                switch (data.networkVersion) { // Check what the returned data.networkVersion is:
                    case "1": // If networkVersion == 1, set network info subsection div content to Mainnet.
                        document.getElementById('network').innerHTML = 'Mainnet';
                        break
                    case "3": // If networkVersion == 3, set network info subsection div content to Ropsten.
                        document.getElementById('network').innerHTML = 'Ropsten';
                        break
                    case "4": // If networkVersion == 4, set network info subsection div content to Rinkeby.
                        document.getElementById('network').innerHTML = 'Rinkeby';
                        break
                    case "42": // If networkVersion == 42, set network info subsection div content to Kovan.
                        document.getElementById('network').innerHTML = 'Kovan';
                        break
                    case "5": // If networkVersion == 5, set network info subsection div content to Goerli.
                        document.getElementById('network').innerHTML = 'Goerli';
                        break
                    default: // If networkVersion == ???, set network info subsection div content to Unknown.
                        document.getElementById('network').innerHTML = 'Unknown';
                }
            }

            // Check for async MetaMask updates.
            web3.currentProvider.publicConfigStore.on('update', callback);

            // Assuming that there is a MetaMask change, run updateEther(), and updateNetwork() again to update reflected values.
            function callback(data) {
                updateEther();
                updateNetwork(data);
            }

        } catch (error) {
            // If the user denies MetaMask access, this is where you'd put an error callback of the sorts.
            // Since this is just a test application, error cases have not been built in.
        }

    }
    // For Legacy DApp browsers:
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider); // Accounts are always exposed.
    }
    
    // Or, if the browser literally does not have a Web3 provider:
    else {
        document.getElementById('network').innerHTML = 'Unknown'; // Push unknowns to network and balance assuming no Web3.
        document.getElementById('balance').innerHTML = 'Unknown';
        // An external Web3 src like Infura could be applied here, but for now, has not been - due to this being a simple test application.
    }
});