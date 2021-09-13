export const GET_DATA = "GET_DATA";
export const SORT_DATA = "SORT_DATA";

export const getData = (payload) => ({
    type: GET_DATA,
    payload: payload
});

export const sortData = (field, reversed) => ({
    type: SORT_DATA,
    field: field,
    reversed
});



