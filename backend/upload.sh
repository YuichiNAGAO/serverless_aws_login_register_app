zip -rq archive.zip features/ utils/ node_modules/ index.js package.json
aws lambda update-function-code   --function-name sample-app-backend  --zip-file fileb://archive.zip 