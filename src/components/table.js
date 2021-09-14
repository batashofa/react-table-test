import React, {useState} from 'react';
import "./table.css"
import {useDispatch, useSelector} from "react-redux";
import {sortData} from "../store/action";
import Pagination from "./pagination/pagination";

const Table = ({id}) => {

    const [page, setPage] = useState(1);
    const [reversed, setReversed] = useState(false);
    const data = useSelector((state) => state.data);
    const dispatch = useDispatch()


    const dataPerPage = (page) => {
        return data?.slice((page - 1) * 20, (page - 1) * 20 + 20);
    }

    return (
        <>
            <table className="table">
                <tr onClick={(e) => {
                    setReversed(!reversed);
                    dispatch(sortData(e.target.id, reversed))
                }
                }
                >
                    <th id="id" className={!reversed ? "arrowDown" : "arrowUp"}>
                        id
                    </th>
                    <th id="firstName" className={!reversed ? "arrowDown" : "arrowUp"}>
                        First name
                    </th>
                    <th id="lastName" className={!reversed ? "arrowDown" : "arrowUp"}>
                        Last name
                    </th>
                    <th id="email" className={!reversed ? "arrowDown" : "arrowUp"}>
                        Email
                    </th>
                    <th id="phone" className={!reversed ? "arrowDown" : "arrowUp"}>
                        Phone
                    </th>
                    <th id="adress" className={!reversed ? "arrowDown" : "arrowUp"}>
                        State
                    </th>
                </tr>
                {dataPerPage(page).map((item, index) =>
                    <tr className="tr-info" onClick={() => id(index + (page - 1) * 20)} key={index}>
                        <td className="td-info">
                            {item.id}
                        </td>
                        <td className="td-info">
                            {item.firstName}
                        </td>
                        <td className="td-info">
                            {item.lastName}
                        </td>
                        <td className="td-info">
                            {item.email}
                        </td>
                        <td className="td-info">
                            {item.phone}
                        </td>
                        <td className="td-info">
                            {item.adress.state}
                        </td>
                    </tr>
                )}
            </table>
            <Pagination
                currentPage={(page) => setPage(page)}
                numOfElements={data.length}
                elementsPerPage={20}
            />
        </>
    );
}

export default Table;
