{
  "name": "googlebooks-app",
    "version": "1.0.0",
    "description": "",
    "main": "server/server.js",
    "scripts": {
      "start": "node server/server.js",
      "develop": "concurrently \"cd server && npm run watch\" \"cd client && npm run dev\"",
      "install": "cd server && npm i && cd ../client && npm i",
      "build": "concurrently \"cd server && npm run build\" \"cd client && npm run build\"",
      "render-build": "npm install && npm run build"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "@types/bcrypt": "^5.0.2",
      "@types/express": "^4.17.21",
      "@types/jsonwebtoken": "^9.0.6",
      "@types/node": "^20.14.8",
      "concurrently": "^8.2.0",
      "dotenv": "^16.4.5",
      "nodemon": "^3.1.0",
      "typescript": "^5.4.5"
    },
    "dependencies": {
      "@apollo/server": "^4.12.0",
      "body-parser": "^2.2.0",
      "cors": "^2.8.5",
      "graphql": "^16.11.0"
    }
  }
  
