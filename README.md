# React/D3/Redux/Redux-Saga Starter Kit

This starter kit represents several months of experiences in front-end development with the following technology stack:
- [x] React v15
- [x] d3 v4.7
- [x] SASS/LESS
- [x] Redux v3.7
- [x] Redux-Saga v0.16
- [x] TypeScript v2.7
- [x] Webpack v4.1

Development:
- [x] tslint v2.7
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

The purpose of this repository is to have a "starter kit" project that is a good way to start writing mature front-end applications.

# Features applied

The pure list of libraries / technologies is I believe - insufficient, so here is the list of decisions made and tweaks applied:

## Redux

In this paragraph we go a little bit into decision details regarding TypeScript Redux programming, yet, it can be summarized with the following rule: **use constructs that are embedded in the JavaScript/TypeScript language wherever possible**. This makes usage sort of helper-libraries like [react-actions](https://github.com/redux-utilities/redux-actions) redundant. More precisely, we used react-actions **typings** in the past and found it really cumbersome, quite awkward to use - in the context of type safety - just limiting.

### Action types should be defined as constants, not plain strings

Do not use / reuse Redux actions as plain texts, [for example](/src/screens/bubble-chart-screen/action-types.ts)

### Actions defined as ES6 classes

An action object in Redux is a plain object having the *type* property:
```
interface Action {
  type: string;
}
```

Actions - when passed to the Redux store - very often pass around some piece of information. There is no 

Actions can be defined by the [class construct](/src/screens/bubble-chart-screen/actions.ts), which is a great way to:
- keep action and it's type in the same place
- define action properties by constructor arguments with *public* modifier.

Actually, the ES6 classes not only describe actions - when used with *new* keyword, these are the action creators (please read on). For this reason - and because actions objects created this way are "not plain" - this aspect of TypeScript Redux programming might change in the future.

### Action Creators

Action creators are functions that create actions. [Here](/src/screens/bubble-chart-screen/action-creators.ts) the responsibility of action creators is to:
- create action objects,
- make them "plain" (not prototype-linked to any function) again.

Please note that these simple functions are described as TypeScript type aliases (to reuse in )

# General TypeScript remarks

TypeScript is - we believe - a great way to write JavaScript applications today. Besides type-safety, there plenty of other great benefits:

- targeting different existing/old ECMAScript versions
- targeting future ECMAScript versions, i.e. incorporating recommendations/proposals - right here and right now
- seamless handling of different bundle systems like UMD, AMD, CommonJS
- intellisense in IDE (!)
- dedicated linter (tslint)
- active development and great community

However, there are special ares of interest when developing with TypeScript:

- partial import in TypeScript as as good as the typings (d.ts) are, e.g. lodash typings does not currently support partial loading, resulting in much bigger bundle sizes
- loading module variables out of the SCSS into TypeScript module is not seamless - it requires writing a dedicated scss.d.ts file,
- some libraries that work quite well in pure ES6, are not a great choice when used in TypeScript (please read on for details)

# Redux


Concluding:


