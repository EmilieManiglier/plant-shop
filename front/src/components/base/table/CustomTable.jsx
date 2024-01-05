import { isEmpty, reverse, sortBy, uniqueId } from 'lodash';
import { array, arrayOf, bool, func, number, object, shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { Icon } from 'components';

/**
 * An array of objects to define the possible ways of sorting a table. The first item is always the no-sort type.
 * @param {string} name the sort designation name
 * @param {element} icon an icon element
 * @param {func} sortFunc a function with 2 parameters (array, selector) which returns the sorted array
 */
const defaultSortTypes = [
  {
    name: 'none', // The no-sort type should always be the first item of the array
    icon: 'sort' // Place your icon name here
    // No logic is required for the no-sort type
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
];

/**
 * A function to handle sorting when clicking on the sort icon
 * @param {object} col a column object which has a name, selector and sortable attribute
 * @param {func} sortTable a function to handle sorting which takes a sortType as parameter
 * @param {number} sortIndex a number referencing the index of the current sort
 * @param {object} [options]  an options object to define sortTypes if necessary.
 * @returns {element} a sortable-on-click icon
 */
const SortHeader = ({ col, sortTable, sortIndex, options = {} }) => {
  const [currentSortIndex, setCurrentSortIndex] = useState(sortIndex);
  const sortTypes = options?.sortTypes || defaultSortTypes;

  const onClick = (event) => {
    event.preventDefault();
    const newIndex = (currentSortIndex + 1) % 3;
    sortTable(newIndex);
    setCurrentSortIndex(newIndex);
  };

  return col.sortable ? (
    <button
      onClick={onClick}
      className="button is-borderless has-text-weight-bold is-white is-fullwidth full-height m-0 icon-text p-2 "
    >
      <span>{col.name}</span>
      {col.sortable && <span className="icon is-small">{<Icon name={sortTypes[currentSortIndex].icon} />}</span>}
    </button>
  ) : (
    <span className="flex-center-center full-width full-height m-0 p-2 ">{col.name}</span>
  );
};

/**
 * A basic table to display data with rows and columns
 * @param {array} cols array of header objects. Each header have the following attributes: name, selector and sortable
 * @param {array} [rows] array of data objects
 * @param {object} [options] an options object to define sortTypes if necessary.
 * @returns {element} table functional component
 */
const CustomTable = ({ cols, rows = [], options = {} }) => {
  const [tableRows, setTableRows] = useState(rows);
  const [currentSort, setCurrentSort] = useState('');
  const [sortIndex, setSortIndex] = useState(0);

  const sortTypes = options?.sortTypes || defaultSortTypes;

  const sortTable = (col, index) => {
    setTableRows(index ? sortTypes[index].sortFunc(tableRows, col.selector) : rows);
    setCurrentSort(col.name);
    setSortIndex(index);
  };

  useEffect(() => {
    const col = cols.find((col) => col.name === currentSort);

    setTableRows(!isEmpty(currentSort) && sortIndex ? sortTypes[sortIndex].sortFunc(rows, col.selector) : rows);
  }, [rows]);

  return (
    <table className="table full-width">
      <thead>
        <tr>
          {cols.map((col) => {
            return (
              <th key={uniqueId()} className="p-0" align="center">
                <SortHeader
                  col={col}
                  sortIndex={currentSort === col.name ? sortIndex : 0}
                  sortTable={(index) => sortTable(col, index)}
                  options={options}
                />
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row) => (
          <tr key={uniqueId()}>
            {cols.map((col) => (
              <td key={uniqueId()}>{col.selector(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

CustomTable.propTypes = {
  cols: arrayOf(
    shape({
      name: string.isRequired,
      selector: func.isRequired,
      sortable: bool.isRequired
    })
  ).isRequired,
  rows: array,
  options: object
};

SortHeader.propTypes = {
  col: shape({
    name: string.isRequired,
    selector: func.isRequired,
    sortable: bool.isRequired
  }).isRequired,
  sortTable: func.isRequired,
  sortIndex: number.isRequired,
  options: object
};

export default CustomTable;
