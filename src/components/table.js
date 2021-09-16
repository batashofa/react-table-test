import React, {useEffect, useState} from 'react';
import "./table.css"
import {useDispatch, useSelector} from "react-redux";
import {sortData} from "../store/action";
import Pagination from "./pagination/pagination";

const Table = ({id}) => {

    const [page, setPage] = useState(1);
    const [reversed, setReversed] = useState(false);
    const data = useSelector((state) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        setPage(1)
    }, [data])

    const dataPerPage = (page) => {
        return data?.slice((page - 1) * 20, (page - 1) * 20 + 20);
    }

    const onClickSort = (e) => {
        setReversed(!reversed);
        if (e.target.className === "arrowUp") {
            e.target.className = "arrowDown"
        } else {
            e.target.parentNode.childNodes.forEach(item => item.className = "arrowDown");
            e.target.className = "arrowUp";
        }
        dispatch(sortData(e.target.id, reversed))
    }

    return (
        <>
            <table className="table">
                <tr onClick={onClickSort}
                >
                    <th id="id" className={"arrowDown"}>
                        id
                    </th>
                    <th id="firstName" className={"arrowDown"}>
                        First name
                    </th>
                    <th id="lastName" className={"arrowDown"}>
                        Last name
                    </th>
                    <th id="email" className={"arrowDown"}>
                        Email
                    </th>
                    <th id="phone" className={"arrowDown"}>
                        Phone
                    </th>
                    <th id="adress" className={"arrowDown"}>
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
