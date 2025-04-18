describe('CRUD de usuários - ServeRest API', () => {
    
    let userId;

    it('Criar um novo usuário (POST)', () => {
        cy.fixture('usuario').then((user) => {
            cy.request({
              method: 'POST',
              url: 'https://serverest.dev/usuarios',
              body: user,
              failOnStatusCode: false 
            }).then((response) => {
              expect(response.status).to.eq(201);
              expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            });
          });
    });
});