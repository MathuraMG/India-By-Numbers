const express = require('express')
const elasticsearch = require('elasticsearch');
const app = express()

const elasticIndex = 'india';
let bonsai_url = process.env.BONSAI_URL;
const esClient = new elasticsearch.Client({
  host: bonsai_url,
  log: 'error'
});

let indexData = [];

function search(index, body) {
  return esClient.search({index: index, body: body});
};

function getData(request, response) {
  let body = {
    size: 20,
    from: 0,
    query: {
      multi_match: {
        query: request.query.value,
        fields: ['name', 'year'],
        operator: "and",
        fuzziness: 2
      }
    }
  };

  search(elasticIndex, body)
  .then(results => {
    console.log(`returned results from india index`);
    response.send(results.hits.hits);
    response.end();
  })
  .catch(console.error);

};

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.use('/', express.static('public'));
app.get('/getResult', getData);
