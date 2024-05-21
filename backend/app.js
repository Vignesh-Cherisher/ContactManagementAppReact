import express, { Router } from 'express'
import { readFileSync, writeFile } from 'fs'
import path from 'path'

const defaultPath = './index.json'
const app = express()
const router = Router()
const __dirname = path.resolve(path.dirname(''))

app.use(express.static(__dirname))
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});

router.get('/api/get-contact-items',  (req, res) => {
  const data = readFileSync(defaultPath, { encoding: 'utf8', flag: 'r' });
  let parsedData = {}
  try{
    parsedData = JSON.parse(data).contacts.byId
  } catch(err) {
    parsedData = {}
  }
  res.json(parsedData);
});

router.get('/api/get-order-history',  (req, res) => {
  const data = readFileSync('./orders.json', { encoding: 'utf8', flag: 'r' });
  let parsedData = {}
  try{
    parsedData = JSON.parse(data)
  } catch(err) {
    parsedData = {}
  }
  res.json(parsedData);
});

app.post('/api/place-order', (req,res) => {
  const postData = req.body;
  const index = postData.orderNo
  const data = readFileSync('./orders.json', {encoding: 'utf-8', flag:'r'})
  let parsedData = {}
  try{
    parsedData = JSON.parse(data)
    parsedData[index] = postData
  } catch(err) {
    parsedData = {}
  } finally {
    writeFile('./orders.json', JSON.stringify(parsedData, null, 2), (error) => {
      if(error) {
        console.log(error)
        return
      } else {
        console.log('Order placed successfully')
      }
    })
  }
  res.json('success')
})

app.post('/api/update-active-order', (req,res) => {
  const postData = req.body.orderNo;
  const data = readFileSync('./orders.json', {encoding: 'utf-8', flag:'r'})
  let parsedData = {}
  try{
    parsedData = JSON.parse(data)
    parsedData[postData].isActive = false
  } catch(err) {
    parsedData = {}
  } finally {
    writeFile('./orders.json', JSON.stringify(parsedData, null, 2), (error) => {
      if(error) {
        console.log(error)
        return
      } else {
        console.log('Order updated successfully')
      }
    })
  }
  res.json('success')
})

app.use('/',router)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});