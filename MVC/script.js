
/* 1. App 出始化时渲染出如下的用户列表 2. 并实现点击每个用户他对应的 priority 就自增
<ul id="userlist">
  <li>User Name: Peter, User Number: 123， User Priority: 1</li>
  <li>User Name: Glenn, User Number: 456, User Priority: 1</li>
  <li>User Name: Lucy, User Number: 789，User Priority: 1</li>
<ul> */
const users = [
  { name: 'Peter', num: 123, priority: 1 },
  { name: 'Glenn', num: 456, priority: 1 },
  { name: 'Lucy', num: 789, priority: 1 }
];

class UserModel {
  constructor() {
    this._data = users;
  }
  // todo
  addPriority (index) {
    this._data[index].priority++
  }
}

class UserView {
  constructor() {
    this.container = document.querySelector('#userlist');
  }

  render (users) {
    // todo

    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild)
    }
    users.forEach((user, index) => {
      const li = document.createElement('li')
      li.textContent = `User Name: ${user.name}, User Number: ${user.name}， User Priority: ${user.priority}`
      li.id = index
      this.container.append(li)
    });
  }
  bindClick (handler) {
    this.container.addEventListener('click', event => {
      console.log(event.target.id)
      if (event.target) {
        handler(event.target)
      }
    })
  }
}

class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindClick(this.bindEvent.bind(this))
  }

  init () {
    // todo
    this.view.render(this.model._data)
  }

  bindEvent (target) {
    // todo
    this.model.addPriority(target.id)
    this.init()
  }
}


const app = new UserController(new UserModel(), new UserView())
app.init();