import http from "node:http";
import { json } from "./middlewares/josn.js";
import { routes } from "./routes.js";

// Query parameters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

// http://localhost:3333?userId=1&name=Talles

// GET http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1

// POST http://localhost:3333 - { body }

const server = http.createServer(async (req, res) => {
	const { method, url } = req;

	await json(req, res);

	const route = routes.find(
		(route) => route.method === method && route.path === url,
	);
	if (route) {
		return route.handler(req, res);
	}
	return res.writeHead(404).end();
});

server.listen(3333);
