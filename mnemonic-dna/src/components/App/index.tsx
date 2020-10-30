import React, {useEffect, useState} from 'react';
import './App.css';
import WordValidate from "../WordValidate";
import crypto from 'crypto-js';
import qs from "query-string";

// var TypingDnaClient = require('typingdnaclient');
// const {TypingDNA} = require("./../../typingdna-sdk/typingdna");

function App() {

    const words = qs.parse(window.location.search)?.words?.toString().split(",") ?? ["bird", "is", "the", "word"]
    const tdna = new TypingDNA();

    console.log(crypto.SHA256(words.join(" ")).toString());

    useEffect(() => {
        tdna.start()
    }, [words])

    const [currentWordIdx, setCurrentWordIdx] = useState(0);

    const onWordVerified = () => {

        const diagram = tdna.getTypingPattern();

        if (currentWordIdx < words.length - 1)
            setCurrentWordIdx(currentWordIdx + 1);
        else
            alert(diagram)
    }

    return (
        <div className="App">
            <WordValidate
                prefix={currentWordIdx + 1 + "."}
                word={words[currentWordIdx]}
                onComplete={onWordVerified}/>
            <br/>
            <div className="wrapper">
                {words.map((w, i) =>
                    <small key={w} className={`word ${i < currentWordIdx ? "bold" : ""} `}>{i}. {w}</small>)}
            </div>
            <button onClick={() => window.ReactNativeWebView.postMessage("finish")}>Close</button>
        </div>
    );
}

export default App;
