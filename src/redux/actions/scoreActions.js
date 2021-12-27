import * as actionTypes from './actionTypes'

export const handleScoreChange=(payload)=>({
    type:actionTypes.CHANGE_SCORE,
    payload:payload
})