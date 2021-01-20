import React, { useState } from 'react';
import './index.scss';
import {useForm, FormProvider, get} from 'react-hook-form';
import {Button} from "../button";
import {ButtonWrapper} from "../buttonWrapper";


export const WordCount = ({}) => {
    const { register, reset, handleSubmit } = useForm();
    const [ highestFreq, setHighestFreq ] = useState(0);
    const [ mostFreqNWords, setMostFreqNWords ] = useState("0");

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
        if (keys.includes(word)) {
            let index = keys.indexOf(word);
            return values[index];
        }
    }

    return (
        <div>
            <form className="word-count" onSubmit={handleSubmit(onSucces)}>
                <textarea
                    name="textInput"
                    placeholder="Type your text here ... "
                    rows="20"
                    cols="60"
                    ref={register}
                ></textarea>
                <ButtonWrapper>
                    <Button>Submit</Button>
                    {/*<Button>Use Demo Text</Button>*/}
                    {/*<Button>Reset</Button>*/}
                </ButtonWrapper>
            </form>
            <div>
                <ul>
                    <li>
                        <p className="title">Higest frequency: </p>
                        <p className="answer">{highestFreq}</p>
                    </li>
                    <li>
                        <p className="title">Most frequent N words: </p>
                        <p className="answer">{mostFreqNWords} </p>
                    </li>
                    <li>
                        {/*<p className="title">The word</p>*/}
                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    id="specified-word"*/}
                        {/*    name="specified-word"*/}
                        {/*    value={specifiedWord}*/}
                        {/*    onChange={(e) => setSpecifiedWord(e.target.value)}*/}
                        {/*    placeholder="type here"*/}
                        {/*></input>*/}
                        {/*<p className="title"> has a frequency of</p>*/}
                        {/*<p className="answer">{specifiedWord}</p>*/}
                    </li>
                </ul>
            </div>
        </div>

    );
};
