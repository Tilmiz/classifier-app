import { ChangeEvent, FC } from "react";
import * as ts from "typescript";
import generator from "../source-codes/generate-data";

interface CodeBlockProps {

}

const CodeBlock: FC<CodeBlockProps> = (props) => {

    const handleClick = () => {
        let myVar = new Function(generator); 
        //myVar.call()
        let aa = generator;
        eval("console.log(aa);");
    }

    const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {        
        console.log("Change",e.target.value);
    }

    return(
        <>
            <input type="text" onChange = {(e)=> handleTextInputChange(e) } />
            <button onClick={()=> handleClick()}> Evaluate </button>
        </>
    );
}

export default CodeBlock;