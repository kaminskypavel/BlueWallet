import {isRunningInWebView} from "../../services/ReactTools";
import crypto from "crypto-js";
import React, {useContext, useEffect, useState} from "react";
import {verifyUser} from "../../services/TypingDNA";
import WordValidate from "../WordValidate";
import {TypingDNAContext} from "../../context";
import "./styles.scss";
import sampleSize from "lodash/sampleSize";

type Props = {
    words: string[]
}

const MAX_WORDS_VALIDATE = isRunningInWebView() ? 3 : 3;

export const MnemonicVerifier = ({words}: Props) => {
    const tdna = useContext(TypingDNAContext);
    const randomWords=  sampleSize(words,MAX_WORDS_VALIDATE)

    useEffect(() => {
        tdna.start()
    }, [randomWords, tdna])

    const [currentWordIdx, setCurrentWordIdx] = useState(0);

    const onWordVerified = async () => {
        const pattern = tdna.getTypingPattern();
        if (currentWordIdx < MAX_WORDS_VALIDATE - 1)
            setCurrentWordIdx(currentWordIdx + 1);
        else {
            const username = crypto.SHA256(words.join(" ")).toString()
            const data = await verifyUser(username, pattern)

            if (data.success) {
                closeAndSendToWallet(data)
            } else {
                alert("Couldn't create user")
            }
        }
    }

    const closeAndSendToWallet = (data:any) => {
        isRunningInWebView() ? window.ReactNativeWebView.postMessage(JSON.stringify(data)) :
            alert("windows is closed")
    }

    return (
        <div className="App">
            <h2>Biometric Verification 🔍</h2>
            <h3>Please type the following {MAX_WORDS_VALIDATE} words</h3>
            {/*<small>Running on Mobile = {isRunningInWebView().toString()}</small>*/}
            <WordValidate
                word={randomWords[currentWordIdx]}
                onComplete={onWordVerified}/>
            <br/>
        </div>
    );

}
