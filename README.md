# React Redux TypeScript Starter Kit

## Quickstart

```
git clone https://github.com/sharpcoding/react-redux-typescript-starter-kit.git
cd react-redux-typescript-starter-kit
npm i
npm run dev
```

everything goes OK, a new browser tab window tab opens automatically pointing to http://localhost:9000/. 

Chrome Web Browser with [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension) is recommended. You can play around with user interface and see actions with store changes in Redux DevTools Inspector, change code and see updates as they appear (by hot-reloading).

![alt text](/docs/webpack-app.jpg "Starter Kit Screen")


If this seems too much, see the [running demo](https://sharpcoding.github.io/react-redux-typescript-starter-kit/demo).

## Purpose

This starter kit summarizes good practices in front-end development, focused around the following front-end technology stack:

- [x] React v15
- [x] Redux v3.7
- [x] TypeScript v2.7
- [x] d3 v4.7
- [x] SASS/LESS
- [x] Webpack v4.1
- [x] tslint v2.7
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] Jest

The purpose of this repository is to:
- encourage developers community to use TypeScript with React Redux development,
- provide a fast way to start writing mature and streamlined front-end applications.

# General TypeScript remarks

TypeScript is - we believe - a great way to write single page applications today. Besides type-safety (understood as detecting errors directly in IDE or at transpilation phase), there plenty of other benefits:

- targeting different existing/old ECMAScript versions
- targeting future ECMAScript versions, i.e. incorporating recommendations/proposals - right here and right now
- seamless handling of different bundle systems like UMD, AMD, CommonJS
- intellisense in the IDE (!)
- dedicated linter (tslint)
- active development and great community

> TypeScript is a (kind of) powered exoskeleton over ECMAScript (of the development phase)

Having this said, it should be emphasized that TypeScript is not used in runtime, so we don't talk about a kinda ECMAScript-on-steroids replacement for your browser - TypeScript is created for developers and for development purposes only.

Despite providing lots of benefits, there are special ares of interest when developing with TypeScript:

- at first, doing things right in TypeScript might be challenging for a seasoned JavaScript developer; as every technology it requires a little bit to learn as there are something like 15+ major versions published; the good news is: it is not "all or nothing" domain, adopting to TypeScript might (and should) be gradual/incremental
- despite popular belief, not every JavaScript statement is a correct TypeScript statement, this gets clear especially when dealing with JavaScript types implicit conversions (yet implicit conversions is the last thing we do want to happen when using TypeScript)
- to summarize two points above: using TypeScript might require a little bit of investment and, more importantly, changed mindset
- partial import in TypeScript is as good as the typings (d.ts) are, e.g. lodash typings do not currently support partial loading, resulting in much bigger bundle sizes
- loading module variables out of the SCSS into TypeScript module is not seamless - it requires writing a dedicated scss.d.ts file
- some libraries that might quite well in pure ECMAScript, are getting cumbersome when used in TypeScript (for real type safety and other benefits, it is not enough to provide typings to a JavaScript library / module)

# Decisions made

- [x] Feature-oriented (not role-oriented) repository code structure
- [x] Typescript and Webpack path aliases (defining "semantic namespaces")
- [x] index.ts/index.tsx re-exports
- [x] Redux store:
  - [x] React state is an interface
  - [x] Action types are defined as constants
  - [x] Actions are defined as ES6 classes
  - [x] Actions acceptable by a reducer make-up a discriminated union type
  - [x] Action creators are plain functions
  - [x] Reducers are plain functions
  - [x] Redux-thunk effects are higher-order functions
