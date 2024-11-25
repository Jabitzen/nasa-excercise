# Nasa-exercise

This project is a coding exersize involving utilization of the NASA Mars Rover Api to dowload and store images from a specific day locally.

The exact prompt is as follows:

"We would like you to complete a programming exercise that uses the NASA API(https://api.nasa.gov/) to build a project hosted on GitHub. Specifically, the task is to call the Mars Rover API and select a picture taken on a given day, then download and store each image locally."

## Acceptance Criteria

* The application should pull images for the following dates by reading from a text file:

    * 02/27/17
    * June 2, 2018
    * Jul-13-2016
    * April 31, 2018

* The code must be written in TypeScript using Node.js or another server-side JavaScript runtime.
* We should be able to build and run the project locally after submission.
* Include all relevant documentation (e.g., a README file) in the repository.

### Bonus:
* Bonus 1: Display the images in a web browser using React or Svelte.
* Bonus 2: Include unit tests, static analysis, performance tests, or any other best practices that align with the definition of "Done."
* Bonus 3: Have the application run in Docker.

## nasa-image-viewer-server
The backend for this project can be found in the nasa-image-viewer-server directory. It was designed using typescript with express. For fetching from the NASA API, axios was used.

## nasa-image-viewer-client
The frontend for this project can be found in the nasa-image-viewer-client directory. It was designed using the react framework.
