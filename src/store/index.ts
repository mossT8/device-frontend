import { createStore } from 'vuex';
import { User } from '@/types/user';

interface State {
  users: User[];
  searchQuery: string;
}

export default createStore({
  state: (): State => ({
    users: [
      {
        id: 1,
        name: 'John Doe',
        email: 'tannar.moss@gmail.com',
        role: 'Admin',
      },
      {
        id: 2,
        name: 'John Doe',
        email: 'tannar.moss@gmail.com',
        role: 'Admin',
      },
    ],
    searchQuery: '',
  }),
  getters: {
    filteredUsers: (state) => {
      const query = state.searchQuery.toLowerCase();
      return state.users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
      );
    },
  },
  mutations: {
    addUser(state, user: User) {
      state.users.push(user);
    },
    updateUser(state, updatedUser: User) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    deleteUser(state, userId: number) {
      state.users = state.users.filter((user) => user.id !== userId);
    },
    setSearchQuery(state, query: string) {
      state.searchQuery = query;
    },
  },
  actions: {
    addUser({ commit, state }, user: Omit<User, 'id'>) {
      const newUser = {
        ...user,
        id: state.users.length + 1,
      };
      commit('addUser', newUser);
    },
    updateUser({ commit }, user: User) {
      commit('updateUser', user);
    },
    deleteUser({ commit }, userId: number) {
      commit('deleteUser', userId);
    },
    setSearchQuery({ commit }, query: string) {
      commit('setSearchQuery', query);
    },
  },
});
