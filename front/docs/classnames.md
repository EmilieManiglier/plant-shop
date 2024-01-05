# classNames

Simple conditionnal classnames can be written with template strings

```jsx
<div className={`card ${someCondition ? 'mr-4' : 'mr-8'}`}>Lorem ipsum</div>
/* -> output: card mr-4 */
```

⚠️ Avoid using short circuit conditionals with `&&` as it can add `false` or `null` classes

```jsx
<div className={`card ${someCondition && 'mr-4'}`}>Lorem ipsum</div>
/* -> output: card false */
```

For more complex conditions, it is recommended to use `clsx` because it will remove all falsy values from the output string.

More @ https://www.npmjs.com/package/clsx

```jsx
import clsx from 'clsx';

/* Use separate strings for base classes */
const classList = clsx('card', { 'mr-4': condition });

/* Provide multiple classes */
const classList = clsx(
	'card',
  {
    'mb-4': condition
  },
  secondCondition ? 'mr-4' : 'mr-8'
);

/* Use conditional operator to switch between classes and object or "AND" operator for turning a single one on and off */
const classList = clsx(
  condition ? 'mr-4' : 'mr-8',
  { 'is-fullscreen': secondCondition },
  thirdCondition && 'has-overlay'
);

<div className={classList}>Lorem ipsum</div>
```
