import { rest } from 'msw';

export const handlers = [rest.get('/user', null), rest.post('/login', null)];