# Elastic Search - WTF is going on
* I have a cluster running on bonsai (login - NYU email)

* Creating indeces - https://docs.bonsai.io/docs/creating-your-first-index

## Commands I ran to create and delete indeces

* Access URL - https://3zsbr8vud3:ydhfogx7da@india-by-numbers-5497184867.us-east-1.bonsaisearch.net

* **To get the data**

  `curl -XGET 'https://3zsbr8vud3:ydhfogx7da@india-by-numbers-5497184867.us-east-1.bonsaisearch.net/india'`

  Right now, the data is split as follows -

  ```
  -- india
    -- wars
      -- name
      -- year
    -- battles
      -- name
      --year
  ```

* **To delete all indeces**

  `curl -XDELETE 'https://3zsbr8vud3:ydhfogx7da@india-by-numbers-5497184867.us-east-1.bonsaisearch.net/india'`

* **To add more indeces**

  `curl -XPUT https://3zsbr8vud3:ydhfogx7da@india-by-numbers-5497184867.us-east-1.bonsaisearch.net/india`

* **Add JSON file to a type**
  This was done programatically at /api/index.js

# References
* https://docs.bonsai.io/docs/nodejs
* https://devcenter.heroku.com/articles/bonsai




 curl -H 'Content-Type: application/json' -XPUT  'https://3zsbr8vud3:ydhfogx7da@india-by-numbers-5497184867.us-east-1.bonsaisearch.net/india/battle/1' -d "{"test":"test"}"
