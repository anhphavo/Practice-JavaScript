const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'wecommit',
  password: 'postgres123',
  port: 5432,
});

const getAccounts = (request, response) => {
  pool.query('SELECT * FROM accounts ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getAccountById = (request, response) => {
  const id = request.params.id;
  console.log("ID received:", id);

  pool.query('SELECT * FROM accounts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    console.log("Query results:", results.rows);
    response.status(200).json(results.rows[0]);
  });
};


const createAccount = (request, response) => {
  const id = uuidv4(); // Generate a new UUID
  const { firstName, lastName, accountName, password, email, areaCode, phoneNumber, subject } = request.body;

  pool.query(
    'INSERT INTO accounts (firstName, lastName, accountName, password, email, areaCode, phoneNumber, subject) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [firstName, lastName, accountName, password, email, areaCode, phoneNumber, subject],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Account added with ID: ${results.insertId}`);
    }
  );
};

const updateUserInDatabase = async (id, updatedUser) => {
  const { firstname, lastname, accountname, password, email, areacode, phonenumber, subject } = updatedUser;
  const query = `
    UPDATE accounts 
    SET firstname = $1, lastname = $2, accountname = $3, password = $4, email = $5, areacode = $6, phonenumber = $7, subject = $8 
    WHERE id = $9
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [firstname, lastname, accountname, password, email, areacode, phonenumber, subject, id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating user in database:', error);
    throw new Error('Database update failed');
  }
};


const deleteAccount = (request, response) => {
  const id = request.params.id;

  if (!isValidUUID(id)) {
    return response.status(400).send('Invalid UUID');
  }

  pool.query('DELETE FROM accounts WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.error('Error deleting account:', error);
      return response.status(500).send('Server error');
    }

    if (results.rowCount === 0) {
      return response.status(404).send('Account not found');
    }

    response.status(200).send(`Account deleted with ID: ${id}`);
  });
};

function isValidUUID(uuid) {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
}

module.exports = {
  getAccounts,
  getAccountById,
  createAccount,
  updateUserInDatabase,
  deleteAccount,
};
