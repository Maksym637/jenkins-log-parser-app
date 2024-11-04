## jenkins-log-parser-app
- - -
Prepared by __Maksym Oliinyk__
- - -
### Description
This application handles unparsed Jenkins logs from external API
- - -
### Technologies
_JavaScript_ is used as the programming language in a _node v20.16.0_ environment
- - -
### Project structure
The project has the following structure:
- app
    - _public_ -  holds static files and assets that can be directly served by the web server, such as the main `index.html` file and favicon that don’t change during runtime
    - _src_
        - _components_ - contains all the React components for application, organized as individual JavaScript or JSX files, such as `home.js`, `login.js`, `register.js`, `profile.js`, and `jenkins-history.js`
        - _images_ - stores image files used in the app. These images are typically imported and used within components
        - _styles_ - contains CSS files for styling your components, like `home.js`, `login.js`, and others, keeping styles organized and modular
- - -
### Project execution
1. Install all dependencies
```bash
npm install
```
2. Start application
```bash
npm run start
```
- - -
