// mockLoginData.ts
export const validLoginInput = {
    email: 'test@example.com',
    password: '123456',
  };
  
  export const invalidEmailInput = {
    email: 'invalidemail',
    password: 'somepass',
  };
  
  export const shortPasswordInput = {
    email: 'test@example.com',
    password: '123',
  };
  
  export const loginSuccessResponse = {
    token: 'fake-token',
  };
  
  export const loginErrorResponse = new Error('Invalid credentials');
  