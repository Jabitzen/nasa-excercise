# Nasa-exercise

This project is a coding exersize involving utilization of the NASA Mars Rover Api to dowload and store images from a specific day locally.

The exact prompt is as follows:

"We would like you to complete a programming exercise that uses the NASA API(https://api.nasa.gov/) to build a project hosted on GitHub. Specifically, the task is to call the Mars Rover API and select a picture taken on a given day, then download and store each image locally."

## Acceptance Criteria

<<<<<<< HEAD
- The application should pull images for the following dates by reading from a text file:

  - 02/27/17
  - June 2, 2018
  - Jul-13-2016
  - April 31, 2018

- The code must be written in TypeScript using Node.js or another server-side JavaScript runtime.
- We should be able to build and run the project locally after submission.
- Include all relevant documentation (e.g., a README file) in the repository.

### Bonus:

- Bonus 1: Display the images in a web browser using React or Svelte.
- Bonus 2: Include unit tests, static analysis, performance tests, or any other best practices that align with the definition of "Done."
- Bonus 3: Have the application run in Docker.

## nasa-image-viewer-server

The backend for this project can be found in the nasa-image-viewer-server directory. It was designed using typescript with express. For fetching from the NASA API, axios was used.

## nasa-image-viewer-client

The frontend for this project can be found in the nasa-image-viewer-client directory. It was designed using the react framework.

## how to use the program

1. First edit dates.txt with specified dates in data directory under "nasa-image-viewer-server/data".
2. Build the backend by running "npx tsc"
3. If you need to shutdown the backend server, use ctrl + c
4. Run the application from the nasa-image-viewer-server directory using "node dist/app.js"
5. CD into nasa-image-viewer-server-frontend and run "npm run start"
6. From the client, click the "fetch-images" button to retrieve the images based on the dates requested.
7. After the images are downloaded click the "Loading Images" button to display in the frontend

## Future improvements

1. Add to the front end to input file with dates specified instead of modifying the local dates file in the data directory.
2. Ideally the loading of the images should be done with the fetch, and optimizations can be made to improve the speed of download
3. Implement caching, so that when a date that is specified already has been download, we pull from the directory instead of calling the api again
4. Implement more for static analysis and unit testing.
5. Improve docker support.
6. Fetch images ideally should have the images stay, sometimes they go away.
=======
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
>>>>>>> 5b5b95be82579af4f97e8c80acacd646e83e2e16
