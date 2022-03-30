<template>
  <div class="add-task-modal">
    <b-modal
        ref="add-task-modal"
        id="modal-1"
        @ok="onSubmit"
        ok-title="submit"
        ok-only
    >
      <div>
        <b-form-group class="mt-2" label="title" label-for="input-1">
          <b-form-input
              id="input-1"
              v-model.trim="$v.form.title.$model"
              :state="validateState('title')"
              type="text"
              placeholder="Enter title"
          ></b-form-input>
          <span v-if="!$v.form.title.minLength" class="text-danger">
            Must be at least 6 characters
          </span>
        </b-form-group>

        <b-form-group id="input-group-2" label="description" label-for="input-2" class="mt-2">
          <b-form-input
              id="input-2"
              v-model="form.description"
              placeholder="Enter description"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="priority" label-for="input-3" class="mt-2">
          <b-form-select
              id="input-3"
              v-model="form.priority"
              :options="priorities"
          ></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-4" label="status" label-for="input-4" class="mt-2">
          <b-form-select
              id="input-4"
              :options="statuses"
              v-model="form.status"
          ></b-form-select>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  name: 'CreateTask',
  data() {
    return {
      form: {
        title: '',
        description: '',
        priority: 'low',
        status: 'todo'
      },
      priorities: [
        { text: 'low', value: 'low' },
        { text: 'normal', value: 'normal' },
        { text: 'high', value: 'high' }
      ],
      statuses: [
        { text: 'to do', value: 'todo' },
        { text: 'in progress', value: 'inProgress' },
        { text: 'done', value: 'done' }
      ],
      isForEdit: false
    };
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(5)
      }
    }
  },
  mounted() {
    this.$bus.$on('addTask', () => {
      this.showModal();
      this.isForEdit = false;
    });
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    showModal() {
      this.$bvModal.show('modal-1');
    },
    onSubmit(event) {
      event.preventDefault();

      if(this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      this.isForEdit ? this.editTask() : this.createTask();
    },
    createTask() {
      this.$store.dispatch('setTask', {
        id: Date.now(),
        title: this.form.title,
        description: this.form.description,
        priority: this.form.priority,
        status: this.form.status
      });

      this.$nextTick(() => {
        this.$bvModal.hide('modal-1');
        this.onReset();
      });
    },
    setEditedTask(task) {
      task.type = task.status;
      this.isForEdit = true;

      this.showModal();
      Object.assign(this.form, task);
    },
    editTask() {
      this.$store.dispatch('editTask', {
        taskForm: {
          id: this.form.id,
          title: this.form.title,
          description: this.form.description,
          priority: this.form.priority,
          status: this.form.status,
        },
        type: this.form.type
      });

      this.$nextTick(() => {
        this.$bvModal.hide('modal-1');
        this.onReset();
      });
    },
    onReset() {
      this.form.title = '';
      this.form.description = '';
      this.form.isDone = false;
      this.form.priority = 'low';
    }
  }
};
</script>
