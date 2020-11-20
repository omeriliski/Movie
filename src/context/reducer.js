function reducer(state,action){
    switch (action.type) {
        case "INCREASE_CURRENT_PAGE":
            state.currentPage=state.currentPage + 1;
            return {...state}
        
        case "DECREASE_CURRENT_PAGE":
            state.currentPage=state.currentPage - 1;
            return {...state}
        
        case "SET_ONE_CURRENT_PAGE":
            state.currentPage = 1;
            return {...state}    
        
        case "SET_CURRENT_PAGE":
            state.currentPage = action.payload.cPage;
            return {...state}    
            
            default:
                return state;
    }
}

export default reducer;