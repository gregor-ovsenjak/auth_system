const { Pool } = require('pg');


const pool = new Pool()
/*

const users = async () => {
    try {
        const querryText = `CREATE TABLE IF NOT EXISTS user(
          userId SERIAL PRIMARY KEY,
          username VARCHAR(256) NOT NULL,
          password VARCHAR(256) NOT NULL,
          email VARCHAR(100) NOT NULL,
          createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(email)
        );`;
  
        result = await pool.query(querryText);
        console.log("succesfully created a table...");
    } catch(error) {
        console.log(error);
    }
  
}
  
users();
*/

exports.register_query = async (req,res) =>  {
    let new_user = Object.values(req.body);
    console.log(req.body)
    await pool.query('INSERT INTO users (username,password,email) VALUES ($1,$2,$3)',[new_user[1],new_user[2],new_user[0]])
}


exports.login_query = async (req,res) => {
    let user = await pool.query('SELECT * FROM users WHERE email=$1;',[req.body.Email]);
    await pool.query('UPDATE users SET login_time = NOW() WHERE email = $1',[req.body.Email]);
    return user;
}


exports.check_for_role = async (user) => {
    //console.log(user.userid)
  let is_admin = await pool.query('SELECT * FROM user_roles WHERE id=$1;',[user.userid])
  
  return is_admin;
}

exports.check_registration = async (req,res) =>  {
    let new_user = Object.values(req.body);
    //query to check if email is valid
    const check = await pool.query('SELECT (username,password,email) FROM users WHERE email = $1',[new_user[0]]);
    // sets a true:false value based on the returned values of a query
    let is_email_used = check.rowCount ? true : false;
    // Decides which message to return along with the is_email_used variable
    let Message = is_email_used ? "A user with that email already exists." : "Email is available.";
    return {valid:!is_email_used,message:Message};
}


exports.all_users = async () => {
    //querry all users ordered by date they registered in a descending order
    let users = await pool.query("SELECT userid AS ID,username,email,TO_CHAR(createdon,'YYYY-MM-DD') AS created_on FROM users ORDER BY createdon DESC LIMIT 20");
    
    return users.rows;
}


exports.delete_recent_user = async (email) => {
    await pool.query('DELETE FROM users WHERE email = $1',[email])
}

exports.active_users = async () => {
    let users = await pool.query("SELECT TO_CHAR(login_time,'YYYY-MM-DD')AS lastlogin,username FROM users ORDER BY lastlogin DESC LIMIT 20");
    return users.rows
}