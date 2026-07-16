import fastify from 'fastify';
import cors from '@fastify/cors';

const server = fastify({logger: true});

server.register(cors, {
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

const drivers = [
    {id: 1, name: "Max Verstappen", team: "Red Bull Racing"},
    {id: 2, name: "Lewis Hamilton", team: "Mercedes-AMG Petronas"},
    {id: 3, name: "Charles Leclerc", team: "Ferrari"},
    {id: 4, name: "Lando Norris", team: "McLaren"},
];

const teams = [
    {id: 1, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom"},
    {id: 2, name: "Mercedes-AMG Petronas", base: "Brackley, United Kingdom"},
    {id: 3, name: "Ferrari", base: "Maranello, Italy"},
    {id: 4, name: "McLaren", base: "Woking, United Kingdom"},
];

server.get('/', async (request, response) => {
  response.type('application/json').code(200);
  return {teams};
});

server.get('/drivers', async (request, response) => {
    response.type('application/json').code(200);
    return {drivers};
})

interface DriverParams {
    id: string;
}

server.get<{Params: DriverParams}>('/drivers/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(d => d.id === id);

    if (!driver) {
        response.type('application/json').code(404);
        return {message: "Driver not found"};
    }

    else{
        response.type('application/json').code(200);
        return {driver};
    }
});

server.listen({port: 3000}, () => {
    console.log('Server is running on http://localhost:3000');
})

