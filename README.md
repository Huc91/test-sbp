# test-sbp

Test for SBP by Luca Ucciero

## Objective

Create a dynamic form renderer component that takes a JSON schema as input and
renders a form based on the schema using Vue.js 3 Composition API. Use PrimeVue as
the UI kit for styling and components.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
## Live Demo
[Check the live demo on Netlify](https://incomparable-selkie-bed6c6.netlify.app/)

## About the implementation

- I create a dynamic form builder based on an object of schema of the fields as input.
- I wanted to represent the case that the schema is took from a back-end api, but given that the component must take a prop for the schema you can also hardcode it.
- I spent some time on the scaffolding to make this project ready to expand on:
1. I installed SASS
2. PrimeVueResolver for not having to "write" everytime to import the design system components where you need it. They're not globally imported, it's just a way for the developer to not spend time to write the import snippe every time.
3. Added the router
4. Added the store
- I handled the error validation myself no libraries
- Added a small unit test with vitest for the component (run out of time so it's the bare minimum to be acceptable)

## Feedback

We would appreciate it if you could quickly answer the following:

Practical exercise - Senior Frontend Engineer 5

1. How much time did you spend performing this exercise?

-   4h to 5h

2. How can we improve this Practical Exercise?
   I think it's good for an exercise
