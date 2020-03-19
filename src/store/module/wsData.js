export default {
    state: {
        wsValue: {},
        wsTreeDatas: {},
    },
    getters: {
        wsValue: state => {
            return state.wsValue;
        },
        wsTreeDatas: state =>{
            return state.wsTreeDatas
        }
    },
    mutations: {
        updateValue(state, payload) {
            state.wsValue = payload;
            console.log(state.wsValue)
        },
        updateTreeDatas(state, payload){
            state.wsTreeDatas = payload
            console.log(state.wsTreeDatas)

        }
    },
    actions: {
        // myupdateValue({commit}, payload) {
        //     commit('updateValue', payload);
        // }
    }
};