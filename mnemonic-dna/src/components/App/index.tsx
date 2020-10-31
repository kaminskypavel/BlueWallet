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
            return <MnemonicVerifier words={words}/>
            break;

        default:
        case "record" :
            return <MnemonicRecorder words={words}/>
            break;

    }
};

export default App;
