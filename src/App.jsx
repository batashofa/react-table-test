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
    const states = [...new Set(stateData.reduce((arr, value)=>{
        arr = [...arr,value.adress.state];
        return arr;
    },[]))];

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = () => {
        fetch("https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json")
            .then((res) => res.json())
            .then((res) => {dispatch(getData(res)); setStateData(res)})
            .catch((error) => console.log(error));
    }
    const search = (e) => {
        const filteredData = stateData.filter((item)=> {
            return Object.values(item).toString().includes(e.target.value);
        })
        dispatch(getData(filteredData));
    }
    const searchByState = (e) => {
        const filteredData = stateData.filter((item)=> {
            return item.adress.state === e.target.value;
        })
        dispatch(getData(filteredData));
    }


    return (
        <div className="App">
            <h1>Table</h1>
            <form>
                <input placeholder="Search" onChange={search} />
                <select onChange={searchByState}>
                    {states.map((item)=> <option>{item}</option>)}
                </select>
            </form>


            <Table id={(index)=>setId(index)}/>
            <div className="info">
                <b>Profile info:</b>
                <div><span>Selected profile: </span>{data[id]?.firstName} {data[id]?.lastName}</div>
                <div><span>Desctiption: </span>{data[id]?.description}</div>
                <div><span>Address: </span>{data[id]?.adress.streetAddress} </div>
                <div><span>City: </span>{data[id]?.adress.city}</div>
                <div><span>State: </span>{data[id]?.adress.state}</div>
                <div><span>Index: </span>{data[id]?.adress.zip}</div>
            </div>
        </div>
    );
}

export default App;
