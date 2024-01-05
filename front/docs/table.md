# Table

- [Description](#description)
- [How to use](#how-to-use)
- [Examples](#examples)
  - [Simple table](#simple-table)
  - [Simple table with sortTypes overriding](#simple-table-overriding-sortTypes)
- [Styles](#styles)

## Description

This boilerplate features a Table component, useful to build tables. You can find it in `components/base/table`.

## How to use

1. Add the component to the DOM

2. Set component props to add columns (headers), rows (data) and options

| Props name | Type  | Description |
|---|---|---|
|  `cols` (required) | array of objects | The array of headers. Each header has the following attributes : `name` (string - required), `selector` (callback - optional), `sortable` (boolean - required). The `name` indicates the displayed header name, the `selector` indicates a method to access the row's header data, the boolean `sortable` indicates if the column should be sortable (with basic `asc`, `desc` or `none` sorting).  |
| `rows` (optional)  |  array  | The array of data. Each data must have the corresponding headers as keys. |
| `options` (optional)  |  object  | An object to set options : useful to override sortTypes. sortTypes is an array of ways of sorting. Each element has 3 properties : `name` (required), `icon` (required), `sortFunc` (required). The `name` is used to identify the type of sort. The `icon` corresponds to the icon which will be displayed if a column is under this sort. The `sortFunc` is the function called to sort the table data : it takes the array to sort, and a selector (column to reference the sort). Important : The first element of the array is always the no-sort type. |


## Examples

### Simple table

```jsx
import { Table } from 'components';

const OtherComponent = () => {

  /* Columns (header) data example */
  const cols = [
    { name: 'name', selector: (row) => row.name, sortable: true },
    { name: 'age', selector: (row) => row.age, sortable: true },
    { name: 'description', selector: (row) => row.description, sortable: false }
  ];
  /* Rows (data) data example */
  const rows = [
    { name: 'You', age: 29, description: 'developer' },
    { name: 'agent 007', age: 40, description: 'spy' },
    { name: 'Darth Vader', age: 60, description: 'evil' }
  ];

  return (
      <Table cols={cols} rows={rows} />
  );
};

export default OtherComponent;

```

### Simple table overriding sortTypes

```jsx
import { sortBy, reverse } from 'lodash';

import { Table } from 'components';

const OtherComponent = () => {

  /* Columns (header) data example */
  const cols = [
    { name: 'name', selector: (row) => row.name, sortable: true },
    { name: 'age', selector: (row) => row.age, sortable: true },
    { name: 'description', selector: (row) => row.description, sortable: false }
  ];
  /* Rows (data) data example */
  const rows = [
    { name: 'You', age: 29, description: 'developer' },
    { name: 'agent 007', age: 40, description: 'spy' },
    { name: 'Darth Vader', age: 60, description: 'evil' }
  ];

  const options = {
    sortTypes: [
      {
        name: 'none', // The no-sort type should always be the first item of the array
        icon: 'sort' // Place your icon name here
        /* sortFunc: (array) => array */ // No logic is required for the no-sort type
      },
      {
        name: 'asc',
        icon: 'sort-up', // Place your icon name here
        sortFunc: (array, selector) => sortBy(array, selector) // Place your sort logic here
      },
      {
        name: 'desc',
        icon: 'sort-down', // Place your icon name here
        sortFunc: (array, selector) => reverse(sortBy(array, selector)) // Place your sort logic here
      }
    ]
  }

  return (
      <Table cols={cols} rows={rows} options={options} />
  );
};

export default OtherComponent;

```

## Styles

`Table` has some default classes (some of Bulma's) but feel free to delete/override or add your own design ! 💅
[Here](https://bulma.io/documentation/elements/table/) are more Bulma's table classes if you need them.