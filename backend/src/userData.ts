export const initUser = async (request: Request) => {
	const requestBody = await request.json();
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
	const last_name = requestBody.last_name;
	const user_id = authExecution.first('userid');
	const queryTwo = `INSERT INTO user_data (userid, first_name, last_name, address, profleimagelink, credit_score) VALUES (${user_id}, ${first_name}, ${last_name}, ${address}, ${profileImgLink}, ${creditScore})`;
	const userTwo = request.env.DB.prepare(queryTwo);
	const userExecution = request.env.DB.exec(userTwo);
	const joint = {authExecution, userExecution};
	return new Response(JSON.stringify(joint));
};

export const getUser = async (request: Request) => {
	const requestBody = await request.json();
	const user_id = requestBody.user_id;
	const query = `SELECT * FROM user_data WHERE userid = ${user_id}`;
	const user = request.env.DB.prepare(query);
	const exec = request.env.DB.exec(user);
	return new Response(JSON.stringify(exec));
};

export const updateUser = async (request: Request) => {
	const requestBody = await request.json();
	const user_id = requestBody.user_id;
	const address = requestBody.address;
	const profileImgLink = requestBody.profileImgLink;
	const creditScore = requestBody.creditScore;
	const first_name = requestBody.first_name;
	const last_name = requestBody.last_name;
	const query = `UPDATE user_data SET first_name = ${first_name}, last_name = ${last_name}, address = ${address}, profleimagelink = ${profileImgLink}, credit_score = ${creditScore} WHERE userid = ${user_id}`;
	const user = request.env.DB.prepare(query);
	const exec = request.env.DB.exec(user);
	return new Response(JSON.stringify(exec));
}
