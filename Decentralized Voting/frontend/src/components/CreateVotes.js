import React from 'react';
import "./Background.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const CreateVote = ({ contract }) => {
  const [uri, setUri] = useState("");
  const [options, setOptions] = useState(2);
  const [endDate, setEndDate] = useState("");

  const createVote = async () => {
    if (!contract) {
      alert("Please connect to Metamask");
      return;
    }
    await contract
      .createVote(uri, new Date(endDate).getTime(), options)
      .then(() => alert("Vote Created Successfully"))
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <Form className="m-2">
        <Form.Group className="m-2">
          <label htmlFor="uri" className='animate-small-text'><b>IPFS URI</b></label>
          <Form.Control
            type="text"
            name="uri"
            placeholder="IPFS URI"
            value={uri}
            onChange={(e) => setUri(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-2">
          <label htmlFor="options" className='animate-small-text'><b>Number of Options</b></label>
          <Form.Control
            type="number"
            min={2}
            max={8}
            name="options"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-2">
          <label htmlFor="options" className='animate-small-text'><b>End Date</b></label>
          <Form.Control
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-2 mt-4 d-flex justify-content-center">
          <Button className="space" onClick={createVote}>
            <strong>Create</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>
            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </Button>

        </Form.Group>
      </Form>
    </>
  );
};
export default CreateVote;
