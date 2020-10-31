import React from 'react';
import './App.css';
import qs from "query-string";
import {MnemonicRecorder} from "../MnemonicRecorder";
import {MnemonicVerifier} from '../MnemonicVerifier';

// routing is done by applying ?type=record/verify to the querystring
const App = () => {
    const queryStringObj = qs.parse(window.location.search);

    const type = queryStringObj.type ?? "record";
    const words = queryStringObj?.words?.toString().split(",") ?? ["bird", "is", "the", "word"]

    switch (type.toString().toLowerCase()) {
        case "verify" :
            return <div className="App"><MnemonicVerifier words={words}/></div>

        default:
        case "record" :
            return <div className="App"><MnemonicRecorder words={words}/></div>
    }
};

export default App;
