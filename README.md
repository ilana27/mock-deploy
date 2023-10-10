# Mock-inguyen4-sridley

## Sprint 3: Mock ReadMe

[Repo](https://github.com/cs0320-f23/server-jzdzilowska-22ridley.git)

In a nutshell: Frontend of a web application allowing users to load, view, and search
CSV files through a command line tool.

Team members: inguyen4 (@ilana27) and sridley (@22ridley). We worked on the vast majority of the project by pair programming, where we sat together and switched roles as the driver/navigator. We also developed on individual branches, and practiced merging into main.

Total estimated time: ~20 hours

## Design choices:

TO DO ->

Here are a few notable design choices we made:

- We chose to ...
- We chose to represent the current 'mode' that the program is in with a share state of a boolean value. For this shared boolean, true represents 'brief' mode, the default, and false represents 'verbose' mode.

Moreover, here are some sources we used to learn how to implement specific pieces of functionality:

- [Here]https://www.bekk.christmas/post/2020/22/create-a-generic-table-with-react-and-typescript is the source we used to learn how to use
  Typescript to dynamically create an HTML table.
- [Here]https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react is the source we used to learn how to make our REPLHistory box autoscroll.

## Errors/Bugs:

There are no remaining bugs in our program that we are aware of.

## Tests:

TO DO ->

In testing, we ...

## Running the tests:

To run the tests in our program, first run `npx playwright install` to install Playwright, which allows us to visually see tests that interact with the frontend of our application. Next, run `npx playwright test` to simply run the tests in the terminal, or `npx playwright test --ui` to see the UI application corresponding to the tests.

## Running the program:

To run our program locally, first run `npm install`, to ensure that you have all dependencies needed by our program. Next, run `npm start`, which will start the program running locally on your computer. Then, navigate to http://localhost:8000/ to use the program!
