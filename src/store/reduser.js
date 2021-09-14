import {GET_DATA, SORT_DATA} from "./action";

const initialState = {
    data: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA: {
            return {data: action.payload};
        }
        case SORT_DATA: {
            const data = [...state.data];
            data.sort((a, b) => {
                if (a[action.field] > b[action.field] || a[action.field].state > b[action.field].state) {
                    return action.reversed ? -1 : 1;
                }
                if (a[action.field] < b[action.field] || a[action.field].state < b[action.field].state) {
                    return action.reversed ? 1 : -1;
                }
                return 0;
            })
            return {
                data: data
            };
        }
        default:
            return state;
    }
};

export default reducer;