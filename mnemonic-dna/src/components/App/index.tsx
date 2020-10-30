import React, {useEffect, useState} from 'react';
import './App.css';
import WordValidate from "../WordValidate";
import crypto from 'crypto-js';
import qs from "query-string";

// var TypingDnaClient = require('typingdnaclient');
// const {TypingDNA} = require("./../../typingdna-sdk/typingdna");
declare var TypingDNA: any;

function App() {

    const words = qs.parse(window.location.search)?.words?.toString().split(",") ?? ["bird", "is", "the", "word"]
    const tdna = new TypingDNA();

    console.log(crypto.SHA256(words.join(" ")).toString());

    useEffect(() => {
        tdna.start()
    }, [words])

    const [currentWordIdx, setCurrentWordIdx] = useState(0);

    const onWordVerified = () => {

        const word = words[currentWordIdx];
        const diagram = tdna.getTypingPattern();

        console.log(word);
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
        </div>
    );
}

export default App;
