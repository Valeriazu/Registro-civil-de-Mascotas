const http = require('http');
const fs = require('fs').promises;
const url = require('url');

const FILE_PATH = './mascotas.json';
const PORT = 4200;

const API_URL = 'http://localhost:4200/mascotas';

async function LeerMascotas() {
    try {
        const data = await fs-readFile(FILE_PATH, 'stf-8');
        return JSON.parse(data);
        } catch {
            return [];
        }
}

async function guardarMascotas(data) {
    await fs.writeFile(FILE_PATH, json.stringify(data,null, 2));
}

const server = http.createServer(async (req, res) => {
    const parseUrl = url.parse(req.url , true);
    const { pathname, query } = parseUrl;
    const { method } = req; 

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
}

if (pathname === '/mascotas') {
    let mascotas = await LeerMascotas();

    if (method === 'GET') {

        if (query.nombre) {
            const marcota= LeerMascotas.find(m => m.nombre.tolLowerCase() === query.nombre.toLowerCase());
            if (mascota) {
                res.writeHead(200);
                return res.end(JSON.stringify(mascota));
            } else {
                res.writeHead(404);
                return res.end(JSON.stringify({ mensaje: "Mascota no encontrada"}));
            }
        }

        if (query.rut) {
            const filtradas = mascotas.filter(m => m.rut === query.rut);
            res.writeHead(200);
            return res.end(JSON.stringify(filtradas));
        }

        res.writeHead(200);
        return res.end(JSON.stringify(mascotas));
    }

if (method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', async () => {
                try {
                    const nuevaMascota = JSON.parse(body);
                    
                    // Validación simple de que vengan los datos
                    if (!nuevaMascota.nombre || !nuevaMascota.rut) {
                        res.writeHead(400);
                        return res.end(JSON.stringify({ mensaje: "Falta el nombre de la mascota o el rut del dueño" }));
                    }

                    mascotas.push(nuevaMascota);
                    await guardarMascotas(mascotas);

                    res.writeHead(201);
                    res.end(JSON.stringify({ mensaje: "Mascota registrada con éxito", mascota: nuevaMascota }));
                } catch (err) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ mensaje: "Error al procesar el JSON" }));
                }
            });
            return;
        }

        if (method === 'DELETE') {
        
            if (query.nombre) {
                const longitudInicial = mascotas.length;
            
                mascotas = mascotas.filter(m => m.nombre.toLowerCase() !== query.nombre.toLowerCase());

                if (mascotas.length < longitudInicial) {
                    await guardarMascotas(mascotas);
                    res.writeHead(200);
                    return res.end(JSON.stringify({ mensaje: `Mascota '${query.nombre}' eliminada` }));
                } else {
                    res.writeHead(404);
                    return res.end(JSON.stringify({ mensaje: "Mascota no encontrada" }));
                }
            }

        if (query.rut) {
            const longitudInicial = mascotas.length;
            mascotas = mascotas.filter( m => m.rut !== query.rut);

            if (mascotas.length < longitudInicial) {
                await guardarMascotas(mascotas);
                res.writeHead(200);
                return res.end(JSON.stringify({ mensaje: " Mascotas asociadas al RUT ${query.rut eliminadas" }));
            } else {
                res.writeHead(404);
                return res.end(JSON.stringify({ mensaje: "No se encontraron mascotas para ese RUT"})); 
            }
        }
        
        res.writeHead(400);
            return res.end(JSON.stringify({ mensaje: "Debe especificar 'nombre' o 'rut' para eliminar" }));
        }

    } else {
        // Ruta no encontrada
        res.writeHead(404);
        res.end(JSON.stringify({ mensaje: "Ruta no encontrada. Intenta con /mascotas" }));
    }
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
