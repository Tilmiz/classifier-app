import { ChangeEvent, FC, useState } from "react";
import * as ts from "typescript";
import generator from "../source-codes/generate-data";
//@ts-ignore
import regression from 'regression';

interface CodeBlockProps {
    dataType: "ARRAY" | "TREE" | "MATRIX",
    dataSize: number,
    samplingSize: number,
}

const CodeBlock: FC<CodeBlockProps> = (props) => {

    const [inputCode, setInputCode] = useState("");
    const [isResultReady, setResultReady] = useState(false);
    const [results, setResults] = useState<{
        linear: any,
        exponential: any,
        logarithmic: any,
    }>();

    const handleClick = () => {
        let data: number[][] = [];
        evalFunction(data);
        evaluateResult(data);
        setResultReady(true)
    }

    const evaluateResult = (data: any) => {
        console.log("Final Data: ", data);

        const linear = regression.linear(data);
        console.log("Linear: ", linear);

        //const exponential = regression.exponential([[1, 1], [2, 3], [3, 6], [4, 8], [5, 20], [6, 40], [7, 60], [8, 130]]);
        const exponential = regression.exponential(data);
        console.log("Exponential: ", exponential);

        const logarithmic = regression.logarithmic(data);
        console.log("Logarithmic: ", logarithmic);

        setResults({
            linear: linear,
            exponential: exponential,
            logarithmic: logarithmic,
        })
    }

    const evalFunction = (data: number[][]) => {

        console.log(Date.now());

        let arrayData: number[] = [];

        for (let index = 1; index < props.samplingSize; index++) {

            let size = props.dataSize * index;

            generateLinearData(arrayData, size);

            let startTime = Date.now();
            switch (props.dataType) {
                case "ARRAY":
                    inputMethodArray(arrayData);
                    break;
                case "TREE":
                    break;
                case "MATRIX":
                    break;
            }

            let endTime = Date.now();

            let timeElapsed = endTime - startTime;

            let dataPoint = [];
            dataPoint.push(index);
            dataPoint.push(timeElapsed);

            data.push(dataPoint);
        }
    }

    const generateLinearData = (arrayData: number[], size: number) => {
        for (let index = 0; index < size; index++) {
            arrayData.push(Math.random() * size);
        }
    }

    const inputMethodArray = (arrayData: number[]) => {
        eval(inputCode);
    }

    const handleTextInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputCode(e.target.value);
    }

    const displayResults = () => {

        let maxR2 = results?.linear.r2;
        let type = "LINEAR"

        if(maxR2 < results?.exponential.r2) {
            maxR2 = results?.exponential.r2;
            type = "EXPONENTIAL"
        }

        if(maxR2 < results?.logarithmic.r2) {
           maxR2 = results?.logarithmic.r2;
           type = "LOGARITHMIC";
        } 

        return (
            <>
            <div>
                <p>Linear result: {results?.linear.r2}</p>
                <p>Exponential result: {results?.exponential.r2}</p>
                <p>Logarithmic result: {results?.logarithmic.r2}</p>
            </div>
            <div>
                Based on the R SQUARE evaluation, time complexity is more likely a <strong style={{color: "red"}}>{type}</strong> 
            </div>
            </>
        )
    }

    return (
        <>
            <div style={{
                marginTop: 20,
                borderTop: "1px solid black",
                paddingTop: 20
            }}>
                <textarea onChange={(e) => handleTextInputChange(e)} style={{
                    width: 600,
                    minHeight: 400
                }}></textarea>
                <p><button onClick={() => handleClick()}> Evaluate </button></p>

            </div>

            {isResultReady && displayResults()}

        </>
    );
}

export default CodeBlock;