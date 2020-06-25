[![Maintainability](https://api.codeclimate.com/v1/badges/66d40f027894d7ee1a93/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/earth-dashboard-fe/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/66d40f027894d7ee1a93/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/earth-dashboard-fe/test_coverage)

# Planet Data

You can find the deployed project at [Planet Data](https://www.planetdata.world).

## Contributors

|                                                           [Westley Feller](https://github.com/fwesss)                                                           |                                                          [Stephen Freeman](https://github.com/Stephenfre)                                                           |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars1.githubusercontent.com/u/10150898?s=400&u=aa205fcb0741fc11eb9625647d817d8fd298c0a6&v=4" width = "200" />](https://github.com/fwesss) | [<img src="https://avatars2.githubusercontent.com/u/49298939?s=400&u=d95475e4abdb855c09bedbc5a2fded3ec88739b1&v=4" width = "200" />](https://github.com/Stephenfre) |
|                                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/fwesss)                                       |                                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Stephenfre)                                       |
|                          [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                          |                            [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                            |

<br>
<br>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Project Overview

[Trello Board](https://trello.com/b/5gHETvxv/earth-dashboard)

[Product Canvas](https://www.notion.so/Earth-Dashboard-f2164d30ed994ecab5894212efcc2000)

[UX Design files](https://www.figma.com/file/fgJvqVQEW8c13bPdt109BP/Earth-Dashboard?node-id=418%3A888)

# Project Description

A realtime real world dashboard to teach middle school students the fundamentals of data visualization using real world / realtime earth data pulled and refreshed from a variety of sources.

### Key Features

- Tutorial to show a user the basics on how to properly use the app.
- Multiple lessons for different aspects of planet earth that are interesting and important.
- Interactive data visualization within each lesson that users can manipulate themselves to see the direct changes in the visualizations.

## Tech Stack

### Front end built using:

#### React

#### Mapbox

#### D3

#### Redux with Redux Toolkit

#### Front end deployed to AWS Amplify

#### [Back end](https://github.com/Lambda-School-Labs/earth-dashboard-ds) built by DS using Flask and AWS lambda functions

# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

    * REACT_APP_CONFIRMED_CASES_MAPBOX_STYLE - pulls in styling from a saved mapbox
     map
    * REACT_APP_CONFIRMED_CASES_MAPBOX_STYLE_DARK - Alternative map style
     used in dark mode
    * REACT_APP_CONFIRMED_CASES_MAPBOX_TOKEN - needed to access mapbox api to serve
     maps
    * REACT_APP_TRACKING_ID - ID for Google Analytics

# Testing

- React Testing Library (Integration)
- Jest(Unit)

# Installation Instructions

1.  `yarn install`
2.  `yarn start`
3.  Add .env file to local project. See environment variables above. Variables
    are stored in 1password.

This repo uses git-secrets to prevent to prevent commiting secrets. After
installing packages, install and configure git-secrets:

## git-secrets Instructions

### Step 1: Install to system

#### \*nix (Linux/macOS)

```
git clone https://github.com/awslabs/git-secrets.git
cd git-secrets
make install
```

#### Windows

```
git clone https://github.com/awslabs/git-secrets.git
cd git-secrets
PS > ./install.ps1
```

#### Homebrew (for macOS users)

`brew install git-secrets`

### Step 2a (DS): Install githooks

```
cd /path/to/your/repo
git secrets --install
git secrets --register-aws
git secrets --add '^.*pk\..*$'
git secrets --add '^.*postgres://.*$'
```

AWS tokens will be found by default.

'^._pk\.._\$' is a regex that matches whole strings that start with 'pk
.'. This is the basic format of mapbox tokens so those will be found if saved
anywhere in the repo.

'^._postgres://._\$' is a regex that matches whole strings that start with
'postgres://' which should take care of Postgres URLs. If you're using
separate variables for host, user, password, and database, then those
variables will not be detected. Use a URL connection where possible.

### Step 2b (Web): Install githooks

```
cd /path/to/your/repo
git secrets --install -f
git secrets --register-aws
git secrets --add '^.*pk\..*$'
git secrets --add '^.*postgres://.*$'
```

AWS tokens will be found by default.

'^._pk\.._\$' is a regex that matches whole strings that start with 'pk
.'. This is the basic format of mapbox tokens so those will be found if saved
anywhere in the repo.

'^._postgres://._\$' is a regex that matches whole strings that start with
'postgres://' which should take care of Postgres URLs. If you're using
separate variables for host, user, password, and database, then those
variables will not be detected. Use a URL connection where possible.

### Step 3 (Web): Reinstall husky hooks

Installing the git-secrets hooks will overwrite those installed by husky so
we need to add those back in.

Open /path/to/repo/.git/hooks/pre-commit and add the following line at the
bottom of the file:
`. "$(dirname "$0")/husky.sh"`

## Other Scripts

    * analyze - generate a visualization of the app's bundles and dependencies
    * build - creates a build of the application
    * eject - copy the configuration files and dependencies into the project so you have full control over them
    * format - runs prettier against all files not in .gitignore
    * lint - checks for errors in .js files
    * lint:fix - checks for errors in .js files and fixs those that can be
     auto-fixed
    * prettier: runs prettier
    * start - starts the production server after a build is created
    * test - runs tests in watch mode
    * test:CI - test script that runs on Github action for each push and pull
     request
    * test:coverage - runs tests and generates coverage report
    * validate - runs format, lint, build, and test:coverage. Should be run
     prior to submitting pull requests to ensure code adheres to project
      style guidelines, tests pass, and src builds.

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](https://github.com/Lambda-School-Labs/earth
-dashboard-ds) for details on the backend of our project.
