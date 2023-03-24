import axios from 'axios';

const user = {
  namespaced: true,
  state: () => ({
    profile: null,
  }),
  mutations: {
    profile(state: any, payload: any) {
      state.profile = payload;
    },

    logout(state: any) {
      state.profile = null;
    },
  },
  actions: {
    async profile({ commit }: any) {
      const user = await axios.get('/api/user/profile');
      commit('profile', user);
    },
  },
  getters: {},
};

export default user;
