import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public todolist: ToDo[] = [];
  public title: String = 'Minhas tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })

    this.loadTasks();
  }

  cleanInput() {
    this.form.reset();
  }

  addTask() {
    const title = this.form.controls['title'].value;
    const id = this.todolist.length + 1;
    this.todolist.push(new ToDo(id, title, false));
    this.saveTasks();
    this.cleanInput();
    this.loadTasks();
  }


  remove(todo: ToDo) {
    const index = this.todolist.indexOf(todo);
    if(index != -1){
      this.todolist.splice(index, 1);
    }
    this.saveTasks();
  }

  markAsDone(todo: ToDo) {
    todo.done = true;
    this.saveTasks();
  }

  markAsUndone(todo: ToDo) {
    todo.done = false;
    this.saveTasks();
  }

  saveTasks() {
    const data = JSON.stringify(this.todolist);
    localStorage.setItem('todolist', data);
    this.mode = 'list';
  }

  loadTasks() {
    this.todolist = JSON.parse(localStorage.getItem('todolist') || '{}');
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
