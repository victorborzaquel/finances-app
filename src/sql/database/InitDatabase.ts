import db from '.';

db.transaction(
	tx => {
		//tx.executeSql("DROP TABLE users;");

		// USERS
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      google_id     TEXT UNIQUE NOT NULL,
      name          TINYTEXT NOT NULL, 
      first_name    TINYTEXT, 
      last_name     TINYTEXT,
      email         TINYTEXT UNIQUE NOT NULL;
      email_verified TINYTEXT, 
      created_at    DATE NOT NULL DEFAULT GETDATE(), 
      avatar        TINYTEXT, 
    );`
		);

		// TRANSACTIONS
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        user_id     INTEGER NOT NULL, 
        type        TEXT NOT NULL, 
        amount      INT NOT NULL
        date        DATE NOT NULL, 
        description TEXT NOT NULL,
        confirmed   BOOLEAN,
        recurring   BOOLEAN,
        repeat_quant SMALLINT,
        repeat_period SMALLINT,
        note          TINYTEXT,
        favorite      BOOLEAN,
    );`
		);

    // TRANSFERS
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS transfers (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        user_id               INTEGER NOT NULL, 
        account_origin_id     INTEGER NOT NULL, 
        account_destination_id INTEGER NOT NULL, 
        description           TINYTEXT NOT NULL,
        amount                 INTEGER,
        note                  TINYTEXT,
        date                   DATE,
        recurring              BOOLEAN,
    );`
		);

    // CREDIT CARD
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS credit_card (
        id         INTEGER PRIMARY KEY AUTOINCREMENT, 
        user_id    INTEGER NOT NULL, 
        icon_id    INTEGER NOT NULL, 
        color_id  INTEGER NOT NULL, 
        name      TINYTEXT NOT NULL,
        limit     INTEGER NOT NULL,
    );`
		);

    // CATEGORY
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        user_id      INTEGER NOT NULL, 
        icon_id      INTEGER NOT NULL, 
        color_id     INTEGER NOT NULL, 
        type         TINYTEXT NOT NULL,
    );`
		);

    // WALLET
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS wallet (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        user_id        INTEGER NOT NULL,
        icon_id        INTEGER NOT NULL,
        color_id       INTEGER NOT NULL,
        name           TINYTEXT NOT NULL,
        type           TINYTEXT NOT NULL,
    );`
		);
	},
	error => {
		console.log(`error call back: ${error.message}`);
		console.log(error);
	},
	() => {
		console.log('Transaction complete call back');
	}
);
