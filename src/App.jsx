import './App.css';
import Table from "./components/table";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { getData} from "./store/action";


function App() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.data);
    const [id, setId] = useState(0);
    const [stateData, setStateData] = useState([]);
    const states = [...new Set(data.reduce((arr, value)=>{
        arr = [...arr,value.adress.state];
        return arr;
    },[]))];

    useEffect(() => {
        getUserData()
    }, [])

    console.log(states)

    const getUserData = () => {
        fetch("https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json")
            .then((res) => res.json())
            .then((res) => {dispatch(getData(res)); setStateData(res)})
            .catch((error) => console.log(error));
    }
    const search = (e) => {
        const filteredData = stateData.filter((item)=> Object.values(item).toString().includes(e.target.value))
        dispatch(getData(filteredData));

    }

    return (
        <div className="App">
            <input onChange={search}/>
            <select>
                {states.map((item)=> <option>{item}</option>)}

            </select>
            <Table id={(index)=>setId(index)}/>
            <div><span>Selected profile: </span>{data[id]?.firstName} {data[id]?.lastName}</div>
        </div>
    );
}

export default App;
