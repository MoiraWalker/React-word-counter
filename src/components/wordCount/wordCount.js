import React, { useState, useEffect } from 'react';
import './wordCount.scss';
import { useForm } from 'react-hook-form';
import { Button } from "../button/button";
import { ButtonWrapper } from "../buttonWrapper/buttonWrapper";

export const WordCount = ({}) => {
    const { register, handleSubmit } = useForm();
    const [ highestFreq, setHighestFreq ] = useState(0);
    const [ mostFreqNWords, setMostFreqNWords ] = useState("0");
    const [ specifiedWord, setSpecifiedWord ] = useState("");
    const [ specifiedWordFreq, setSpecifiedWordFreq ] = useState("0");
    const [ demoText, setDemoText ] = useState("");
    const [ cloneKeys, setCloneKeys ] = useState([]);
    const [ cloneValues, setCloneValues ] = useState([]);

    let frequency = {};
    let keys = [];
    let values = [];

    function onSucces(data) {
        // convert data to array of words
        let allWords= getWords(data);

        // convert words to lowercase
        let allLowerCaseWords = setToLowerCase(allWords);

        // calculate frequency of words, creates a value and key structure
        getFrequency(allLowerCaseWords);

        // sort keys alphabetically
        keys.sort();

        // sort frequency from high to low
        sortFrequencyFromHighToLow(keys, frequency);

        // assign values to array and return values
        getValues(keys);

        // calculate highest frequency
        getHighestFrequency(values);

        // calculate most frequent n words
        calculateMostFrequentNWordsToString();

        // create a clone of keys so calculateFrequencyForWord can access them
        setCloneKeys([...keys]);

        // create a clone of values so calculateFrequencyForWord can access them
        setCloneValues([...values]);

        // reset specified word
        setSpecifiedWord("");
    }

    function getWords(data) {
        let words = data.textArea.split(/[0-9\W+]/g);
        return words.filter(e =>  e);
    }

    function setToLowerCase(words) {
        let lowerCaseWords = [];
            for (let i=0; i <  words.length; i++ ) {
                lowerCaseWords.push(words[i].toLowerCase());
            }
        return lowerCaseWords;
    }

    function getFrequency(words){
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            if (frequency[word] === undefined) {
                frequency[word] = 1;
                keys.push(word);
            } else {
                frequency[word] ++;
            }
        }
        return frequency;
    }

    function sortFrequencyFromHighToLow(keys, frequency) {
        keys.sort(function (a,b) {
            let frequencyA = frequency[a];
            let frequencyB = frequency[b];
            return frequencyB - frequencyA;
        });
    }

    function getValues(words) {
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            values.push(frequency[key]);
        }
        return values;
    }

    function getHighestFrequency(values) {
        let maxValue = Math.max(...values);
        setHighestFreq(maxValue);
    }

    // This function is not called to pass data to the browser interface.
    // This function demonstrates the output asked for in the technical test description.
    function calculateMostFrequentNWords() {
        let frequent = [];
        let first = [keys[0], values[0]];
        let second = [keys[1], values[1]];
        let third = [keys[2], values[2]];
        frequent.push(first)
        frequent.push(second);
        frequent.push(third);
        return frequent;
    }

    function calculateMostFrequentNWordsToString() {
        let str = "";
            for (let i = 0; i < keys.length; i++ ) {
                if (keys.length >= 3 ) {
                    str = `${keys[0]}, ${values[0]} / ${keys[1]}, ${values[1]} / ${keys[2]}, ${values[2]}`;
                }
                else if (keys.length === 2) {
                    str =`${keys[0]}, ${values[0]} / ${keys[1]}, ${values[1]}`;
                }
                else if (keys.length === 1) {
                    str = `${keys[0]}, ${values[0]}`;
                }
        }
        setMostFreqNWords(str);
    }

    function calculateFrequencyForWord(data){
        let word = data.toLowerCase();
        if (cloneKeys.includes(word)) {
            let index = cloneKeys.indexOf(word);
            setSpecifiedWordFreq(cloneValues[index]);
        } else {
            setSpecifiedWordFreq(0);
        }
    }

    function onReset(){
        setHighestFreq(0);
        setMostFreqNWords("0");
        setDemoText("");
        setSpecifiedWord("");
    }

    function useDemoText() {
       setDemoText("This is demo text with numbers 123456, dividers, special characters, @#$%^^&*(), quotes '' and more! You can add or adjust this text. Or press 'reset' to type your text. Have fun!");
    }

    return (
        <div>
            <form className="word-count" onSubmit={handleSubmit(onSucces)}>
                <ButtonWrapper>
                    <Button id="demo-button" className="button button-secondary" type="button" onClick={useDemoText}>Use Demo Text</Button>
                    <Button id="reset-button" className="button button-secondary" type="reset" onClick={onReset}>Reset</Button>
                </ButtonWrapper>
                <textarea
                    id="text-area"
                    name="textArea"
                    placeholder="Type your text here ... "
                    rows="15"
                    cols="60"
                    value={demoText}
                    onChange={(e) => setDemoText(e.target.value)}
                    ref={
                        register({
                            required: true
                        })
                    }
                ></textarea>
                <ButtonWrapper>
                    <Button className="button button-primary">Submit</Button>
                </ButtonWrapper>
            </form>
            <div>
                <ul>
                    <li>
                        <p id="highest-freq" className="title">Highest frequency:</p>
                        <p id="highest-freq-answer" className="answer">{highestFreq}</p>
                    </li>
                    <li>
                        <p className="title">Most frequent N words: </p>
                        <p className="answer">{mostFreqNWords} </p>
                    </li>
                    <li>
                        <p className="title">The word</p>
                        <input
                            type="text"
                            id="specified-word"
                            name="specified-word"
                            value={specifiedWord}
                            onChange={(e) => {
                                setSpecifiedWord(e.target.value);
                                calculateFrequencyForWord(e.target.value);
                            }}
                            placeholder="type word here"
                        ></input>
                        <p className="title">has a frequency of</p>
                        <p className="answer">{specifiedWordFreq}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};
