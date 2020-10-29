import React, {useState} from 'react';
import './App.css';
import WordValidate from "../WordValidate";

function App() {
    const words = ["bird", "is", "the", "word"]

    const [currentWordIdx, setCurrentWordIdx] = useState(0);

    const onWordVerified = () => {
        if (currentWordIdx < words.length - 1)
            setCurrentWordIdx(currentWordIdx + 1);
        else
            alert('done')
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
