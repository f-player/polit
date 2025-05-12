const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const filename = path.join(__dirname, '../../db/stocks.json');
  const data = fs.readFileSync(filename, 'utf8');
  return {
    statusCode: 200,
    body: data,
  };
};
