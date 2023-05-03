import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Background.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateVote from "./components/CreateVotes";
import Votes from "./components/Votes";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { connect, getContract } from "./contract";
import Background from './components/Background';

function App() {
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts.length > 0) {
        handleInit();
      } else setConnected(false);
    });
  }, []);

  const handleInit = () => {
    setConnected(true);
    getContract().then(({ contract, signer }) => {
      setContract(contract);

      if (contract) {
        signer.getAddress().then((address) => {
          contract.members(address).then((result) => setIsMember(result));
        });
      }
    });
  };

  const connectCallback = async () => {
    const { contract } = await connect();
    setContract(contract);
    if (contract) {
      setConnected(true);
    }
  };

  const becomeMember = async () => {
    if (!contract) {
      alert("Please connect to Metamask");
      return;
    }

    await contract
      .join()
      .then(() => {
        alert("You are now a member");
        setIsMember(true);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <Router>
        <Navbar
          connect={connectCallback}
          connected={connected}
          becomeMember={becomeMember}
          isMember={isMember}/>
          {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',margin: "auto", fontSize: '48px',marginTop: "250px"}}>
            <p style={{ textAlign: 'center' }} className='animate-charcter'><b>𝙳𝚎𝚌𝚎𝚗𝚝𝚛𝚊𝚕𝚒𝚣𝚎𝚍 𝚅𝚘𝚝𝚒𝚗𝚐 𝚂𝚢𝚜𝚝𝚎𝚖</b></p>
          </div> */}
        <div className="container">
          <Routes>
            <Route path="create-vote" element={<CreateVote contract={contract}/>} />
            <Route path="votes" element={<Votes contract={contract}/>} />
          </Routes>
        </div>
      </Router>
      <Background />
    </>
  );
}
export default App;
