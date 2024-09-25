import React, { useState } from 'react';
import './App.css';

function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        
        
        const balanceInWei = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });

        
        const balanceInEth = window.web3.utils.fromWei(balanceInWei, 'ether');
        setBalance(balanceInEth);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask!');
    }
  };

  return (
    <div className="App">
      <h1>Blockchain Wallet Connector</h1>
      <button onClick={connectWallet} className="btn-connect">
        {account ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
      
      {account && (
        <div className="account-info">
          <p><strong>Account:</strong> {account}</p>
          <p><strong>Balance:</strong> {balance} ETH</p>
        </div>
      )}
    </div>
  );
}

export default App;
