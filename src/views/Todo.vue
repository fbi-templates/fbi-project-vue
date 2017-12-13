<template>
  <div class="todo">
    <section class="todoapp" v-cloak>
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
      </header>
      <section class="main" v-show="todos.length">
        <input class="toggle-all" type="checkbox" v-model="allDone">
        <ul class="todo-list">
          <li class="todo" v-for="(todo, index) in filteredTodos" :class="{completed: todo.completed, editing: todo == editedTodo}" :key="index">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed">
              <label @dblclick="editTodo(todo)">{{todo.title}}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length" :style="{'height': '41px'}">
        <span class="todo-count">
          <strong v-text="remaining"></strong> {{pluralize('item', remaining)}} left
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{selected: visibility == 'all'}">All</a>
          </li>
          <li>
            <a href="#/active" :class="{selected: visibility == 'active'}">Active</a>
          </li>
          <li>
            <a href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a>
          </li>
        </ul>
        <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
          Clear completed
        </button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Written by
        <a href="http://evanyou.me">Evan You</a>
      </p>
      <p>Part of
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  </div>
</template>

<script>
	var STORAGE_KEY = 'todos-vuejs'
var filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}

var todoStorage = {
  fetch: function () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default {
  data() {
    return {
      todos: todoStorage.fetch(),
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    }
  },
  // watch todos change for localStorage persistence
  watch: {
    todos: {
      deep: true,
      handler: todoStorage.save
    }
  },

  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos)
    },
    remaining: function () {
      return filters.active(this.todos).length
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value
        })
      }
    }
  },
  methods: {
    pluralize: function (word, count) {
      return word + (count === 1 ? '' : 's')
    },
    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({ id: this.todos.length + 1, title: value, completed: false })
      this.newTodo = ''
    },
    removeTodo: function (todo) {
      var index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
    },
    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },
    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },
    cancelEdit: function (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },
    removeCompleted: function () {
      this.todos = filters.active(this.todos)
    }
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>

<style>
@import '../static/css/todomvc-common.css';
@import '../static/css/todomvc-app.css';
</style>

