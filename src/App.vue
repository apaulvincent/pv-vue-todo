<template>
  <div id="app">
    <p>Completed Tasks: {{ todos.filter(todo => {return todo.done === true}).length }}</p>
    <p>Pending Tasks: {{ todos.filter(todo => {return todo.done === false}).length }}</p>

    <create-todo v-on:create-todo="createTodo"/>
    <todo-list v-bind:todos="todos"></todo-list>
  </div>
</template>

<script>

import sweetalert from 'sweetalert'
import TodoList from './components/TodoList'
import CreateTodo from './components/CreateTodo'
import {db, fireTodo} from './utils/firebase'

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
      const vm = this
      db.ref(`todos/${fireTodo.push().key}`).set(newTodo, function (err) {
        if (!err) {
          vm.todos.push(newTodo)
          sweetalert('Success!', 'To-Do created!', 'success')
        } else {
          sweetalert('Something Wrong!', 'Please try again', 'warning')
        }
      })
    }
  },
  mounted: function () {
    this.fetchTodos()
  }
}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
