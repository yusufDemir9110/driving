import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default function scoreReducer(state=initialState.score,action){
    switch(action.type){
        case actionTypes.CHANGE_SCORE:
            return action.payload
        default:
            return state
    }
}