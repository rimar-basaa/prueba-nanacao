const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    // ***** Requerimiento 1 (GET)
    it('Comprobando una ruta Ok [200]', async () => {
        const response = await request(server).get('/cafes').send();
        const status = response.statusCode;
        expect(status).toBe(200);            
    });

    it('Comprobando Tipo Dato de respuesta de la consulta sea [Array]', async () => {
        const { body } = await request(server).get('/cafes').send();
        const producto = body;
        expect(producto).toBeInstanceOf(Array);
    });


    // ***** Requerimiento 2 (DELETE)
    it('Eliminando un cafe que NO existe [404]', async () => {
        const jwt = "tokenDePrueba"
        const borrarId = 100;
        const response = await request(server).delete(`/cafes/${borrarId}`).set("Authorization", jwt).send();
        const status = response.statusCode;
        expect(status).toBe(404);
    });


    // ***** Requerimiento 3 (POST)
    it('Agregando un cafe con Exito [201]', async () => {
        const id = Math.floor(Math.random()*99);
        const producto = {id, nombre: 'Expresso'};
        const response = await request(server).post('/cafes').send(producto);
        const status = response.statusCode;
        expect(status).toBe(201);
    });


    // ***** Requerimiento 4 (PUT)
    it('Modificando cafe con ID de Parametro y Payload que NO coinciden[400]', async () => {
        const id = 10;
        const producto = {id, nombre: 'Latte'};
        const response = await request(server).put('/cafes/2').send(producto);
        const status = response.statusCode;
        expect(status).toBe(400);
    });
});