- [x] tslint with [VSCode tslint extension](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
- [x] Webpack-npm scripts for [development](/webpack/dev.config.js), [publishing](/webpack/prod.config.js) and [bundle analysis](/webpack/analyze.config.js)
- [ ] Bootstrap v4
- [ ] Custom SCSS with variables exported to ECMAScript
- [x] Jest snapshot testing

Throughout paragraphs below I go a little bit into decision details regarding TypeScript Redux programming, yet, it all can be summarized with the following rule:

> use constructs and solutions provided by TypeScript whenever possible

This makes application of helper-libraries like [react-actions](https://github.com/redux-utilities/redux-actions) redundant. Referring to react-actions **typings** example, I found it really cumbersome, awkward to use and - in the context of type safety - limiting.

Another example might be [react-bootstrap](https://react-bootstrap.github.io/) - as for version 0.3 it provides little or no benefits compared to using plain Bootstrap (e.g. no forms validation, still targeting Bootstrap v3), yet it makes another dependency in [package.json](/package.json). 

## Redux

Solutions applied in the Redux section are influenced by [Reactive libraries for Angular](https://github.com/ngrx/platform)

### State is just an interface

```javascript
interface IEngine {
  started: boolean;
  currentGear: number;
}
```

### Action types are defined as constants (not plain strings)

Do not use / reuse Redux actions as plain texts:

```javascript
export const START_ENGINE = 'START_ENGINE';
export const GEARS_UP_DOWN = 'GEARS_UP_DOWN';
```

### Actions are defined as ES6 classes

Action is just an object. Rearding Redux store requirement it is a plain object having the *type* property and every action object meets the following contract:

```javascript
interface Action {
  type: string;
}
```

Actions are defined by the *class* construct, which is a great way to:
- keep action and it's type in the same place
- define action properties by constructor arguments with *public* modifier.

```javascript
import { Action } from 'redux';
import * as actionTypes from './action-types';

class StartEngineAction implements Action {
  public readonly type = actionTypes.START_ENGINE;
}

class GearsUpDownAction implements Action {
  public readonly type = actionTypes.GEARS_UP_DOWN;
  constructor(public gears: number) { }
}
```

Actually, the ES6 classes not only describe actions - when used with *new* keyword, these are in fact the action creators (please read on). For this reason - and because actions objects created this way are "not plain" - this aspect of TypeScript Redux approach might change in the future.

### Action creators are plain functions

Action creators are functions that create actions. The responsibility of action creators is to:
- create action objects,
- make them "plain" (not prototype-linked to any function) again,
- expose the some kind of API to Redux store application, as an example here we see the action creator disallowing user to change more than one gear at a time

```javascript
import * as _ from 'lodash';
import { StartEngineAction, GearsUpAction } from './actions';

type IStartEngineActionCreator = () => StartEngineAction;
type IGearUpActionCreator = () => GearsUpDownAction;
type IGearDownActionCreator = () => GearsUpDownAction;

const start: IStartEngineActionCreator = () =>
  _.toPlainObject(new StartEngineAction());

const gearUp: IGearUpActionCreator = (gears: string) =>
  _.toPlainObject(new GearsUpAction(1));

const gearDown: IGearDownActionCreator = (gears: string) =>
  _.toPlainObject(new GearsUpAction(-1));

export {
  start,
  IStartEngineActionCreator,
  gearUp,
  IGearUpActionCreator,
  gearDown,
  IGearDownActionCreator,
};
```

Please note these simple functions are described by TypeScript type aliases (in order to reuse in React containers as prop types !)

### Reducers are plain functions

Reducers are plain functions that make use of [discriminated union types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) - this is big win for writing reducer's code, having an appropriate action type (one of an union) "magically" cast in the relevant *case* block. Additionally, any breaking changes to:
- action types defined,
- action definitions that are available,
- available action parameters and types
will be easily detected by TypeScript and reported as an error.

```javascript
import * as _ from 'lodash';
import * as engineActionTypes from './action-types';
import { StartEngineAction, GearsUpDownAction } from './actions';
import { IEngine } from './state';

const initialState: IEngine = { started: false, currentGear: 1 };

export type EngineReducerActionTypes = StartEngineAction|GearsUpDownAction;

export const engineReducer = (state: IEngine = initialState, action: EngineReducerActionTypes): IEngine => {
  switch (action.type) {
    case engineActionTypes.START_ENGINE:
      return { ...state, started: true } as IEngine;
    case engineActionTypes.GEARS_UP_DOWN:
      return { ...state, currentGear: state.currentGear + action.gears } as IEngine;
    default:
      return state;
  }
};
```

### Redux-thunk effects are higher-order functions

We believe there is nothing like an "async action", "async action-creator" or the like. Developers are highly encouraged to consciously use the "effect" terminology (which assumes effect to be just an higher-order function - a function that returns other function, in the case of redux-thunk, the one with *dispatch* argument).

As an example, lets imagine a two gears up change in the engine is asynchronous and we want to make it in a safe way:

```javascript
import * as _ from 'lodash';
import { Dispatch } from 'react-redux';
import { GearsUpDownAction } from './actions';

type ITwoGearsUpEffect = () => (dipatch: Dispatch<void>) => void;

const twoGearsUp: ITwoGearsUpEffect = () => (dispatch: Dispatch<void>) => {
  new Promise((resolve, reject) => setTimeout(() => resolve(), 1500))
  .then(() => dispatch(_.toPlainObject(new GearsUpDownAction(2))));
};

export {
  twoGearsUp,
  ITwoGearsUpEffect,
};
```

## Webpack and Typescript path aliases


```
import { BubbleChart } from '@components/bubble-chart';
```

instead of:
```
import { BubbleChart } from '../../../src/components';
```
