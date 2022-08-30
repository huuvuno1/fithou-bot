import * as cheerio from 'cheerio';
import axios from 'axios';

import logger from 'logger';
import { ArticlesModel } from 'models';
import config from 'config';
import { CRAWL_FITHOU_URL } from 'utils/constants';

export const crawlFithouService = async () => {
  const regex = /[0-9]+/g;

  try {
    const dom = await axios.get(CRAWL_FITHOU_URL);

    const oldArticles = await ArticlesModel.findOne();

    const $ = cheerio.load(dom.data);

    const list: any[] = [];
    $('#LeftCol_pnlCategory div[class=article]')
      .find('a')
      .each(function (index, element) {
        list.push($(element).attr('href'));
      });

    if (!oldArticles) {
      await ArticlesModel.create({
        link: `${config.service.fithou}${list[0]}`,
        aid: list[0].match(regex)[0],
      });
    }

    const lastArticleAid = Number(list[0].match(regex)[0]);

    if (lastArticleAid > oldArticles.aid) {
      await ArticlesModel.findOneAndUpdate({
        link: `${config.service.fithou}${list[0]}`,
        aid: list[0].match(regex)[0],
      });

      if (lastArticleAid !== oldArticles.aid + 1) {
        let index = 0;

        for (let i = 0; i < list.length; i++) {
          if (Number(list[i].match(regex)[0]) === oldArticles.aid) {
            index = i;
            break;
          }
        }

        let results: any[] = [];

        for (let i = 0; i < index; i++) {
          results.push({ link: `${config.service.fithou}${list[i]}` });
        }

        logger.info(`data: ${results}`);
        logger.info(`There are many new articles!`);
        return {
          data: results,
          message: 'There are many new articles!',
        };
      }

      logger.info(`data: ${config.service.fithou}${list[0]}`);
      logger.info(`Have a new article!`);
      return {
        data: `${config.service.fithou}${list[0]}`,
        message: 'Have a new article!',
      };
    }

    logger.info(`data: ${oldArticles}`);
    logger.info(`Not change!`);
    return {
      data: oldArticles,
      message: 'Not change!',
    };
  } catch (error) {
    logger.error(error);
  }
};
