import { onThemeChange } from "./theme";
import { onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite } from "./popular";
import { onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite } from "./Trending";
import { onLoadFavoriteData } from "./favorite";
export default {
  // 修改主题
  onThemeChange,

  // 热门页面数据加载
  onRefreshPopular,
  onLoadMorePopular,

  // 趋势页面数据加载
  onRefreshTrending,
  onLoadMoreTrending,

  // 收藏数据
  onLoadFavoriteData,
  onFlushPopularFavorite,
  onFlushTrendingFavorite,
}