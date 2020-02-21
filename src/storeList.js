import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import fetchStores from './services/storeLocator';

/**
 * Store list showing all the stores for specific country
 *
 * @returns {*}
 * @constructor
 */
const StoreList = () => {
  const match = useRouteMatch('/store-list/:country');
  const [shops, setShops] = useState(null);

  // Async call to fetchStores service
  const getStores = async value => {
    let didCancel = false;

    const response = await fetchStores(value);
    if (!didCancel) setShops(response);

    return () => { didCancel = true; };
  };

  useEffect(() => {
    if (match) getStores(`shops?country=${match.params.country}`);
  }, [match.params.country]);

  return (
    <ul>
      {
        shops && shops.map(shop => (
          <li key={shop.name}>{shop.name}, opening hours {shop.opening_hours_today[0].open} - {shop.opening_hours_today[0].close}</li>
        ))
      }
    </ul>
  )
};

export default StoreList;
