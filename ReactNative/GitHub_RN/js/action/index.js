import { onThemeChange, onShowCustomThemeView, onThemeInit} from "./theme";
import { onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite } from "./popular";
import { onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite } from "./Trending";
import { onLoadFavoriteData } from "./favorite";
import { onLoadLanguage } from "./language";
import { onSearch, onSearchCancel, onLoadMoreSearch } from "./search";
export default {
  // 修改主题
  onThemeChange,
  // 显示自定义主题的view
  onShowCustomThemeView,
  // 主题颜色初始化
  onThemeInit,

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

  // 加载语言
  onLoadLanguage,

  // 搜索
  onSearch,
  onSearchCancel,
  onLoadMoreSearch,
}
