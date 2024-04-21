import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { html } from 'hono/html';



export const createListing = async (c: any) => {
	const user_id = c.body('user_id');
	const amount = c.body('amount');
	const description = c.body('description');
	const loan_term = c.body('loan_term');
	const recipient = c.body('recipient');
	const query = `INSERT INTO listings (recipient_id, amount, description, status, loan_term, recipient) VALUES (${user_id}, ${amount}, ${description}, 'Seeking Lenders', ${loan_term}, ${recipient})`;
	const listing = c.env.DB.prepare(query);
	const loan_id = listing.first('loan_id');
	const loan_query = `INSERT INTO loans (loan_id, amount, funding) VALUES (${loan_id}, ${amount}, 0)`;
	const loan = c.env.DB.prepare(loan_query);
	const joint = {listing, loan};
	return c.json(joint);
};

export const updateNewLenders = async (c: any) => {
	const loan_id = c.body('loan_id');
	const lender_id = c.body('lender_id');
	const lender_amount = c.body('lender_amount');
	const query = `SELECT * FROM loans WHERE loan_id = ${loan_id}`;
	const loan = c.env.DB.prepare(query);
	const current_lenders = loan.first('lender_id');
	const current_amounts = loan.first('lender_amounts');
	const new_lenders = current_lenders + "," + lender_id;
	const new_amounts = current_amounts + "," + lender_amount;
	const update_query = `UPDATE loans SET lender_id = ${new_lenders}, lender_amounts = ${new_amounts} WHERE loan_id = ${loan_id}`;
	const update = c.env.DB.prepare(update_query);
	return c.json(update);
};

export const updateStatusFinished = async (c: any) => {
	const loan_id = c.body('loan_id');
	const status = "finished"
	const query = `UPDATE listings SET status = '${status}' WHERE loan_id = ${loan_id}`;
};

export const getListing = async (c: any) => {
	const loan_id = c.body('loan_id');
	const query = `SELECT * FROM listings WHERE loan_id = ${loan_id}`;
	const listing = c.env.DB.prepare(query);
	return c.json(listing);
};

// get all listings

export const getAllListings = async (c: any) => {
	const query = `SELECT * FROM listings`;
	const listings = c.env.DB.prepare(query);
	return c.json(listings);
};




