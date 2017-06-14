<template>
  <div class="ui four doubling stackable cards">

    <todo v-for="todo in todos" v-bind:todo="todo" v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" :key="todo.id" :todo.sync="todo"/>

  </div>
</template>

<script type="text/javascript">

import Todo from './Todo'

export default {
  props: ['todos'],
  components: {
    Todo
  },
  methods: {
    deleteTodo (todo) {
      const todoIndex = this.todos.indexOf(todo)
      this.todos.splice(todoIndex, 1)
    },
    completeTodo (todo) {
      const todoIndex = this.todos.indexOf(todo)
      this.todos[todoIndex].done = true
    }
  },
  created: function () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
