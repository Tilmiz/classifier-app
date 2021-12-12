import { FC, useState } from "react"
import CodeBlock from "./code-block"

interface HomePageProps {

}

const HomePage: FC<HomePageProps> = (props) => {

    const [selectedDataType, setSelectedDataType] = useState<"ARRAY" | "TREE" | "MATRIX">("ARRAY");
    const [dataSize, setDataSize] = useState(10000);
    const [samplingSize, setSamplingSize] = useState(100);

    const handleRadioButtonClick = (e: any) => {
        setSelectedDataType(e.target.value);
    }

    return (
        <div style={{
            backgroundColor: "lightgray",
            padding: 20,
            marginTop: 20,
            marginRight: 300,
            marginLeft: 300,
            textAlign: "center",
            borderRadius: 20
        }}>
            <h1 style={{ textAlign: "center" }}>Runtime Complexity Classifier Application</h1>

            <p>Select a data type</p>
            <div>
                <input type="radio" id="array" name="data_type" onClick={(e) => handleRadioButtonClick(e)} value="ARRAY" checked={(selectedDataType == "ARRAY") ? true : false} />
                <label>Array</label>
                <input type="radio" id="tree" name="data_type" onClick={(e) => handleRadioButtonClick(e)} value="TREE" checked={(selectedDataType == "TREE") ? true : false} />
                <label >Tree</label>
                <input type="radio" id="Matrix" name="data_type" onClick={(e) => handleRadioButtonClick(e)} value="MATRIX" checked={(selectedDataType == "MATRIX") ? true : false} />
                <label >Matrix</label>
            </div>

            <div>
                <input onChange={(e) => setDataSize(parseInt(e.target.value))} />
                <label>Data Size</label>
                <input onChange={(e) => setSamplingSize(parseInt(e.target.value))} />
                <label>Sampling Size</label>
            </div>

            <CodeBlock
                dataType={selectedDataType}
                dataSize={dataSize}
                samplingSize={samplingSize}
            />
            <p>Developed by Firdevs Oren, Kubra Fettahoglu, and Amin Lastname</p>
        </div>
    );
}

export default HomePage;