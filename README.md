# Front-End/Web Development UI Assignment for Interviewees

## Part 1: UI/UX/Interaction Design and Development

A sample set of data (taken from Github's public APIs) is provided. Using this data, please construct a UI which will allow users to do the following:

* When the user visits the landing page, they should be presented with a brief overview of the first 25 commits from the data set (in this case "the first 25" can be any arbitrary 25, order doesn't matter), with some way to view the remaining commits. Keep in mind that the sample data set has only 150 items, but a real data set may have many more than that. This summary should include the following information for each commit:
  * Author's name
  * Commit time (either the author's commit date or the committer's commit date is acceptable)
  * The first 50 characters of the commit message
  * The counts of additions/deletions
  * The files included in the commit
* The user should be able to select a file from a commit to view the patch contents for that file (TODO: need to provide mechanism to fetch file data)
* The user should also be able to view the full commit message
* When a user is viewing the commit message, they should have the option to edit its contents, with the ability to save these changes
  * If a user closes the commit message and then re-opens it, any previous changes should still be present (Note: this requirement does not hold if the page is reloaded - i.e. it is acceptable for changes to be stored in-memory only)
* Users should be able to tell easily which commits they've made changes to

* TODO: Need to explain the JS API provided to get at the data set

## Part 2: REST API Design

The UI developed in Part 1 relies entirely on a set of data loaded direclty into the browser as a statically-linked script. In the real world, though, this data would be fetched and updated from a remote server using a RESTful API.

For this section, we want you to design a RESTful API for accessing this Github commit data. Deliverables should be a list of endpoints, their expected inputs (query strings, request bodies, etc.), and any expected output.

* TODO: list the operations the API should support

## (Optional) Part 3: REST API Development

**Note:** This section is entirely optional! Complete only if you're so inclined.

* Using the UI you developed in Part 1, and the REST API you designed in Part 2, write your own REST API implementation and have your UI talk to that API rather than the static data currently supplied
* TODO: need to point out which areas/files will need to be updated
