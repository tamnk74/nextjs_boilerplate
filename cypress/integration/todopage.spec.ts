import { setupWorker, SetupWorkerApi } from 'msw';
import { todoHandlers } from '../mocks';

let worker: SetupWorkerApi;

describe('Todo page', () => {
  before(async () => {
    worker = setupWorker(...todoHandlers);
    await worker.start();
  });

  beforeEach(() => {
    cy.visit('http://localhost:4200/to-do');
  });
  it('Create new to do', () => {
    cy.visit('http://localhost:4200/to-do');
    const todoName = `to do test ${Date.now()}`;

    cy.get('#name_ip').type(todoName).should('have.value', todoName).type('{enter}');
    cy.get('#to-do-list').find('.list-group-item:last').should('contain', todoName);
  });
});
