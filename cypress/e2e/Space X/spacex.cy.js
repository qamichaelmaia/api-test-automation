describe('SpaceX API Tests', () => {
    const base_url = Cypress.env('base_url') || 'https://api.spacexdata.com/v4';
    const mock_server = Cypress.env('mock_server') || 'https://097b719c-3cd8-43b6-ab43-15ea64625ba1.mock.pstmn.io';
    
    it('Último Lançamento', () => {
      cy.request({
        method: 'GET',
        url: `${base_url}/launches/latest`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
      });
    });
  
    it('Próximos lançamentos', () => {
      cy.request({
        method: 'GET',
        url: `${base_url}/launches/upcoming`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    it('Astronautas da SpaceX', () => {
      cy.request({
        method: 'GET',
        url: `${base_url}/crew/`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  });
  