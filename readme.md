# ChatSimulator
This app is a chat simulation.
All frontend side .

# Tech
* [React] - HTML enhanced for web apps!
* [event-emitter] - Tool used to link the store, the view and actions

# Architecture
Flux
(Model, View, Actions)

The view has no internal states and no logic.<br />
Actions update the global model.<br />
Actions are triggered by the view.<br />
When a action updates the model, the view is redrawn.<br />


# Installation

You need Gulp installed globally:

```sh
$ npm i -g gulp
```

```sh
$ git clone https://github.com/hephaistionn/ChatSimulator.git
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
