import { types } from '../constants/types';

export const authReducer = (state = {}, action ) => {
    switch ( action.type ) {
        
        case types.verify:
            return {
                ...action.payload
            }

        case types.login:
            return {
                ...action.payload,
                logged: true
            }

        case types.logout:
            return {
                logged: false
            }
    
        default:
            return state;
    }

}