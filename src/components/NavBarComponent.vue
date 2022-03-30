<template>
  <div>
    <b-navbar class="pl-3 justify-content-center" type="dark" variant="dark">
      <b-navbar-nav>
        <b-button @click="addTask()">Add task</b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBarComponent',
  methods: {
    addTask(){
      this.$bus.$emit('addTask')
    }
  }
};
</script>

<style scoped>

</style>
