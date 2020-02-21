const SLAPIURL = 'https://store-locator-api.allsaints.com/';

/**
 * Fetch stores service
 * Will call API with pre-set values or user defined
 *
 * @param locationsShops    String    Countries or shops to get
 * @returns {*}             Array     Array of objects with countries or shops
 */
const fetchStores = locationsShops => {
  try {
    return fetch(`${SLAPIURL}${locationsShops}`)
      .then(json => json.json())
      .then(data => data);
  }
  catch (err) { return err; }
};

export default fetchStores;
