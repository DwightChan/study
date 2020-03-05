import { onThemeChange } from "./theme";
import { onRefreshPopular, onLoadMorePopular } from "./popular";
import { onRefreshTrending, onLoadMoreTrending } from "./Trending";

export default {
  // 修改主题
  onThemeChange,

  // 热门页面数据加载
  onRefreshPopular,
  onLoadMorePopular,

  // 趋势页面数据加载
  onRefreshTrending,
  onLoadMoreTrending,
}