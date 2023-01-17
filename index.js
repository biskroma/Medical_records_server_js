'use strict';

const app = require('./app');
// Set app port
const PORT = process.env.port || 3005;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});