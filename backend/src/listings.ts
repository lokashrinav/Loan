import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { html } from 'hono/html';
import  DB  from './index';
import {D1Database} from '@cloudflare/workers-types';

export const createListing = async (data: Request) => {
	const json: JSON = await data.json();
	const user_id = (json as unknown as { user_id: string })['user_id'];
	const amount = (json as unknown as { amount: number })['amount'];
	const description = (json as unknown as { description: string })['description'];
	const loan_term = (json as unknown as { loan_term: number })['loan_term'];
	const recipient = (json as unknown as { recipient: string })['recipient'];
	const query1 = `INSERT INTO listings (recipient_id, amount, description, status, loan_term, recipient) VALUES (${user_id}, ${amount}, ${description}, 'Seeking Lenders', ${loan_term}, ${recipient})`;
	const listing = DB.prepare(query1);
	const executed = DB.exec(listing);
	const loan_id = executed.first('loan_id');
	const loan_query = `INSERT INTO loans (loan_id,  amount, funding,lender_id, lender_amounts) VALUES (${loan_id}, ${amount}, 0, '', '')`;
	const loan = DB.prepare(loan_query);
	const executedTwo = DB.exec(loan);
	const joint = { listing, loan };
	return new Response(JSON.stringify(joint));
};

export const updateNewLenders = async (request: Request) => {
	const requestBody = await request.json();
	const loan_id = requestBody.loan_id;
	const lender_id = requestBody.lender_id;
	const lender_amount = requestBody.lender_amount;
	const query = `SELECT * FROM loans WHERE loan_id = ${loan_id}`;
	const loan = DB.prepare(query);
	const executedOne = DB.exec(loan);
	const current_lenders = loan.first('lender_id');
	const current_amounts = loan.first('lender_amounts');
	const new_lenders = current_lenders + "," + lender_id;
	const new_amounts = current_amounts + "," + lender_amount;
	const update_query = `UPDATE loans SET lender_id = ${new_lenders}, lender_amounts = ${new_amounts} WHERE loan_id = ${loan_id}`;
	const update = DB.prepare(update_query);
	const executedTwo = DB.exec(update);
	return new Response(JSON.stringify(executedTwo));
};

export const updateStatusFinished = async (request: Request) => {
	const requestBody = await request.json();
	const loan_id = requestBody.loan_id;
	const status = "finished"
	const query = `UPDATE listings SET status = '${status}' WHERE loan_id = ${loan_id}`;
	const listing = DB.prepare(query);
	const finished = DB.exec(listing);
	return new Response(JSON.stringify(finished));
};

export const getListing = async (request: Request) => {
	const requestBody = await request.json();
	const loan_id = requestBody.loan_id;
	const query = `SELECT * FROM listings WHERE loan_id = ${loan_id}`;
	const listing = DB.prepare(query);
	const executed = DB.exec(listing);
	return new Response(JSON.stringify(executed));
};

export const getAllListings = async (request: Request) => {
	const query = `SELECT * FROM listings`;
	const listings = DB.prepare(query);
	const executed = DB.exec(listings);
	return new Response(JSON.stringify(executed));
};
