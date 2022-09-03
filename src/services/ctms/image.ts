/* eslint-disable max-len */
const nodeHtmlToImage = require('node-html-to-image');
import fs from 'fs';

const convertHtmlToImage = (html: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const image = `image-${new Date().getTime()}.png`;
    nodeHtmlToImage({
      output: `./public/${image}`,
      html: `
        <!DOCTYPE html>
        <html>
            <head><meta charset="utf-8"></head>
            <body style='padding: 20px;'>
                <div>
                    ${html}
                </div>
                <h3 style='text-align: center; color: green; padding-top: 10px;'>Authors: Nguyễn Hữu Vũ - Nguyễn Công Minh</h3>
            </body>
        </html>
        `,
    })
      .then(() =>
        resolve({
          status: true,
          image,
        })
      )
      .catch((e: Error) =>
        reject({
          status: false,
          message: e.message,
        })
      );
  });
};

const deleteImage = (image: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.unlink(`./public/${image}`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          status: true,
        });
      }
    });
  });
};

export { convertHtmlToImage, deleteImage };
