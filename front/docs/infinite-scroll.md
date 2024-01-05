# Infinite Scroll

- [Description](#description)
- [How to use](#how-to-use)
- [Examples](#examples)
  - [Infinite Scroll](#infinite-scroll)
  - [Finite Scroll](#finite-scroll)
  - [Finite Scroll with parent scroll](#finite-scroll-with-parent-scroll)
- [Styles](#styles)

## Description

`InfiniteScroll` is a component made with [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component).

This boilerplate features an Infinite Scroll component, useful to organize large amount of scrollable data. You can find it in `components/base/utilities`.

## How to use

1. Add the component to the DOM

2. Set component props to add classes, data, loadMore function and options

| Props name | Type  | Description |
|---|---|---|
| `data` (required)  |  array  | The array of data. |
| `loadMore` (required)  |  func  | A function to add additonal data to the array. Takes in a array parameter (initial array), and returns an array (the newly populated array). |
|  `classes` (optional) | string | A list of classes for the wrapping container |
| `options` (optional)  |  object  | An object to set options : useful to override certain optional parameters. <br>- `displayItems` : a function to display items. <br>- `loader` : a loader element. <br>- `endMessage` : an element to display when user has reached the end of the array. <br>- `scrollableTarget` : an element's id or reference to bind the infinite scroll on. |


## Examples

### Infinite Scroll

```jsx
import { uniqueId } from 'lodash';

import { InfiniteScroll } from 'components';

const OtherComponent = () => {
  const loadAlwaysMore = async (items) => {
    await new Promise((res) => setTimeout(res, 1500)); // just a way to wait 1.5 seconds for demonstration purposes
    return [...items, uniqueId(), uniqueId(), uniqueId(), uniqueId(), uniqueId()]; // returns always 5 more items
  };

  return (
    <ul className="content">
      <InfiniteScroll
        data={[uniqueId(), uniqueId(), uniqueId(), uniqueId(), uniqueId()]}
        loadMore={loadAlwaysMore}
        options={{
          displayItem: (item, index) => <li key={uniqueId()}>item - {index}</li>
        }}
      />
    </ul>
  );
};

export default OtherComponent;

```

### Finite Scroll

```jsx
import { uniqueId } from 'lodash';

import { InfiniteScroll } from 'components';

const OtherComponent = () => {
  const loadFiveMore = async (items) => {
    await new Promise((res) => setTimeout(res, 1500)); // just a way to wait 1.5 seconds for demonstration purposes
    return items.length < 15 ? [...items, uniqueId(), uniqueId(), uniqueId(), uniqueId(), uniqueId()] : items; // conditionally returns 5 more items
  };

  return (
    <ul className="content">
      <InfiniteScroll
        data={[uniqueId(), uniqueId(), uniqueId(), uniqueId(), uniqueId()]}
        loadMore={loadFiveMore}
        options={{
          displayItem: (item, index) => <li key={uniqueId()}>item - {index}</li>
        }}
      />
    </ul>
  );

};

export default OtherComponent;

```

### Finite Scroll with parent scroll

```jsx
import { uniqueId } from 'lodash';

import { InfiniteScroll } from 'components';

const OtherComponent = () => {
  const loadFiveMore = async (items) => {
    await new Promise((res) => setTimeout(res, 1500)); // just a way to wait 1.5 seconds for demonstration purposes
    return items.length < 15 ? [...items, uniqueId(), uniqueId(), uniqueId(), uniqueId(), uniqueId()] : items; // conditionally returns 5 more items
  };

  return (
    <ul id="finiteScroll" className="content" style={{ height: 100, overflow: 'auto' }}>
      <InfiniteScroll
        data={[uniqueId(), uniqueId(), uniqueId(), uniqueId(), uniqueId()]}
        loadMore={loadFiveMore}
        options={{
          displayItem: (item, index) => <li key={uniqueId()}>item - {index}</li>,
          scrollableTarget: 'finiteScroll'
        }}
      />
    </ul>
  );

};

export default OtherComponent;

```

## Styles

`InfiniteScroll` has no style but some default elements : feel free to delete/override or add your own design ! 💅
