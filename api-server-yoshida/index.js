const express = require('express');
const app = express();
const mysql = require('mysql2');
const crypto = require('crypto');
var session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1); // trust first proxy

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxage: 1000 * 60 * 30,
    },
  })
);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@kasatana1234',
  database: 'typetest',
});

//サーバー外からのアクセスを許可する　CORS対策設定
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //第2引数に呼び出し元のURLヘッダを記載する。(htpps://localhost8080など)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.get('/logout', function (req, res) {
  req.session.userID = undefined;
  console.log(req.session.userID);
  res.send(undefined);
});

app.get('/check/login', function (req, res) {
  if (req.session.userID) {
    const userID = req.session.userID;
    connection.query(
      `select userID,name,email,tell 
    from masta_user
    where userID = ?
    and authNO != 3
  `,
      [userID],
      function (error, results) {
        if (error) {
          throw error;
        }
        if (results.length) {
          //結果が存在する場合userDataを送信する
          res.send(results);
        } else {
          //結果が存在しない場合error文字列を送信する
          res.send(['error']);
        }
      }
    );
  } else {
    res.send(undefined);
  }
});

/**
 * 一覧取得
 * 指定したテーブルから、一覧表を取得する。
 * 任意のテーブル名に変更し、使用する。
 *
 * @param req リクエストの内容：各自で設定した値が入る
 * @param res レスポンスの内容
 */
