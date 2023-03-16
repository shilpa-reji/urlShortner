
import { UserInputError } from "apollo-server";
var Bugsnag = require("@bugsnag/js");

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + 
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + 
      "((\\d{1,3}\\.){3}\\d{1,3}))" + 
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + 
      "(\\?[;&a-z\\d%_.~+=-]*)?" + 
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); 
  return !!pattern.test(str);
}
function shortOriginalUrl() {
  let result = "";
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default {
  Query: {
    getUrl: async (parent, { shortUrl }, { models }) => {
      try {
        const url = await models.url.findOne({ where: { shortUrl } });
        return url
      } catch (error) {
        Bugsnag.notify(error);
        throw new UserInputError(error);
      }
    },
  },
  Mutation: {
    createUrl: async (parent, { originalUrl }, { models }) => {
      try {
        let shortUrl;
        
        const urlValidCheck = validURL(originalUrl);
        if (urlValidCheck === true) {
          shortUrl = shortOriginalUrl();
          const url = await models.url.create({ originalUrl, shortUrl });
          if (url.id) {
            return url;
          }
        } else {
          throw new UserInputError("Only valid url is accepted");
        }
      } catch (error) {
        Bugsnag.notify(error);
        throw new UserInputError(error);
      }
    },
  },
};
