/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import cheerio from 'cheerio';
import config from 'config';
import QueryString from 'qs';

const getUserID = async (cookie: Array<string>): Promise<string> => {
  const response = await axios.get(`${config.service.ctms}/DangkyLoptinchi.aspx?sid=`, {
    headers: {
      Cookie: cookie.join('; '),
    },
  });
  return response.data.split('"getmodule:" + ')[1].split(';')[0];
};

const getSubjects = async (cookie: Array<string>, userId: string) => {
  const response = await axios.post(
    `${config.service.ctms}/DangkyLoptinchi.aspx?sid=`,
    QueryString.stringify({
      __VIEWSTATE: '/wEPDwUJNTU0NDQwMzk4ZGRMExXiqzsNsCGrc9WjobZoDcCzO2od6+mLzUrLiU+Rww==',
      __VIEWSTATEGENERATOR: '4B900DBD',
      __CALLBACKID: '__Page',
      __CALLBACKPARAM: `getmodule:${userId}`,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: cookie.join('; '),
      },
    }
  );
  const subjects = cheerio.load(response.data)('#dvLopChoDangky');
  return subjects.html();
};

export { getSubjects, getUserID };
