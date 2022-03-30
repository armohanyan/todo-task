import VuexPersistence from 'vuex-persist';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    todo: [],
    inProgress: [],
    done: []
  },
  actions: {
    setTask(context, newTask) {
      context.commit('addTasks', newTask);
    },
    deleteTask(context, deletedTask) {
      context.commit('deleteTask', deletedTask);
    },
    editTask(context, editedTask) {
      context.commit('editTask', editedTask);
    }
  },

  mutations: {
    addTasks(state, newTask) {
      state[newTask.status].push(newTask);
    },
    deleteTask(state, deletedTask) {
      state[deletedTask.status] = state[deletedTask.status].filter(i => i.id !== deletedTask.id);
    },
    editTask(state, data) {
      state[data.type] = state[data.type].filter(i => i.id !== data.taskForm.id)
      state[data.taskForm.status].push(data.taskForm);
    }
  },

  getters: {
    getToDoTasks: state => {
      return state.todo;
    },
    getInProgressTasks: state => {
      return state.inProgress;
    },
    getDoneTasks: state => {
      return state.done;
    }
  },
  plugins: [vuexLocal.plugin],
  module: {}
});
