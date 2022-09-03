import * as cheerio from 'cheerio';
import axios from 'axios';

import logger from 'logger';
import { ArticlesModel } from 'models';
import config from 'config';
import { CRAWL_FITHOU_TYPE, CRAWL_FITHOU_URL } from 'utils/constants';

export const crawlFithouService = async () => {
  const regex = /[0-9]+/g;

  try {
    const dom = await axios.get(CRAWL_FITHOU_URL);

    const oldArticles = await ArticlesModel.findOne();

    const $ = cheerio.load(dom.data);

    const list: any[] = [];
    $('#LeftCol_pnlCategory div[class=article]').each(function (index, element) {
      list.push({
        link: $(element).children('a').attr('href'),
        title: $(element).children('a').text().trim(),
      });
    });

    if (!oldArticles) {
      const newArticles = await ArticlesModel.create({
        link: `${config.service.fithou}${list[0].link}`,
        title: list[0].title,
        aid: list[0].link.match(regex)[0],
      });

      logger.info(`data: ${newArticles}`);
      logger.info(`Have a new article!`);
      return {
        data: newArticles.toObject(),
        message: 'Have a new article!',
        type: CRAWL_FITHOU_TYPE.new,
      };
    }

    const lastArticleAid = Number(list[0].link.match(regex)[0]);

    if (lastArticleAid > oldArticles.aid) {
      await ArticlesModel.findOneAndUpdate({
        link: `${config.service.fithou}${list[0].link}`,
        title: list[0].title,
        aid: list[0].link.match(regex)[0],
      });

      if (lastArticleAid !== oldArticles.aid + 1) {
        let index = 0;

        for (let i = 0; i < list.length; i++) {
          if (Number(list[i].link.match(regex)[0]) === oldArticles.aid) {
            index = i;
            break;
          }
        }

        let results: any[] = [];

        for (let i = 0; i < index; i++) {
          results.push({
            link: `${config.service.fithou}${list[i].link}`,
            title: list[i].title,
          });
        }

        logger.info(`data: ${results}`);
        logger.info(`There are many new articles!`);
        return {
          data: results,
          message: 'There are many new articles!',
          type: CRAWL_FITHOU_TYPE.manyRecords,
        };
      }

      logger.info(`data: ${config.service.fithou}${list[0].link}`);
      logger.info(`Have a new article!`);
      return {
        data: {
          link: `${config.service.fithou}${list[0].link}`,
          title: list[0].title,
        },
        message: 'Have a new article!',
        type: CRAWL_FITHOU_TYPE.oneRecord,
      };
    }

    logger.info(`data: ${oldArticles}`);
    logger.info(`Not change!`);
    return {
      data: oldArticles.toObject(),
      message: 'Not change!',
      type: CRAWL_FITHOU_TYPE.noChange,
    };
  } catch (error) {
    logger.error(error);
  }
};
