import { createStore } from 'vuex';

import user from './user';

const store = createStore({
  modules: {
    user,
  },
  state: () => ({}),
  mutations: {},
});

export default store;
