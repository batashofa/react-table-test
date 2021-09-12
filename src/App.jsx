import './App.css';
import Table from "./components/table";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getData} from "./store/action";


function App() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.data);
    const [id, setId] = useState(0);

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = () => {
        fetch("https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json")
            .then((res) => res.json())
            .then((res) => dispatch(getData(res)))
            .catch((error) => console.log(error));
    }

    return (
        <div className="App">
            <Table id={(index)=>setId(index)}/>
            <div><span>Selected profile: </span>{data[id].firstName} {data[id].lastName}</div>
        </div>
    );
}

export default App;