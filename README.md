# Calendar 

#### Project Statement

- Implement a "Google Calendar" week view (7 days), using Material UI with indexedDB as its database.

#### Pre-Requisites

##### Ignore if Environment is already set up

Download and Install [NodeJS](https://nodejs.org/en/)
Install the package manager [npm](http://npmjs.com/).
Use the package manager [npm](http://npmjs.com/) to install ReactJS.

Run the following commands to check for successful installation
```npm
node --version
npm --version
```

#### Initial Set-up

Use the package manager [npm](http://npmjs.com/) to install node packages required. Navigating to the project folder run the following command. 

```npm
npm install
```

The application will take a while to install all the dependencies

##### Running the Project
In the Project folder run the following command 

```npm
npm start
```

The application should automatically open itself in the browser on http://localhost:3000

#### Running Test Cases
##### Prerequisite for cypress - Must be running the application - Please refer the Running the Project section
###### Running in Headed Mode
In headed mode the user can watch the test case interact with application \
In the Project folder run the following command watch the test cases run.
```npm
npm run cy:open
```
The above will open a window, please select the index.js file to watch the test cases run.

###### Running in Headless Mode
In headless mode the user cannot watch the test case interact with application \
It will only run the test cases in the terminal \
In the Project folder run the following command watch the test cases run.
```npm
npm run cy:run
```

###### Running the report
Following the Prerequisite being complete run the following command.

```npm
npm run e2e:report
```
 The link of the report is made available on the terminal.\
Please navigate to the path to see the complete report

#### Issues
Not tested in Windows.\
Needs to wait for a while to let seeding of indexedDB.\
Couldn't test the availability of data in test cases.\
Needs to have a blank indexedDB during test cases.

#### Demo Link

Please find the project hosted at https://calender-index.netlify.app/

# License

[MIT](https://choosealicense.com/licenses/mit/)
