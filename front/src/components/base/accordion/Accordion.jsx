import clsx from 'clsx';
import { each, sortBy, union } from 'lodash';
import { arrayOf, bool, node, number, oneOfType, shape, string } from 'prop-types';
import { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { Icon } from 'components';
import { useSafeState } from 'hooks';

import 'assets/styles/components/_accordion.scss';

const AccordionContext = createContext();
const AccordionItemContext = createContext();

export const AccordionProvider = ({ children, allowMultipleOpen = false, defaultOpen = [] }) => {
  const [activeIndex, setActiveIndex] = useSafeState(defaultOpen);

  return (
    <AccordionContext.Provider value={{ activeIndex, setActiveIndex, allowMultipleOpen }}>
      {children}
    </AccordionContext.Provider>
  );
};

export const Accordion = ({ children, itemIndex, className = '' }) => {
  const { activeIndex, setActiveIndex } = useContext(AccordionContext);
  const isOpen = activeIndex.includes(itemIndex);
  const [heights, setHeights] = useSafeState([]);
  const elementRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Close accordion when navigating to another page
    if (isOpen) setActiveIndex([]);
  }, [location.pathname]);

  return (
    <AccordionItemContext.Provider value={{ itemIndex, isOpen, heights, setHeights, elementRef }}>
      <div className={clsx('accordion-item', className, isOpen && 'open')}>{children}</div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTitle = ({ children, icon = null }) => {
  const { activeIndex, setActiveIndex, allowMultipleOpen } = useContext(AccordionContext);
  const { isOpen, itemIndex, heights, setHeights, elementRef } = useContext(AccordionItemContext);
  const iconName = icon?.name === 'plus' && isOpen ? 'minus' : icon?.name;

  const toggleAccordion = () => {
    // Get the height of the content inside the accordion
    const height = elementRef.current ? elementRef.current.scrollHeight + 16 : 0;

    if (allowMultipleOpen) {
      let newIndexes = isOpen ? activeIndex.filter((key) => key !== itemIndex) : union(activeIndex, [itemIndex]);
      newIndexes = sortBy(newIndexes);

      // Set the height of the content of each opened accordion
      const newHeights = [...heights];
      each(newIndexes, (index) => (newHeights[index] = index === itemIndex ? height : 0));

      setActiveIndex(newIndexes);
      setHeights(newHeights);
    } else {
      setActiveIndex(isOpen ? [] : [itemIndex]);
      setHeights([isOpen ? 0 : height]);
    }
  };

  return (
    <button type="button" onClick={toggleAccordion} className={clsx('accordion-title', isOpen ? 'open' : 'closed')}>
      {children}
      {icon && <Icon name={iconName} className={icon.class} />}
    </button>
  );
};

export const AccordionContent = ({ children }) => {
  const { allowMultipleOpen } = useContext(AccordionContext);
  const { isOpen, heights, itemIndex, elementRef } = useContext(AccordionItemContext);
  let heightValue = isOpen ? heights[itemIndex] : 0;
  if (!allowMultipleOpen) heightValue = isOpen ? heights[0] : 0;

  return (
    <div
      ref={elementRef}
      className={clsx('accordion-content', isOpen ? 'open' : 'closed')}
      style={{ height: heightValue }}
    >
      {children}
    </div>
  );
};

AccordionProvider.propTypes = {
  allowMultipleOpen: bool, // Allow multiple accordion items to be open at once
  defaultOpen: arrayOf(number), // Array of indexes of active accordion items
  children: oneOfType([arrayOf(node), node])
};

Accordion.propTypes = {
  itemIndex: number.isRequired,
  className: string,
  children: oneOfType([arrayOf(node), node])
};

AccordionTitle.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  icon: shape({
    name: string.isRequired,
    class: string
  })
};

AccordionContent.propTypes = {
  children: oneOfType([arrayOf(node), node])
};
