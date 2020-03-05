'use strict';

require('./loadenv');

const server = require('./server');
const logger = require('./util/logger');

const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
  console.log('Express server started on port: ' + port);
});
