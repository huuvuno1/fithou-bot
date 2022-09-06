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

const SCHOOL_SCHEDULE_URL = 'http://ctms.fithou.net.vn/Lichhoc.aspx?sid=';

const COLUMN_NAME_SCHEDULE = ['STT', 'Giờ', 'Phòng', 'Môn học', 'Giảng viên', 'Lớp', 'Trạng thái'];

const todayformatted = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  const date: string = dd + '/' + mm + '/' + yyyy;
  return date;
};

export {
  APP_CONSTANTS,
  DEFAULT_PAGING,
  CRAWL_FITHOU_URL,
  CRAWL_FITHOU_TYPE,
  SCHOOL_SCHEDULE_URL,
  COLUMN_NAME_SCHEDULE,
  todayformatted,
};
