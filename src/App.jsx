import './App.css';
import Table from "./components/table";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getData} from "./store/action";


function App() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.data);
    const [id, setId] = useState(0);
    const [stateData, setStateData] = useState([]);
    const states = [...new Set(stateData.reduce((arr, value) => {
        arr = [...arr, value.adress.state];
        return arr;
    }, []))];

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = () => {
        fetch("https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json")
            .then((res) => res.json())
            .then((res) => {
                dispatch(getData(res));
                setStateData(res)
            })
            .catch((error) => console.log(error));
    }
    const search = (e) => {
        const filteredData = stateData.filter((item) => {
            return Object.values(item).toString().includes(e.target.value);
        })
        dispatch(getData(filteredData));
    }
    const searchByState = (e) => {
        const filteredData = stateData.filter((item) => {
            return item.adress.state === e.target.value;
        })
        dispatch(getData(filteredData));
    }


    return (
        <div className="App">
            <h1 className="heading">Table</h1>
            <div className="form">
                <input className="form__search" placeholder="Search" onChange={search}/>
                <select className="form__filter" onChange={searchByState}>
                    {states.map((item) => <option>{item}</option>)}
                </select>
            </div>
            <Table id={(index) => setId(index)}/>
            <div className="info__wrapper">
                <div className="info">
                    <b className="info__title">Profile info:</b>
                    <div className="info__text">
                        <span>Selected profile: </span>{data[id]?.firstName} {data[id]?.lastName}</div>
                    <div className="info__text"><span>Desctiption: </span>{data[id]?.description}</div>
                    <div className="info__text"><span>Address: </span>{data[id]?.adress.streetAddress} </div>
                    <div className="info__text"><span>City: </span>{data[id]?.adress.city}</div>
                    <div className="info__text"><span>State: </span>{data[id]?.adress.state}</div>
                    <div className="info__text"><span>Index: </span>{data[id]?.adress.zip}</div>
                </div>
            </div>
        </div>
    );
}

export default App;
