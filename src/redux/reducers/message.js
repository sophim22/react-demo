import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/action-types";

const initialState = {};


/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action){
    const { type, payload} = action;

    switch (type) {
        case SET_MESSAGE:
            return { message: payload};

        case CLEAR_MESSAGE:
            return { message: ""};

        default:
            return state;
    }
}