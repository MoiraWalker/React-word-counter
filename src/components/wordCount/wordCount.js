import React, { useState, useEffect } from 'react';
import './index.scss';
import {useForm} from 'react-hook-form';
import {Button} from "../button";
import {ButtonWrapper} from "../buttonWrapper";

export const WordCount = ({}) => {
    const { register, reset, handleSubmit } = useForm();
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

        // calculate frequendy of words, creates a value and key structure
        getFrequency(allWords);

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

        // create a clone of values so calculateFrequencyForWord can acces them
        setCloneValues([...values]);
    }

    function getWords(data) {
        let words = data.textInput.split(/[0-9\W+]/g);
        return words.filter(e =>  e);
    }

    function getFrequency(words){
        for (let i = 0; i <words.length; i++) {
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

    // deze functie word niet gebruikt om data door te sluizen naar de user interface in de browser, maar was wel een vereiste in de technische test
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
        let str = `${keys[0]}, ${values[0]} /  ${keys[1]}, ${values[1]} /  ${keys[2]}, ${values[2]}`;
        setMostFreqNWords(str);
    }

    function calculateFrequencyForWord(word){
        if (cloneKeys.includes(word)) {
            console.log(word , "is included");
            let index = cloneKeys.indexOf(word);
            setSpecifiedWordFreq(cloneValues[index]);
        } else {
            return "Word is not included in input text"
        }
    }

    function onReset(){
        setHighestFreq(0);
        setMostFreqNWords("0");
        setDemoText("");
    }

    function useDemoText() {
        setDemoText("This is demo text with numbers 123456, dividers, special characters, @#$%^^&*(), quotes '' and more! You can add or adjust this text. Or press 'reset' to type your text. Have fun!");
    }

    return (
        <div>
            <form className="word-count" onSubmit={handleSubmit(onSucces)}>
                <ButtonWrapper>
                    <Button className="button button-secondary" type="button" onClick={useDemoText} >Use Demo Text</Button>
                    <Button className="button button-secondary" type="reset" onClick={onReset}>Reset</Button>
                </ButtonWrapper>
                <textarea
                    name="textInput"
                    placeholder="Type your text here ... "
                    rows="15"
                    cols="60"
                    value={demoText}
                    onChange={(e) => setDemoText(e.target.value)}
                    ref={register}
                ></textarea>
                <ButtonWrapper>
                    <Button className="button button-primary">Submit</Button>
                </ButtonWrapper>
            </form>
            <div>
                <ul>
                    <li>
                        <p className="title">Highest frequency: </p>
                        <p className="answer">{highestFreq}</p>
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
                                console.log("calc" , calculateFrequencyForWord(specifiedWord));
                            }}
                            placeholder="type word here"
                        ></input>
                        <p className="title"> has a frequency of</p>
                        <p className="answer">{specifiedWordFreq}</p>
                    </li>
                </ul>
            </div>
        </div>

    );
};
