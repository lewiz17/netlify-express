const app = require('./express/server');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Local app listening on port 3000!'));
