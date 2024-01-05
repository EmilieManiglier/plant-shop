import { array, func, node, shape, string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { default as ReactInfiniteScroll } from 'react-infinite-scroll-component';

import { Loader } from 'components';
import { useSafeState } from 'hooks';

/**
 * A component to display data with infinite scrolls
 * @param {array} data an array of data objects
 * @param {func} loadMore a function which takes the initial array and returns a new array
 * @param {string} [classes] a list of classes for this wrapping component
 * @param {object} [options] an object to define additional options such as :
 * - displayItems : a function to display items
 * - loader : a loader element
 * - endMessage : an element to display when user has reached the end
 * - scrollableTarget : an element's id or reference to bind the infinite scroll on.
 * @returns {element} table functional component
 */
const InfiniteScroll = ({ data, loadMore, classes = '', options = {} }) => {
  const [items, setItems] = useSafeState(data);
  const [hasMore, setHasMore] = useSafeState(true);
  const { t } = useTranslation();

  const defaultDisplayItem = (obj) => obj;
  const defaultEndMessage = <p className="content has-text-centered has-text-weight-bold">{t('infiniteScroll.end')}</p>;

  const next = async () => {
    const newItems = await loadMore(items);
    items.length !== newItems.length ? setItems(newItems) : setHasMore(false);
  };

  return (
    <ReactInfiniteScroll
      classeName={classes}
      dataLength={items.length}
      next={next}
      hasMore={hasMore}
      loader={options?.loader || <Loader />}
      endMessage={options?.endMessage || defaultEndMessage}
      scrollableTarget={options.scrollableTarget}
      style={{ overflowY: 'hidden' }}
    >
      {items.map(options?.displayItem || defaultDisplayItem)}
    </ReactInfiniteScroll>
  );
};

InfiniteScroll.propTypes = {
  data: array.isRequired,
  loadMore: func.isRequired,
  classes: string,
  options: shape({
    displayItem: func,
    loader: node,
    endMessage: node,
    scrollableTarget: string
  })
};

export default InfiniteScroll;
