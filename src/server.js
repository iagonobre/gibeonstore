const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () => {
  console.log(`GibeonStore rodando em http://localhost:${PORT}`);
});
