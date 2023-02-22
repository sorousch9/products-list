

1-mpm install
2-npm install -g json-server
3-npm start
4-json-server --watch db.json --port 3004

If you get the error "json-server cannot be loaded because running scripts is disabled on this system", open your PowerShell as an administrator and set its execution policy with the Set-ExecutionPolicy command.
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser




### `npm start`
json-server --watch db.json --port 3004

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).