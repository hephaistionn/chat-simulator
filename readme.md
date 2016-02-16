# ChatSimulator
This app is a chat simulation.
All frontend side .

# Tech
* [React] - HTML enhanced for web apps!
* [event-emitter] - Tool used to link the store, the view and actions

# Architecture
Flux
(Model, View, Actions)

Views haven't internal states and logic.<br />
Actions update global model.<br />
Actions are triggered by views.<br />
When a action updates the model, the view is redrawn.<br />


# Installation

You need Gulp installed globally:

```sh
$ npm i -g gulp
```

```sh
$ git clone [git-repo-url] ChatSimulator
$ cd ChatSimulator
$ npm install
$ gulp build
$ gulp serve
```

# Tests

You need Karma installed globally:
```sh
$ npm install -g karma-cli
```

Launch functional tests.
```sh
$ karma start karma.conf.js
```

License
----

MIT
