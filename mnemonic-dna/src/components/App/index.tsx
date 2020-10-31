import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import qs from "query-string";
import {TypingDNAContext} from "../../context";
import {MnemonicRecorder} from "../MnemonicRecorder";


const App = () => {
    const queryStringObj = qs.parse(window.location.search, {arrayFormat: "comma"});
    const type = queryStringObj.type ?? "record";

    switch (type.toString().toLowerCase()) {
        default:
        case "record" :
            const words = queryStringObj?.words?.toString().split(",") ?? ["bird", "is", "the", "word"]
            return <MnemonicRecorder words={words}/>
            break;

    }
};

export default App;
