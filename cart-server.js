const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000; // 使用新端口
const DB_FILE = path.join(__dirname, 'cart-db.json');

// 初始化数据文件
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ cart_items: [] }, null, 2));
}

app.use(cors());
app.use(express.json());

// 数据读写辅助函数
const readCart = () => JSON.parse(fs.readFileSync(DB_FILE));
const writeCart = data => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// 购物车专属路由
app.get('/cart/items', (req, res) => {
  res.json(readCart().cart_items);
});

app.get('/cart/items/:id', (req, res) => {
  const db = readCart();
  const id = parseInt(req.params.id);
  const item = db.cart_items.find(i => i.id === id);
  if (!item) {
    return res.status(404).send('Item not found');
  }
  res.json(item);
});

app.post('/cart/items', (req, res) => {
  const db = readCart();
  const newId = db.cart_items.length > 0 ? Math.max(...db.cart_items.map(i => i.id)) + 1 : 1;
  const newItem = { ...req.body, id: newId };
  db.cart_items.push(newItem);
  writeCart(db);
  res.status(201).json(newItem);
});

app.patch('/cart/items/:id', (req, res) => {
  const db = readCart();
  const index = db.cart_items.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).send('Not found');
  
  db.cart_items[index] = { ...db.cart_items[index], ...req.body };
  writeCart(db);
  res.json(db.cart_items[index]);
});

app.delete('/cart/items/:id', (req, res) => {
  const db = readCart();
  const id = parseInt(req.params.id);
  const index = db.cart_items.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).send('Item not found');
  }
  // 从数组中删除该商品
  db.cart_items.splice(index, 1);
  writeCart(db);
  res.status(204).send(); // 删除成功，返回无内容状态码
});

// 启动服务
app.listen(PORT, '0.0.0.0', () => {
  console.log(`购物车服务运行中: http://localhost:${PORT}`);
});