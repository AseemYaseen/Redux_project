import {GET_ADMIN} from '../actions/types';

const initialState = {
    user:'',
    loading:true,
    error:''
}

export default function login (state = initialState, action){
    switch(action.type){
        case GET_ADMIN:
            if(action.payload !== ''){
                return{...state,
                    user:action.payload,
                    loading:false,}
            }else{
                return{
                    ...state,
                    error:'Wrong Email or Password !',
                    loading:false,
                }
            }
            case 'logout':
                return{...state,
                    user:'',
                    error: '',
                }
        default: return state
    }
}