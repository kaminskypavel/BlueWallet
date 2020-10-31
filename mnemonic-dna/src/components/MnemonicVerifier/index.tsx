import {isRunningInWebView} from "../../services/ReactTools";
import crypto from "crypto-js";
import React, {useContext, useEffect, useState} from "react";
import {verifyUser} from "../../services/TypingDNA";
import WordValidate from "../WordValidate";
import {TypingDNAContext} from "../../context";
import "./styles.scss";

type Props = {
    words: string[]
}

export const MnemonicVerifier = ({words}: Props) => {
    const MAX_WRODS_VALIDATE = isRunningInWebView() ? words.length : 2;
    const tdna = useContext(TypingDNAContext);

    useEffect(() => {
        tdna.start()
    }, [words, tdna])

    const [currentWordIdx, setCurrentWordIdx] = useState(0);

    const onWordVerified = async () => {
        const pattern = tdna.getTypingPattern();
        if (currentWordIdx < MAX_WRODS_VALIDATE - 1)
            setCurrentWordIdx(currentWordIdx + 1);
        else {
            const username = crypto.SHA256(words.join(" ")).toString()
            const res = await verifyUser(username, pattern)
            const {success,data} = res.data;

            if (success) {
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
            <h3>Verifying your identity..</h3>
            <small>Running on Mobile = {isRunningInWebView().toString()}</small>
            <WordValidate
                prefix={currentWordIdx + 1 + "."}
                word={words[currentWordIdx]}
                onComplete={onWordVerified}/>
            <br/>
            <div className="wrapper">
                {words.map((w, i) =>
                    <small key={w} className={`word ${i < currentWordIdx ? "verified" : ""} `}>{i}. {w}</small>)}
            </div>
        </div>
    );

}
