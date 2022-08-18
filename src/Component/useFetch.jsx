import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

const initialState = {
    loading: false,
    data: [],
    error: null
}
const ACTION = {
    API_REQUEST: 'api_request',
    FETCH_REQUEST: 'fetch-request',
    ERROR: 'error'
}

function reducer(state, { type, payload }) {

    switch (type) {

        case ACTION.API_REQUEST: return {
            ...state,
            loading: true
        };
        case ACTION.FETCH_REQUEST: return {
            ...state,
            data: payload,
            loading: false
        };
        case ACTION.ERROR: {
           
            return {
                ...state,
                loading: false,
                error: payload
            }
        };
        default: return {
            ...state,
            loading: true
        };
    }

}

const UseFetch = (BASE_URL) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({ type: 'api_request' })
        axios.get(BASE_URL).then(data => {
            dispatch({
                type: 'fetch-request',
                payload: data?.data?.data
            })
        }).catch(err => {
            dispatch({
                type: 'error',
                payload: err.message
            })
        })
    }, [BASE_URL])
    return state
}

export default UseFetch