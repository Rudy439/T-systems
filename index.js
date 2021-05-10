const express = require('express')
var mysql = require('mysql');

var con = mysql.createConnection({
  URL: 'mysql://localhost:3306',
  user:'root',
  database : 't-systemsprojekt'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO user (user_id, user_name) VALUES (?,'Jozef')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });*/
  User.create = (newUser, result) => {
    sql.query("INSERT INTO customers SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };
  
  User.findById = (userId, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // nenašiel sa použivatel s id
      result({ kind: "not_found" }, null);
    });
  };
  
  User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
  };
  
  Users.updateById = (id, user, result) => {
    sql.query(
      "UPDATE isers SET email = ?, name = ?, active = ? WHERE id = ?",
      [user.email, user.name, user.active, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // nenašiel použivatela s id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  };
  
  User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // nenašiel sa použiavatel s id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };
  
  User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };
  
  module.exports = User;


  module.exports = app => {
    const users = require("index.js");
  
    // Vytvoriť nových pouzivatelov
    app.post("/users", users.create);
  
    // Vyhľadať všetkých Users
    app.get("/users", users.findAll);
  
    // Vyhľadať použivatela s Id
    app.get("/users/:userId", users.findOne);
  
    // Obnoviť použivatela s userId
    app.put("/users/:userId", users.update);
  
    // vymazať použivatela s UserId
    app.delete("/users/:userId", users.delete);
  
    // vytvoriť noveho použivatela
    app.delete("/users", users.deleteAll);
  };