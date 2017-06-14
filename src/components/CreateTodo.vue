<template>
    <div class='ui basic content center aligned segment'>
        <button class='ui basic button icon' v-on:click="openForm" v-show="!isCreating">
            <i class='plus icon'></i>
        </button>
        <div class='ui centered card' v-show="isCreating">
            <div class='content'>
            <div class='ui form'>
                <div class='field'>
                <label>Title</label>
                <input v-model="titleText" type='text'>
                </div>
                <div class='field'>
                <label>Project</label>
                <input v-model="projectText" type='text'>
                </div>
                <div class='ui two button attached buttons'>
                <button class='ui blue button' v-on:click="createTodo">Create</button>
                <button class='ui red button' v-on:click="closeForm">Cancel</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

import sweetalert from 'sweetalert'
import {db, fireTodo} from '../utils/firebase'

export default {
  data () {
    return {
      titleText: '',
      projectText: '',
      isCreating: false
    }
  },
  methods: {
    openForm () {
      this.isCreating = true
    },
    closeForm () {
      this.isCreating = false
    },
    createTodo () {
      const vm = this
      const id = fireTodo.push().key
      const title = this.titleText
      const project = this.projectText

      if (title.length > 0 && project.length > 0) {
        db.ref(`todos/${id}`).set({id, title, project, done: false}, function (err) {
          if (!err) {
            vm.$emit('create-todo', {
              id,
              title,
              project,
              done: false
            })
            vm.titleText = ''
            vm.projectText = ''
            vm.isCreating = false
            sweetalert('Success!', 'To-Do created!', 'success')
          } else {
            sweetalert('Something Wrong!', 'Please try again', 'warning')
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
