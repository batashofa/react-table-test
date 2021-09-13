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
                    <th id="firstName">
                        First name
                    </th>
                    <th id="lastName">
                        Last name
                    </th>
                    <th id="email">
                        Email
                    </th>
                    <th id="phone">
                        Phone
                    </th>
                    <th id="adress">
                        State
                    </th>
                </tr>
                {dataPerPage(page).map((item, index) =>
                    <tr className="tr-info" onClick={() => id(index + (page - 1) * 20)} key={index}>
                        <td>
                            {item.id}
                        </td>
                        <td>
                            {item.firstName}
                        </td>
                        <td>
                            {item.lastName}
                        </td>
                        <td>
                            {item.email}
                        </td>
                        <td>
                            {item.phone}
                        </td>
                        <td>
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
