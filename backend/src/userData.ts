import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { html } from 'hono/html';


export const initUser = async (c: any) => {
	const access_token = c.body('access_token');
	const refresh_token = c.body('refresh_token');
	const email = c.body('email');
	const password = "password";
	const queryOne = `INSERT INTO auth (email, password, access_token, refresh_token) VALUES (${email}, ${password}, ${access_token}, ${refresh_token})`;
	const authExecution = c.env.DB.prepare(queryOne);
	const address = c.body('address');
	const profileImgLink = c.body('profileImgLink');
	const creditScore = c.body('creditScore');
	const first_name = c.body('first_name');
	const last_name = c.body('last_name');
	const user_id = c.body('user_id');
	const queryTwo = `INSERT INTO user_data (userid, first_name, last_name, address, profleimagelink, credit_score) VALUES (${user_id}, ${first_name}, ${last_name}, ${address}, ${profileImgLink}, ${creditScore})`;
	const userExecution = c.env.DB.prepare(queryTwo);

	const joint = {authExecution, userExecution};
	return c.json(joint);
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
