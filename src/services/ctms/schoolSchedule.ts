import axios from 'axios';
import * as cheerio from 'cheerio';

import { loginCtms, logoutCtms } from 'services/ctms';
import { SCHOOL_SCHEDULE_URL, todayformatted } from 'utils/constants';
import logger from 'logger';

export const schoolScheduleService = async (username: string, password: string) => {
  try {
    const login = await loginCtms(username, password);

    const cookie = login.cookie.join('; ');

    if (login.isSuccess) {
      const dom = await axios.get(SCHOOL_SCHEDULE_URL, {
        headers: {
          Cookie: cookie,
        },
      });

      const $ = cheerio.load(dom.data);

      let list = {};
      $('#leftcontent #LeftCol_Lichhoc1_pnView div').each(function (index, element) {
        const day = $(element).children('b')?.text()?.trim()?.split('\n')[1]?.trim();
        if (day === todayformatted()) {
          const sessionOne: any[] = [];

          $(element)
            .children('div')
            .children('table')
            .children('tbody')
            .children('tr')
            .eq(1)
            .children('td')
            .each(function (indexSecond, elementSecond) {
              sessionOne.push($(elementSecond).text()?.trim());
            });

          const sessionTwo: any[] = [];
          $(element)
            .children('div')
            .children('table')
            .children('tbody')
            .children('tr')
            .eq(2)
            .children('td')
            .each(function (indexSecond, elementSecond) {
              sessionTwo.push($(elementSecond).text()?.trim());
            });

          const sessionThree: any[] = [];
          $(element)
            .children('div')
            .children('table')
            .children('tbody')
            .children('tr')
            .eq(3)
            .children('td')
            .each(function (indexSecond, elementSecond) {
              sessionThree.push($(elementSecond).text()?.trim());
            });

          list = {
            sessionOne,
            sessionTwo,
            sessionThree,
          };
        }
      });

      logoutCtms(login.cookie);

      return list;
    }

    return login;
  } catch (error) {
    logger.error(error);
  }
};
