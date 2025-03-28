describe('Weather API Tests', () => {
    
    const cidade = 'Jacobina';  // Nome da cidade
    const apiKey = '783267ed4b16a5f5424e62d6dcdaa28c'; // API Key centralizada
    
    beforeEach(() => {
       
    });

    it('Deve retornar previsão em tempo real', () => {
        cy.log(cidade);
        cy.request({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/forecast',
            qs: { 
                q: cidade,
                appid: apiKey, 
                lang: 'pt_br' 
            }
        }).then((response) => {
            const tempCelsius = (response.body.list[0].main.temp - 273.15).toFixed(2);
            const tempMinCelsius = (response.body.list[0].main.temp_min - 273.15).toFixed(2);
            const tempMaxCelsius = (response.body.list[0].main.temp_max - 273.15).toFixed(2);
            const windSpeedKmh = (response.body.list[0].wind.speed * 3.6).toFixed(2);

            function getWindDirection(degrees) {
                if (degrees >= 0 && degrees < 45) {
                    return 'Norte (N)';
                } else if (degrees >= 45 && degrees < 90) {
                    return 'Nordeste (NE)';
                } else if (degrees >= 90 && degrees < 135) {
                    return 'Leste (L)';
                } else if (degrees >= 135 && degrees < 180) {
                    return 'Sudeste (SE)';
                } else if (degrees >= 180 && degrees < 225) {
                    return 'Sul (S)';
                } else if (degrees >= 225 && degrees < 270) {
                    return 'Sudoeste (SW)';
                } else if (degrees >= 270 && degrees < 315) {
                    return 'Oeste (O)';
                } else if (degrees >= 315 && degrees < 360) {
                    return 'Nordeste (NE)';
                }
                return 'Direção desconhecida';
            }

            cy.log('Temperatura Atual: ' + tempCelsius + '°C');
            cy.log('Temperatura Mínima: ' + tempMinCelsius + '°C');
            cy.log('Temperatura Máxima: ' + tempMaxCelsius + '°C');
            cy.log('Umidade: ' + response.body.list[0].main.humidity + '%');
            cy.log('Descrição do Clima: ' + response.body.list[0].weather[0].description);
            cy.log('Cobertura de Nuvens: ' + response.body.list[0].clouds.all + '%');
            cy.log('Velocidade do Vento: ' + windSpeedKmh + ' km/h');
            const windDirection = getWindDirection(response.body.list[0].wind.deg);
            cy.log('Direção do Vento: ' + windDirection);
            cy.log('Pressão Atmosférica: ' + response.body.list[0].main.pressure + ' hPa');
            cy.log('Visibilidade: ' + response.body.list[0].visibility + ' metros.');
        });
    });

    it('Deve retornar dados sobre poluição do ar', () => {
        cy.log(cidade);
        cy.request({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather',
            qs: {
                q: cidade,
                appid: apiKey,
                lang: 'pt_br'
            }
        }).then((response) => {
            const lat = response.body.coord.lat;
            const lon = response.body.coord.lon;

            cy.request({
                method: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/air_pollution',
                qs: { 
                    lat: lat,
                    lon: lon,
                    appid: apiKey,
                    lang: 'pt_br'
                }
            }).then((response) => {
                cy.log('Índice de Poluição do Ar: ' + response.body.list[0].main.aqi);
                cy.log('Concentração de PM2.5: ' + response.body.list[0].components.pm2_5 + ' µg/m³');
                cy.log('Concentração de PM10: ' + response.body.list[0].components.pm10 + ' µg/m³');
                cy.log('Concentração de CO: ' + response.body.list[0].components.co + ' µg/m³');
                cy.log('Concentração de NO: ' + response.body.list[0].components.no + ' µg/m³');
                cy.log('Concentração de NO2: ' + response.body.list[0].components.no2 + ' µg/m³');
                cy.log('Concentração de O3: ' + response.body.list[0].components.o3 + ' µg/m³');
                cy.log('Concentração de SO2: ' + response.body.list[0].components.so2 + ' µg/m³');
                cy.log('Concentração de NH3: ' + response.body.list[0].components.nh3 + ' µg/m³');
            });
        });
    });

    it('Deve retornar dados sobre o índice UV', () => {
        cy.log(cidade);
        cy.request({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather',
            qs: {
                q: cidade,
                appid: apiKey,
                lang: 'pt_br'
            }
        }).then((response) => {
            const lat = response.body.coord.lat;
            const lon = response.body.coord.lon;

            cy.request({
                method: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/uvi',
                qs: { 
                    lat: lat,
                    lon: lon,
                    appid: apiKey,
                }
            }).then((response) => {
                cy.log('Índice UV Atual: ' + response.body.value);
            });
        });
    });
});
