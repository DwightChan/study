import { AsyncStorage } from "react-native";
import langs from "../../res/data/langs";
import keys from "../../res/data/keys";

export const FLAG_LANGUAGE = {flag_language: 'language_dao_language', flag_key: 'language_dao_key'}

export default class LanguageDao {
  constructor(flag) {
    this.flag = flag;
  }

  /**
   * 获取语言 或者 标签
   * @returns {Promise<any> | Promise}
   */
  fetch() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.flag, (error, result)=> {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          let data = this.flag === FLAG_LANGUAGE.flag_language ? langs : keys;
          resolve(data);
          this.save(data);
        }else {
          try {
            resolve(JSON.parse(result));
          } catch (error) {
            reject(error)
          }
        }
      });
    });
  }

  /**
   * 保存语言或标签
   * @param {*} objectData 
   */
  async save(objectData) {
    let stringData = JSON.stringify(objectData);
    await AsyncStorage.setItem(this.flag, stringData, (error, result) => {
      if (!error) {
        console.log("保存成功:", result);
      }else {
        console.log("保存失败:", error);
      }
    });
  }
}