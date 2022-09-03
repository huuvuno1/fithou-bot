const APP_CONSTANTS = {
  apiPrefix: '',
  params: 'params',
  query: 'query',
  body: 'body',
  file: 'file',
  service: 'fithou-bot',
};

const DEFAULT_PAGING = {
  limit: 100,
  skip: 0,
};

const CRAWL_FITHOU_URL = 'http://fithou.edu.vn/Category.aspx';

const enum CRAWL_FITHOU_TYPE {
  new = -1,
  noChange = 0,
  oneRecord = 1,
  manyRecords = 2,
}

export { APP_CONSTANTS, DEFAULT_PAGING, CRAWL_FITHOU_URL, CRAWL_FITHOU_TYPE };
