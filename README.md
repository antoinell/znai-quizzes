# znai-quizzes

## This project has been setup to illustrate the possibility to extend znai

In order to try out

- clone znai branch znai-extensibility from antoinell's fork https://github.com/antoinell/znai/tree/znai-extensibility
- clone this repository in a parallel directory
- build znai with `cd ../znai; mvn clean install`
- build this project with `mvn clean install`
- run either `znai:preview` in the  `znai-quizzes-demo` module or start an http server to browse the generated documentation

At the moment the application does not run properly.

In chrome, in the javascript console one sees this error :

```
znai-quizzes-extension.js:14 Uncaught Error: Calling `require` for "react" in an environment that doesn't expose the `require` function.
    at znai-quizzes-extension.js:14:8
    at znai-quizzes-extension.js:50:10
    at znai-quizzes-extension.js:3:290
    at znai-quizzes-extension.js:76:14
    at znai-quizzes-extension.js:3:290
```
