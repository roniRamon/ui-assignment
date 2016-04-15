# Front-End/Web Development UI Assignment for Interviewees

## Part 1: UI/UX/Interaction Design and Development

A sample set of data (taken from Github's public APIs) is provided. Using this data, please construct a UI which will allow users to do the following:

* When the user visits the landing page, they should be presented with a brief overview of the first 25 commits from the data set (in this case "the first 25" can be any arbitrary 25, order doesn't matter), with some way to view the remaining commits. Keep in mind that the sample data set has only 200 items, but a real data set may have many more than that. This summary should include the following information for each commit:
  * Author's name
  * Commit time (either the author's commit date or the committer's commit date is acceptable)
  * The first 50 characters of the commit message
  * The counts of additions/deletions
  * The files included in the commit
* The user should be able to select a file from a commit to view the patch contents for that file
* The user should also be able to view the full commit message
* When a user is viewing the commit message, they should have the option to edit its contents, with the ability to save these changes
  * If a user closes the commit message and then re-opens it, any previous changes should still be present (Note: this requirement does not hold if the page is reloaded - i.e. it is acceptable for changes to be stored in-memory only)
* Users should be able to tell easily which commits they've made changes to

The scaffold has been set up for you to use ES2015/Babel/Webpack/BrowserSync/Sass/Mocha.
Run `npm install` then `npm start` to start the server in development mode or `npm run build` to start a production build.

The data set is stored as a json file in `server/db.json` and should only be accessed through a simple RESTful API at http://localhost:8080. You should read the `server/index.js` and be able to use the API accordingly.
### Note: All other libraries/frameworks/dependencies are prohibited. That means no jQuery, no Angular, no React. This is to test your raw JS skills.



## Part 2: REST API Implementation

For this section, we want you to improve the RESTful API based on your consumption of said API in Part 1. Identify problems in the code as well as the API design as you would in a code review and fix those problems.

Deliverables should include code changes as well as a short paragraph explaining what you changed and why you think it is necessary.
### Note: API changes should be non-breaking and fully functional with Part 1 of your assignment.
Hint: What's a good way to make breaking API changes while maintaining back-ward compatibility?
