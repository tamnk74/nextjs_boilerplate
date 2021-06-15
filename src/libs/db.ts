import { Todo } from 'models';

export class DB {
  private toDo: Todo[];

  constructor() {
    this.toDo = [
      {
        name: 'Leaning Next Js',
        status: 1
      },
      {
        name: 'Leaning Nest Js',
        status: 2
      },
      {
        name: 'Leaning CI-CD',
        status: 0
      },
      {
        name: 'Leaning Testing',
        status: 0
      }
    ] as Todo[];
  }

  getTodo(): Todo[] {
    return this.toDo;
  }
}

const db = new DB();

export default db;
