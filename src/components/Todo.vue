<template>
    <div class='ui centered card'>

        <div class='content'  v-show="!isEditing">
            <div class='header'>{{ todo.title }}</div>
            <div class='meta'>{{ todo.project }}</div>
            <div class='extra content'>
                <span class='right floated edit icon' v-on:click="showForm">
                    <i class='edit icon'></i>
                </span>

                <span class='right floated trash icon' v-on:click="deleteTodo(todo)">
                    <i class='trash icon'></i>
                </span>

            </div>
        </div>

        <div class="content" v-show="isEditing">
            <div class='ui form'>
                <div class='field'>
                    <label>Title</label>
                    <input type='text' v-model="todo.title" >
                </div>
                <div class='field'>
                    <label>Project</label>
                    <input type='text' v-model="todo.project" >
                </div>
                <div class='ui two button attached buttons'>
                    <button class='ui red button' v-on:click="updateTodo(todo)">Update</button>
                    <button class='ui blue button' v-on:click="hideForm">Cancel</button>
                </div>
            </div>
        </div>

        <div class='ui bottom attached green basic button' v-show="!isEditing && todo.done">Completed</div>
        <div class='ui bottom attached red basic button' v-on:click="completeTodo(todo)" v-show="!isEditing && !todo.done">Complete</div>

    </div>
</template>

<script type="text/javascript">

import sweetalert from 'sweetalert'
import {db} from '../utils/firebase'

export default {
  props: ['todo'],
  data () {
    return {
      isEditing: false
    }
  },
  methods: {
    showForm () {
      this.isEditing = true
    },
    hideForm () {
      this.isEditing = false
    },
    deleteTodo (todo) {
      const vm = this
      sweetalert({title: 'Warning', text: 'You sure you want to delete?', showCancelButton: true}, function (isConfirm) {
        if (isConfirm) {
          db.ref(`todos/${todo.id}`).remove(function (err) {
            if (!err) {
              vm.$emit('delete-todo', todo)
            } else {
              console.log('Something went wrong!')
            }
          })
        }
      })
    },
    completeTodo (todo) {
      const vm = this
      db.ref(`todos/${todo.id}`).update({
        done: true,
        project: todo.project,
        title: todo.title}, function (err) {
        if (!err) {
          vm.$emit('complete-todo', todo)
          sweetalert('Success!', 'Todo Completed!', 'success')
        } else {
          console.log('Something went wrong...')
        }
      })
    },
    updateTodo (todo) {
      if (todo.title !== '' && todo.project !== '') {
        db.ref(`todos/${todo.id}`).update({
          done: todo.done,
          project: todo.project,
          title: todo.title}, function (err) {
          if (!err) {
            sweetalert('Success!', 'Todo Updated!', 'success')
          } else {
            console.log('Something went wrong...')
          }
        })
      }
      this.hideForm()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
