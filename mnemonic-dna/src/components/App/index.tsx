import React, {useEffect, useState} from 'react';
import './App.css';
import WordValidate from "../WordValidate";
import crypto from 'crypto-js';
import qs from "query-string";
import {createUser, verifyUser} from "../../services/TypingDNA";
import {isRuningInWebView} from "../../services/ReactTools";

const tdna = new TypingDNA();

const App = () => {

    const words = qs.parse(window.location.search)?.words?.toString().split(",") ?? ["bird", "is", "the", "word"]
    const MAX_WRODS_VALIDATE = isRuningInWebView() ? words.length : 2;

    console.log(crypto.SHA256(words.join(" ")).toString());

    useEffect(() => {
        tdna.start()
    }, [words])

    const [currentWordIdx, setCurrentWordIdx] = useState(0);

    const onWordVerified = async () => {
        const pattern = tdna.getTypingPattern();
        if (currentWordIdx < MAX_WRODS_VALIDATE - 1)
            setCurrentWordIdx(currentWordIdx + 1);
        else {
            const username = crypto.SHA256(words.join(" ")).toString()
            const res = await verifyUser(username, pattern)
            const {success} = res.data;

            if (success) {
                closeWindow()
            } else {
                alert("Couldn't create user")
            }
        }
    }

    const closeWindow = () => {
        isRuningInWebView() ? window.ReactNativeWebView.postMessage("finish") :
            alert("windows is closed")
    }

    return (
        <div className="App">
            <h5>Running on Mobile = {isRuningInWebView().toString()}</h5>
            <WordValidate
                prefix={currentWordIdx + 1 + "."}
                word={words[currentWordIdx]}
                onComplete={onWordVerified}/>
            <br/>
            <div className="wrapper">
                {words.map((w, i) =>
                    <small key={w} className={`word ${i < currentWordIdx ? "bold" : ""} `}>{i}. {w}</small>)}
            </div>
        </div>
    );
};

export default App;