app.post('/portforioSettingInit', function (req, res) {
  //TODO:masta_userを結合 authNO != 3を追加
  connection.query(
    `SELECT currencyName,quantity,url,masta_currency.currencyID FROM hold_currency
     inner join masta_currency
     on hold_currency.currencyID = masta_currency.currencyID
     where userID = "?";`,
    [req.body.userID],
    function (error, results) {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

//APIのURL取得
app.post('/get/url', function (req, res) {
  connection.query(
    `SELECT url from masta_currency where currencyName = ?`,
    [req.body.currencyName],
    function (error, results) {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

/**
 * 新規登録
 * 指定したテーブルに、新規データを登録する。
 * 任意のテーブル名・カラム名に変更し、使用する。
 * リクエストで受け取る変数名に変更し、使用する。
 *
 * @param req リクエストの内容：各自で設定した値が入る
 * @param res レスポンスの内容
 */
app.post('/userinfo/add/user', function (req, res) {
  const data = req.body;
  const passwordHash = crypto.createHash('sha256').update(data.password).digest('hex');

  //インサート文
  connection.query(
    `insert into masta_user (userID,name,email,password,tell,authNo)
     value (
      (select ifnull(max,0) as max from (select MAX(userID) as max from masta_user) as selectMax) +1,
      ?,
      ?,
      ?,
      ?,
      2
    );`,
    [data.name, data.email, passwordHash, data.tell],
    async function (error, results) {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

app.post('/login', function (req, res) {
  const data = req.body;
  const passwordHash = crypto.createHash('sha256').update(data.password).digest('hex');
  //ログイン処理
  connection.query(
    `select userID,name,email,tell 
    from masta_user
    where email = ? 
    and password = ?
    and authNO != 3
  `,
    [data.email, passwordHash],
    function (error, results) {
      if (error) {
        throw error;
      }
      if (results.length) {
        //結果が存在する場合userDataを送信する
        req.session.userID = results[0].userID;
        console.log(req.session.userID);
        console.log(results);
        res.send(results);
      } else {
        //結果が存在しない場合error文字列を送信する
        res.send(['error']);
      }
    }
  );
});

/**
 * 編集
 * 指定したテーブルの指定したデータを編集する。
 * 任意のテーブル名・カラム名に変更し、使用する。
 * リクエストで受け取る変数名に変更し、使用する。
 *
 * @param req リクエストの内容：各自で設定した値が入る
 * @param res レスポンスの内容
 */
app.post('/userinfo/edit', function (req, res) {
  const data = req.body;
  const passwordHash = crypto.createHash('sha256').update(data.password).digest('hex');

  connection.query(
    'UPDATE masta_user SET name = ?, email = ?, password = ? ,tell = ? WHERE userID = ?',
    [data.name, data.email, passwordHash, data.tell, data.userID],
    function (error, results) {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

/**
 * 削除
 * 指定したテーブルの指定したデータを削除する。
 * 任意のテーブル名・カラム名に変更し、使用する。
 * リクエストで受け取る変数名に変更し、使用する。
 *
 * @param req リクエストの内容：各自で設定した値が入る
 * @param res レスポンスの内容
 */
app.post('/userinfo/delete', function (req, res) {
  connection.query(`UPDATE masta_user SET authNo = 3 WHERE userID = ?;`, [req.body.userID], function (error, results) {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

/**登録 ******************************************************************************************/
/**
 * @param userID ユーザーID
 * @param data userID currencyID quantity price
 */
//ポートフォリオの登録
app.post('/portforio/regist', function (req, res) {
  const data = req.body.data;
  const userID = req.body.userID;

  //データ全削除
  deleteAddPortforio(userID);
  for (let i = 0; i < data.length; i++) {
    if (data[i].quantity === 0) {
      continue;
    }
    //データの挿入
    InsertAddPortforio(userID, data[i].currencyID, data[i].quantity);
  }

  //取引を登録
  transactionRegistMasta(data, userID);
  res.send(true);
});

//所持通貨全消し
function deleteAddPortforio(userID) {
  connection.query(`DELETE FROM hold_currency WHERE userID IN(?);`, [userID], function (error) {
    if (error) {
      throw error;
    }
  });
}
//所持通貨新規インサート
function InsertAddPortforio(userID, currencyID, quantity) {
  connection.query(
    `insert into hold_currency (userID,currencyID,quantity)
    value (?,?,?)`,
    [userID, currencyID, quantity],
    function (error) {
      if (error) {
        throw error;
      }
    }
  );
}

//取引登録
function transactionRegistMasta(data, userID) {
  //必要情報の初期化
  const timestamp = new Date(new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })).getTime();
  const nunce = parseInt((Math.random() * (1000000000 - 10)).toString());

  //合計金額の取得
  let sumPrice = 0;
  for (let i = 0; i < data.length; i++) {
    sumPrice += data[i].currentPrice * data[i].quantity;
  }

  //情報を取得し、ハッシュ値を生成
  const beforeHashData = '' + timestamp + sumPrice + nunce + userID;
  const resultHash = crypto.createHash('sha256').update(beforeHashData).digest('hex');

  //取引を登録
  transactionRegistParent(userID, resultHash, nunce, timestamp, sumPrice);

  //取引明細を入力
  for (let i = 0; i < data.length; i++) {
    if (data[i].quantity === 0) {
      continue;
    }
    transactionRegistPDetail(resultHash, data[i]);
  }
}

/**
 * 登録する値
 * @param userID ユーザーID
 * @param registID userID,nunce,registDate,summoneyを足してハッシュ化した字列
 * @param frontHash 直前に追加した人のregistID
 * @param nunce ランダムな数字１０桁
 * @param timestamp タイムスタンプ
 * @param sumPrice 合計金額
 */
function transactionRegistParent(userID, resultHash, nunce, timestamp, sumPrice) {
  connection.query(
    `INSERT INTO regist_currency (userID,registID,frontHash,nunce,registDate,sumMoney) 
    value (
    ?,
    ?,
    (SELECT registID FROM (
      SELECT registID FROM regist_currency
      where registDate = (SELECT MAX(registDate) as currentDate FROM regist_currency)
    )as max),
    ?,
    ?,
    ?)`,
    [userID, resultHash, nunce, timestamp, sumPrice],
    function (error) {
      if (error) {
        throw error;
      }
    }
  );
}

//取引明細に登録
/**
 * @param registID 取引のハッシュ化したIDを入れる
 * @param currencyID　通貨ID
 * @param quantity　量
 * @param money　金額
 */
function transactionRegistPDetail(resultHash, data) {
  connection.query(
    `INSERT INTO regist_currency_detail (registID,currencyID,quantity,money) 
    value (
    ?,
    ?,
    ?,
    ?)`,
    [resultHash, data.currencyID, data.quantity, data.currentPrice],
    function (error) {
      if (error) {
        throw error;
      }
    }
  );
}

// ポート4000で繋げるようにする処理。
app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
