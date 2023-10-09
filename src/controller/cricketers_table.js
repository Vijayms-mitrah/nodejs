const { customerLogger } = require("../logger_config/index");

const client = require("../database/index");

const getCricketersDetails = (req, response) => {
  let result = null;
  const logDetails = {
    Path: `${req.protocol}://${req.get("Host")}${req.baseUrl}`,
    Host: req.get("Host"),
    BaseUrl: req.baseUrl,
    message: "success",
  };
  client.query("select * from cricketers", (err, res) => {
    if (err) {
      console.log("error", err?.message);
      logDetails.message = err.message;
      customerLogger.error(logDetails);
    } else {
      result = res.rows;
      logDetails.message = "Success";
      customerLogger.info(logDetails);
      console.log("result", result);
    }
    response.send(result);
  });
};

// --------Using Insert Query----------------
const onInsert = (req, response) => {
  console.log("request123", req.body);
  const { name, age, dob, id } = req.body;
  console.log("name", name, "age", age);
  response.type("json");
  client.query(
    `insert into cricketers(id, name, age, dob)
    values(${id}, '${name}', ${age}, '${dob}')`,
    (err, res) => {
      let result = "";
      if (err) {
        result = "API Request Failed";
        console.log("insert error", err);
      } else {
        console.log("success", res);
        result = "API Request Completed";
      }
      response.send(result);
    },
  );
};

// -------USING Function--------
const onInsertUsingFunction = (req, response) => {
  const { name, age, dob } = req.body;
  response.type("json");
  client.query(
    `select onHandleInsert('${name}', ${age}, '${dob}')`,
    (err, res) => {
      let result = "";
      if (err) {
        result = "API Request Failed";
        console.log("insert error", err);
      } else {
        console.log("success", res);
        result = "API Request Completed";
      }
      response.send(result);
    },
  );
};

// delete Individual

const onHandleDelete = (request, response) => {
  console.log("request.params.id", request.params.id);
  client.query(
    `delete from cricketers where id = ${request.params.id}`,
    (err, res) => {
      let result = "";
      if (err) {
        result = "API Request Failed";
        console.log("get individual error", err);
      } else {
        console.log("success", res);
        result = "API Request Completed";
      }
      response.send(result);
    },
  );
};

// Using procedure
const onHandleDeleteUsingProcedure = (request, response) => {
  console.log("request.params.id", request.params.id);
  client.query(`call onDelete(${request.params.id})`, (err, res) => {
    let result = "";
    if (err) {
      result = "API Request Failed";
      console.log("get individual error", err);
    } else {
      console.log("success", res);
      result = "API Request Completed";
    }
    response.send(result);
  });
};

// Update
const onHandleUpdate = (request, response) => {
  client.query(
    `update cricketers set name = '${request.body.name}' where id = ${request.body.id}`,
    (err, res) => {
      let result = "";
      if (err) {
        result = "API Request Failed";
        console.log("update error", err);
      } else {
        console.log("update success", res);
        result = "API Request Completed";
      }
      response.send(result);
    },
  );
};

// --Using Function--
const onHandleUpdateUsingFunction = (request, response) => {
  console.log(
    "result099",
    `${request.body.id}, ${request.body.name || null}, ${
      request.body.dob || null
    }`,
  );
  client.query(
    `select onUpdate(${request.body.id}, ${request.body.name || null}, '${
      request.body.dob || null
    }')`,
    (err, res) => {
      let result = "";
      if (err) {
        result = "API Request Failed";
        console.log("update error", err);
      } else {
        console.log("upadte success", res);
        result = "API Request Completed";
      }
      response.send(result);
    },
  );
};

// ---Get single Value

const getCricketer = (request, response) => {
  client.query(
    `select * from cricketers where id = ${request.params.id}`,
    (err, res) => {
      let result = "";
      if (err) {
        result = "API Request Failed";
        console.log("get error", err);
      } else {
        console.log("update success", res);
        result = "Successfully fetched";
      }
      response.send(res.rows);
    },
  );
};

// ---Bulk Insert---

const onBulkInsert = (request, response) => {
  console.log("request", JSON.stringify(request.body));
  client.query(
    `select bulk_insert('${JSON.stringify(request.body)}')`,
    (err, res) => {
      let result = "";
      if (err) {
        result = "Bulk Insert Failed";
        console.log("get error", err);
      } else {
        console.log("update success", res);
        result = "Bulk insert completed";
      }
      response.send(result);
    },
  );
};

module.exports = {
  getCricketersDetails,
  onBulkInsert,
  getCricketer,
  onHandleUpdateUsingFunction,
  onHandleUpdate,
  onHandleDeleteUsingProcedure,
  onHandleDelete,
  onInsertUsingFunction,
  onInsert,
};
