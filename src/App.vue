<template>
  <div id="app">
  <div class="ui main container">
    <p>Completed Tasks: {{ todos.filter(todo => {return todo.done === true}).length }}</p>
    <p>Pending Tasks: {{ todos.filter(todo => {return todo.done === false}).length }}</p>

    <create-todo v-on:create-todo="createTodo"></create-todo>
    <todo-list v-bind:todos="todos"></todo-list>
  </div>
  </div>
</template>

<script>

import TodoList from './components/TodoList'
import CreateTodo from './components/CreateTodo'
import {fireTodo} from './utils/firebase'

export default {
  name: 'app',
  components: {
    TodoList,
    CreateTodo
  },
  data () {
    return {
      todos: []
    }
  },
  methods: {
    fetchTodos: function () {
      const vm = this
      fireTodo.once('value').then(snapshot => {
        const data = snapshot.val() ? snapshot.val() : {}
        Object.keys(data).map((d, i) => {
          vm.$set(vm.todos, i, {
            id: d,
            done: data[d].done,
            project: data[d].project,
            title: data[d].title})
        })
      })
    },
    createTodo (newTodo) {
      this.todos.push(newTodo)
    }
  },
  mounted: function () {
    this.fetchTodos()
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 30px 0 60px;
}
</style>
