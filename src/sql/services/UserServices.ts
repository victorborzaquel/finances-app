import { IUser } from "../../global/interfaces";
import db from "../database";

export const UserServices = {
  create: (user: IUser) => new Promise((resolve, reject) => {
    db.transaction(tx => {
      const {avatar, email, email_verified, first_name, id, last_name, name} = user;
      tx.executeSql(
        'INSERT INTO users (google_id, avatar, email, email_verified, first_name, last_name, name) values (?, ?, ?, ?, ?, ?, ?, ?);',
        [id, avatar, email, email_verified, first_name, last_name, name],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(user));
        },
        (_, error) => {
          reject(error);
          return true;
        }
      )
    })
  }),
  update: (id: string, user: IUser) => new Promise((resolve, reject) => {
    const {avatar, email, email_verified, first_name, last_name, name, id} = user;
    db.transaction(tx => {
      tx.executeSql(
        "UPDATE users SET avatar=?, email=?, email_verified=?, first_name=?, last_name=?, name=? WHERE id=?;",
        [avatar, email, email_verified, first_name, last_name, name, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj: id=" + id);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      )
    })
  })
}

const find = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM cars WHERE id=?;",
        [id],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else reject("Obj not found: id=" + id); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};
const findByBrand = (brand) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM cars WHERE brand LIKE ?;",
        [brand],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Obj not found: brand=" + brand); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};
const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM cars;",
        [],
        //-----------------------
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};
const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM cars WHERE id=?;",
        [id],
        //-----------------------
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

export default {
  create,
  update,
  find,
  findByBrand,
  all,
  remove,
};