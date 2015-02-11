# Front-end/Web Development UI assignment for interviewees

TODO: Update data set to use commits rather than Gists (https://developer.github.com/v3/repos/commits/#list-commits-on-a-repository)

A sample set of data (taken from Github's public APIs) is provided. Using this data, please construct a UI which will allow users to do the following:

* When the user hits the landing page, they should be presented with a brief overview of the first 10 Gists from the data set (in this case "the first 10" can be any arbitrary 10, order doesn't matter), with some way to view the remaining Gists. Keep in mind that the sample data set has only 30 items, but a real data set may have many more than that. This summary should include the following information for each Gist:
  * Description
  * Creation date
  * Owner's login name (if present)
  * The files included in the Gist
* The user should be able to select a file from a Gist to view its contents (TODO: need to provide mechanism to fetch file data)
* When a user is viewing a file, they should have the option to edit its contents, with the ability to save these changes
  * If a user closes a file and then re-opens it, any previous changes should still be present (Note: this requirement does not hold if the page is reloaded - i.e. it is acceptable for changes to be stored in-memory only)
* Users should be able to tell easily which Gists/files they've made changes to
