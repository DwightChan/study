import { AsyncStorage } from "react-native";
const FAVORITE_KEY_PREFIX = 'favorite_';

/**
 * 这个类中有个 this.favoriteKey: 用于区分 热门 popular, 还是 趋势 trengding
 */

export default class FavoriteDao {
  constructor(flag) {
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
  }

  /**
   * 收藏项目, 保存收藏的项目
   * @param {*} key  项目的id
   * @param {*} value 收藏的项目
   * @param {*} callBack 回调函数
   */
  saveFavoriteItem(key, value, callBack) {
    AsyncStorage.setItem(key, value, (error, result) => {
      if (!error) { // 更新Favorite的key
        this.updateFavoriteKeys(key, true);
      }
    })
  }

  /**
   * 更新Favorite key 集合
   * @param {*} key 这个key 是在this.favoriteKey popular/trending 对应类型下的key
   * @param {*} isAdd 是否添加, true 添加, false 删除
   */
  updateFavoriteKeys(key, isAdd) {
    AsyncStorage.getItem(this.favoriteKey, (error, result) => {
      if (!error) {
        let favoriteKeys = [];
        if (result) {
          favoriteKeys = JSON.parse(result);
        }
        let index = favoriteKeys.indexOf[key];
        if (isAdd) { //如果是添加切key 不存在则添加到数据中
          if (index === -1) favoriteKeys.push(key);
        }else { // 如果要移除, 且key 存在数组中, 则从数组中移除
          if (index !== -1) favoriteKeys.splice(index, 1);
        }
        // 将更新后的keys 保存到本地存储中
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
      }
    })
  }
  /**
   * 获取收藏的Repository对应的key
   * return {Promise}
   */
  getFavoriteKeys() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.favoriteKey, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
          }
        }else {
          reject(error);
        }
      });
    });
  }
  /**
   * 取消收藏, 移除已经收藏的项目
   * @param {*} key 项目id
   */
  removeFavoriteItem(key) {
    AsyncStorage.removeItem(key, (error, result) => {
      if (!error) {
        this.updateFavoriteKeys(key, false);
      }
    })
  }
  /**
   * 获取所以收藏的项目
   * @return {Promise}
   */
  getAllItems() {
    return new Promise((resolve, reject) => {
      this.getFavoriteKeys().then((keys) => {
        let items = [];
        if (keys) {
          AsyncStorage.multiGet(keys, (err, stores) => {
            try {
              console.log("----stores:", stores);
              console.log("--------");
              stores.map((result, i, store) => {
                console.log(i, result, store);
                // get at each store's key/value so you can work with it
                let key = store[i][0];
                let value = store[i][1];
                if (value) items.push(JSON.parse(value));
              });
              resolve(items);
            } catch (e) {
              reject(e);
            }
          });
        } else {
          resolve(items);
        }
      }).catch((e) => {
        reject(e);
      })
    })
  }

}