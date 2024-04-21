import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { html } from 'hono/html';

import { createListing, updateNewLenders, updateStatusFinished, getListing, getAllListings } from "./listings";
import { initUser, getUser, updateUser } from "./userData";
import request from "wrangler";

export interface Env {
	DB: D1Database;
}

export default {
	async fetch(request: Request, env: Env) {
		const { pathname } = new URL(request.url);

		if (pathname === "/listings/getAll") {
			// If you did not use `DB` as your binding name, change it here
			const { results } = await env.DB.prepare(
				"SELECT * FROM listings"
			)
				.all();
			return Response.json(results);
		}

		else if (request.method === "POST" && pathname === "/auth/initUser") {
			const { access_token, refresh_token, email, address, password, profileImgLink, creditScore, first_name, last_name }: { access_token: string, refresh_token: string, email: string, address: string, password: string, profileImgLink: string, creditScore: number, first_name: string, last_name: string } = await request.clone().json();

			const queryOne = `INSERT INTO auth (email, password, access_token, refresh_token) VALUES ("${email}", "${password}", "${access_token}", "${refresh_token}")`;
			console.log(queryOne);
			const authPrep = await env.DB.prepare(queryOne).all();
			console.log(email);
			const queryTwo = `SELECT * FROM auth`;
			const authPrepTwo = await env.DB.prepare(queryTwo).all();
			const user_id = authPrepTwo.results[0].userid;
			console.log("user_id " + user_id);
			const queryThree = `INSERT INTO user_data (userid, address, profleimagelink, credit_score, first_name, last_name) VALUES (${user_id}, "${address}", "${profileImgLink}", ${creditScore}, "${first_name}", "${last_name}")`;
			const userPrep = await env.DB.prepare(queryThree).all();
			return Response.json(userPrep);
			/* const queryTwo = `SELECT
			* FROM auth WHERE email = "${email}"`;
			const authPrepTwo = await env.DB.prepare(queryTwo).all(); */
			// grab user_id from authPrepTwo
			/* const json = Response.json(authPrepTwo); */
			/* 	const queryThree = `INSERT INTO user_data (userid, address, profleimagelink, credit_score, first_name, last_name) VALUES (${user_id}, "${address}", "${profileImgLink}", ${creditScore}, "${first_name}", "${last_name}")`;
				console.log(queryThree);
				const userPrep = await env.DB.prepare(queryThree).all(); */





			/* onst requestBody = await request.json();
		const access_token = requestBody.access_token;
		const refresh_token = requestBody.refresh_token;
		const email = requestBody.email;
		const password = "password";
		const queryOne = `INSERT INTO auth (email, password, access_token, refresh_token) VALUES (${email}, ${password}, ${access_token}, ${refresh_token})`;
		const authPrep = request.env.DB.prepare(queryOne);
		const authExecution = request.env.DB.exec(authPrep);
		const address = requestBody.address;
		const profileImgLink = requestBody.profileImgLink;
		const creditScore = requestBody.creditScore;
		const first_name = requestBody.first_name;
		const last_name = requestBody.last_name; */
		}
		if (pathname === "/listings/viewProfile") {

		}
		if (pathname === "/listings/getListing") {

		}

		return new Response(
			"Call /api/beverages to see everyone who works at Bs Beverages"
		);
	},
};

//View Profile

//Create Listing/Loan

//getListing

//Join Button

//Create User

/*type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use('/*', cors());

const worker: ExportedHandler<Bindings> = {
	async fetch(req, env) {
		const url = new URL(req.url);
		const method = req.method;
		const path = url.pathname.replace(/[/]$/, '');
		const userID = url.searchParams.get('_id') || '';




		try {
			if (method === 'GET') {
				// read the userid from the http request
				const _id = await req.clone();
				// GET /api/todos?id=XXX
				// find the document that matches the given id
				if (url.pathname.includes('users/get')) {
					app.get('/users/get', async (request: any) => {
						const requestBody = await request.clone();
						return getUser(requestBody);
					}
				);
				}
				else if (url.pathname.includes('listings/getAll')) {
					app.get('/listings/getAll', async (request: any) => {
						const requestBody = await request.clone();
						return getAllListings(requestBody);
					}
					);
				}

				else if (url.pathname.includes('listings/getOne')) {
					app.get('/listings/getOne', async (request: any) => {
						const requestBody = await request.clone();
						return getListing(requestBody);
					}
				);
				}
				else {
					// return a json that says unknown method
					return "Unknown method.";
				}
			}

			// POST /api/todos
			if (method === 'POST') {
				// create a new document
				const data = await req.clone().json();
				if (url.pathname.includes('users/init')) {
					app.post('/users/init', async (request: any) => {
						const requestBody = await request.clone();
						return initUser(requestBody);
					}
				);
				}
				else if (url.pathname.includes('listings/create')) {
					app.post('/listings/create', async (request: any) => {
						const requestBody = await request.clone();
						return createListing(requestBody);
					}
				);
				}
				else {
					// return a json that says unknown method
					return "Unknown method.";
				}
			}

			// PATCH /api/todos?id=XXX&done=true
			if (method === 'PUT') {
				// update the document
				const data = await req.clone().json();
				if (url.pathname.includes('users/update')) {
					app.put('/users/update', async (request: any) => {
						const requestBody = await request.clone();
						return updateUser(requestBody);
					}
				);
				}
				else if (url.pathname.includes('listings/update/newLenders')) {
					app.put('/listings/update/newLenders', async (request: any) => {
						const requestBody = await request.clone();
						return updateNewLenders(requestBody);
					}
				);
				}
				else if (url.pathname.includes('listings/update/status/finished')) {
					app.put('/listings/update/status/finished', async (request: any) => {
						const requestBody = await request.clone();
						return updateStatusFinished(requestBody);
					}
				);
				}
				else {
					// return a json that says unknown method
					return "Unknown method.";
				}
			}
		} catch (err) {
			const msg = (err as Error).message || 'Error with query.';
			return new Response(msg, { status: 500 });
		}
	}
}

// Export for discoverability
export default app;*/
