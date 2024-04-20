import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      try {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractAddress = "0x8306EB0BE4D1445fA68a94e390Da857Ae719d790";
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        setContract(contract);
        setProvider(provider);
      } catch (error) {
        console.error("Metamask is not installed or user denied account access", error);
      }
    };

    provider && loadProvider();
  }, []);

  return (
    <div className="App">
      <div className="navbar">
        <div className="logo">ProcureChain</div>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <header className="App-header">
        <h1>Upload RSP Document</h1>
        <h3>Please connect your MetaMask Wallet:</h3>
        <p>If MetaMask wallet is not installed, please install the extension on any chromium-based browser using this <a href="https://metamask.io/download.html">link</a>.</p>
        <p>Account: {account || "Not connected"}</p>
        {/* <button className="share" onClick={() => setModalOpen(true)}>Share</button> */}
      </header>
      <FileUpload account={account} provider={provider} contract={contract} />
      <Display contract={contract} account={account} />
      {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}
    </div>
  );
}

export default App;

