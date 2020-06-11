import { userService } from '../_services';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        userService.getAll()
            .then(
                orders => commit('getAllSuccess', orders),
                
            );
    },

   
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, orders) {
        state.all = { items: orders };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    
    
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};
