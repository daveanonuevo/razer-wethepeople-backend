const { Pool } = require('pg');

require('dotenv').config();
let pool;

if(process.env.POSTGRES_HOST !== 'localhost'){
	pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	port: process.env.POSTGRES_PORT,
	host: process.env.POSTGRES_HOST,
	connectionString: process.env.POSTGRES_STRING,
	ssl: true,
	max: 15,
});}
else{
	pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	port: process.env.POSTGRES_PORT,
	host: process.env.POSTGRES_HOST,
	connectionString: process.env.POSTGRES_STRING,
	max: 15,
});}


module.exports = {
	query: (text, params, callback) => {
		pool.connect((err, client, done) => {
			if (err) throw err;
			const start = Date.now();
			return client.query(text, params, (err, res) => {
				const duration = Date.now() - start;
				try{console.log('executed query', { text, duration, rows: res.rowCount });}
				catch{console.error(err)}
				done();
				callback(err, res);
			})
		})
		},
	getClient: (callback) => {
		pool.connect((err, client, done) => {
			const query = client.query.bind(client);
			// monkey patch the query method to keep track of the last query executed
			client.query = () => {
				client.lastQuery = arguments;
				client.query.apply(client, arguments)
			};
			// set a timeout of 5 seconds, after which we will log this client's last query
			const timeout = setTimeout(() => {
				console.error('A client has been checked out for more than 5 seconds!');
				console.error(`The last executed query on this client was: ${client.lastQuery}`)
			}, 5000);
			const release = (err) => {
				// call the actual 'done' method, returning this client to the pool
				done(err);
				// clear our timeout
				clearTimeout(timeout);
				// set the query method back to its old un-monkey-patched version
				client.query = query
			};
			callback(err, client, release)
		})
	}
};
