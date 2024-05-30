import express, { Router } from "express";
import { readFileSync, writeFile } from "fs";
import path from "path";

const defaultPath = "./index.json";
const app = express();
const router = Router();
const __dirname = path.resolve(path.dirname(""));

app.use(express.static(__dirname));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    'POST,GET,OPTIONS,PUT,DELETE'
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/api/get-contact-items", (req, res) => {
  const data = readFileSync(defaultPath, { encoding: "utf8", flag: "r" });
  let parsedData = {};
  try {
    parsedData = JSON.parse(data).contacts.byId;
  } catch (err) {
    parsedData = {};
  }
  res.json(parsedData);
});

router.get("/api/get-phone-number-list", (req, res) => {
  const data = readFileSync(defaultPath, { encoding: "utf8", flag: "r" });
  let parsedData = {};
  try {
    parsedData = JSON.parse(data).phones.byId;
  } catch (err) {
    parsedData = {};
  }
  res.json(parsedData);
});

router.get("/api/get-email-list", (req, res) => {
  const data = readFileSync(defaultPath, { encoding: "utf8", flag: "r" });
  let parsedData = {};
  try {
    parsedData = JSON.parse(data).emails.byId;
  } catch (err) {
    parsedData = {};
  }
  res.json(parsedData);
});

router.get("/api/get-order-history", (req, res) => {
  const data = readFileSync("./orders.json", { encoding: "utf8", flag: "r" });
  let parsedData = {};
  try {
    parsedData = JSON.parse(data);
  } catch (err) {
    parsedData = {};
  }
  res.json(parsedData);
});

app.post("/api/delete-contact-item", (req, res) => {
  let contactId = req.body;
  contactId = contactId.id
  const data = readFileSync(defaultPath, { encoding: "utf-8", flag: "r" });
  let parsedData = {};
  let allIdArray = [];
  let contactData = {};
  let subDataId = "";
  try {
    parsedData = JSON.parse(data);
    contactData = parsedData.contacts.byId;
    
    subDataId = contactData[contactId].phone;
    delete parsedData.phones.byId[subDataId];
    allIdArray = parsedData.phones.allIds;
    parsedData.phones.allIds.splice(allIdArray.findIndex((element) => element === subDataId), 1);
    
    subDataId = contactData[contactId].email;
    delete parsedData.emails.byId[subDataId];
    allIdArray = parsedData.emails.allIds;
    parsedData.emails.allIds.splice(allIdArray.findIndex((element) => element === subDataId), 1)

    allIdArray = parsedData.contacts.allIds
    parsedData.contacts.allIds.splice(allIdArray.findIndex((element) => element === contactId), 1);
    delete parsedData.contacts.byId[contactId];
  } catch (err) {
    console.log(err)
    parsedData = JSON.parse(data);
  } finally {
    writeFile(defaultPath, JSON.stringify(parsedData, null, 2), (error) => {
      if (error) {
        console.log(error);
        return;
      } else {
        console.log("Deleted successfully");
      }
    });
  }
  res.json("success");
});

app.post("/api/post-contact-item", (req, res) => {
  const postData = req.body;
  const data = readFileSync(defaultPath, { encoding: "utf-8", flag: "r" });
  let parsedData = {};
  try {
    console.log(postData)
    parsedData = JSON.parse(data);
    parsedData.contacts.byId[postData.contact.id] = postData.contact;
    parsedData.phones.byId[postData.phoneGroup.id] = postData.phoneGroup;
    parsedData.emails.byId[postData.emailGroup.id] = postData.emailGroup;
    if(parsedData.contacts.allIds.findIndex((element) => element === JSON.stringify(postData.contact.id)) === -1 ) {
      parsedData.contacts.allIds.push(JSON.stringify(postData.contact.id))
      parsedData.phones.allIds.push(JSON.stringify(postData.phoneGroup.id))
      parsedData.emails.allIds.push(JSON.stringify(postData.emailGroup.id))
    }
  } catch (err) {
    console.log(err);
    parsedData = {};
  } finally {
    writeFile(defaultPath, JSON.stringify(parsedData, null, 2), (error) => {
      if (error) {
        console.log(error);
        return;
      } else {
        console.log("Contact Added Successfully");
      }
    });
  }
  res.json("success");
});

app.post("/api/update-active-order", (req, res) => {
  const postData = req.body.orderNo;
  const data = readFileSync("./orders.json", { encoding: "utf-8", flag: "r" });
  let parsedData = {};
  try {
    parsedData = JSON.parse(data);
    parsedData[postData].isActive = false;
  } catch (err) {
    parsedData = {};
  } finally {
    writeFile("./orders.json", JSON.stringify(parsedData, null, 2), (error) => {
      if (error) {
        console.log(error);
        return;
      } else {
        console.log("Contact Added Successfully");
      }
    });
  }
  res.json("success");
});

app.use("/", router);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/");
});
