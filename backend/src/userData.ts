import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { html } from 'hono/html';


export const initUser = async (c: any) => {
	const address = c.body('address');
	const profileImgLink = c.body('profileImgLink');
	const creditScore = c.body('creditScore');
	const first_name = c.body('first_name');
	const last_name = c.body('last_name');
	const user_id = c.body('user_id');
	const query = `INSERT INTO user_data (userid, first_name, last_name, address, profleimagelink, credit_score) VALUES (${user_id}, ${first_name}, ${last_name}, ${address}, ${profileImgLink}, ${creditScore})`;
};

export const getUser = async (c: any) => {
	const user_id = c.body('user_id');
	const query = `SELECT * FROM user_data WHERE userid = ${user_id}`;
	const user = c.env.DB.prepare(query);
	return c.json(user);
};

export const updateUser = async (c: any) => {
	const user_id = c.body('user_id');
	const address = c.body('address');
	const profileImgLink = c.body('profileImgLink');
	const creditScore = c.body('creditScore');
	const first_name = c.body('first_name');
	const last_name = c.body('last_name');
	const query = `UPDATE user_data SET first_name = ${first_name}, last_name = ${last_name}, address = ${address}, profleimagelink = ${profileImgLink}, credit_score = ${creditScore} WHERE userid = ${user_id}`;
	const user = c.env.DB.prepare(query);
	return c.json(user);
}
