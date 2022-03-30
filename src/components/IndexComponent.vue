<template>
  <b-container>
    <create-task ref="childComponent"/>
    <div class="mt-3">
      <b-row>
        <b-col>
          <div>
            <div class="text-center"><h3>To Do</h3></div>
            <b-table
                striped
                hover
                :items="todoTasks"
                :fields="fields"
                dark
            >
              <template #cell(remove)="data">
                <b-button variant="danger" @click="deleteTask(data.item)">
                  delete
                </b-button>
              </template>
              <template #cell(edit)="data">
                <b-button variant="primary" @click="editedTask(data.item)">
                  edit
                </b-button>
              </template>
            </b-table>
          </div>
        </b-col>
        <b-col>
          <div>
            <div class="text-center"><h3>In Progress</h3></div>
            <b-table
                striped
                hover
                :items="inProgressTasks"
                :fields="fields"
                dark
            >
              <template #cell(remove)="data">
                <b-button variant="danger" @click="deleteTask(data.item)">
                  delete
                </b-button>
              </template>
              <template #cell(edit)="data">
                <b-button variant="primary" @click="editedTask(data.item)">
                  edit
                </b-button>
              </template>
            </b-table>
            </div>
        </b-col>
        <b-col class="mt-5">
          <div>
            <div class="text-center"><h3>Done</h3></div>
            <b-table
                striped
                hover
                :items="doneTasks"
                :fields="fields"
                dark
            >
              <template #cell(remove)="data">
                <b-button variant="danger" @click="deleteTask(data.item)">
                  delete
                </b-button>
              </template>
              <template #cell(edit)="data">
                <b-button variant="primary" @click="editedTask(data.item)">
                  edit
                </b-button>
              </template>
            </b-table>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import CreateTask from '@/components/CreateTask';

export default {
  name: 'IndexComponent',
  components: { CreateTask },
  data() {
    return {
      fields: ['title', 'description', 'priority', 'remove', 'edit']
    };
  },
  computed: {
    todoTasks() {
      return this.$store.getters.getToDoTasks;
    },
    inProgressTasks() {
      return this.$store.getters.getInProgressTasks;
    },
    doneTasks() {
      return this.$store.getters.getDoneTasks;
    }
  },
  mounted() {},
  methods: {
    deleteTask(task) {
      this.$store.dispatch('deleteTask', task);
    },
    editedTask(data) {
      this.$refs.childComponent.setEditedTask(data);
    }
  }
};
</script>

<style scoped>
</style>
