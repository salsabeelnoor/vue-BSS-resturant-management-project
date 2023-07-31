export default {
    state: {
        showSpinner: false,   
    },
    mutations: {
        showSpinner(state){
            state.showSpinner = true
        },
        hideSpinner(state){
            state.showSpinner = false
        }
    },
}