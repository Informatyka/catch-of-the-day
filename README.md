# Catch-of-the-Day
A toy React app for managing a menu, orders, and inventory.

## Core libraries used
* React, react-router
* Firebase: auth, database
* Stylus

### Dev setup

```
// Verified using node@8 and node@9 from homebrew
➜ npm install
➜ npm start
```

### Release build
```
➜ npm run build
```

### Netlify

#### Install
```
➜ npm install netlify-cli -g
```

#### Deploy

##### Test
```
➜ netlify deploy
```

##### Prod
```
➜ netlify deploy --prod
```

### Gotchas
If hosting the app on a web server, you may need to setup a redirect rule so that all requests get routed through index.html

For Netlify, the following should work:
```
➜ echo '/*    /index.html   200' > build/_redirects
```
