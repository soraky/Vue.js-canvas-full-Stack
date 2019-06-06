import express from 'express';
import cors from 'cors';
import uuid from 'uuid/v4.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors());
app.use(express.json());

const data = {
    draws: [
        {
            id: "1",
            name: 'abc',
            creator: 'Admin',
            private: false,
            date: '18/4/18',
            time: 59,
            content: [
                {
                    width: 20,
                    color: '#ff0000',
                    coordinates: [
                        { x: 12, y: 13 },
                        { x: 12, y: 14 },
                        { x: 12, y: 15 },
                        { x: 702, y: 166 },
                    ],
                },
                {
                    width: 5,
                    color: '#00ff00',
                    coordinates: [
                        { x: 70, y: 800 },
                        { x: 420, y: 700 },
                        { x: 0, y: 500 },
                    ],
                },
            ]
        },
        {
            id: "2",
            name: '123',
            creator: 'Admin',
            private: false,
            date: '20/5/19',
            time: 100,
            content: [
                {
                    width: 10,
                    color: '#0000ff',
                    coordinates: [
                        { x: 12, y: 13 },
                        { x: 17, y: 100 },
                        { x: 120, y: 151 },
                        { x: 12, y: 166 },
                    ],
                },
                {
                    width: 20,
                    color: '#ffaaff',
                    coordinates: [
                        { x: 12, y: 50 },
                        { x: 123, y: 321 },
                        { x: 564, y: 1 },
                        { x: 1, y: 543 },
                    ],
                },
                {
                    width: 5,
                    color: '#000000',
                    coordinates: [
                        { x: 500, y: 0 },
                        { x: 123, y: 654 },
                        { x: 0, y: 500 },
                    ],
                },
            ]
        },
        {
            id: "3",
            name: 'No longer a private drawing',
            creator: 'Admin',
            private: false,
            date: '25/5/19',
            time: 600,
            content: [
                {
                    width: 6,
                    color: '#ffaa00',
                    coordinates: [
                        { x: 12, y: 13 },
                        { x: 12, y: 14 },
                        { x: 12, y: 15 },
                        { x: 702, y: 166 },
                        { x: 100, y: 200 },
                        { x: 800, y: 500 },
                    ],
                },
                {
                    width: 50,
                    color: '#00ffff',
                    coordinates: [
                        { x: 10, y: 400 },
                        { x: 420, y: 700 },
                        { x: 690, y: 240 },
                    ],
                },
            ]
        },
        {
            id: "4",
            name: 'Not private',
            creator: 'Admin',
            private: false,
            date: '29/5/19',
            time: 61,
            content: [
                {
                    width: 50,
                    color: '#000000',
                    coordinates: [
                        { x: 1, y: 1 },
                        { x: 800, y: 800 },
                    ],
                },
                {
                    width: 20,
                    color: '#aabbcc',
                    coordinates: [
                        { x: 12, y: 50 },
                        { x: 120, y: 500 },
                    ],
                },
                {
                    width: 5,
                    color: '#eeddcc',
                    coordinates: [
                        { x: 435, y: 123 },
                        { x: 546, y: 755 },
                        { x: 50, y: 10 },
                    ],
                },
            ]
        },
    ]
};

app.listen(3000);

app.get('/api/drawings', (req, res) => {
    res.json(data.draws);
});

app.get('/api/drawings/:id', (req, res) => {
    const id = req.params.id;
    const drawings = data.draws;
    const currentDrawing = drawings.find(drawing => drawing.id === id);
    res.json(currentDrawing);
});

app.post('/api/drawings', (req, res) => {
    const drawing = req.body;
    drawing.id = uuid();
    data.draws.unshift(drawing);
    res.send(drawing.id);
});

// app.get('/', (req, res) => {
//     res.returnFILE('./BUILD/INDEX.HTML')
// })