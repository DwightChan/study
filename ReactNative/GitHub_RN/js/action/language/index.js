import Types from "../types";
import DataStore, {FLAG_STORAGE} from "../../expand/dao/DataStore";
import { handleData, _projectModels } from "../ActionUtil";
import ProjectModel from "../../model/ProjectModel";
import LanguageDao from "../../expand/dao/LanguageDao";

export function onLoadLanguage(flagKey) {
  return async dispatch => {
    try {
      let languages = await new LanguageDao(flagKey).fetch();
      dispatch({type: Types.LANGUAGE_LOAD_SUCCESS, languages: languages, flag: flagKey});
    } catch (error) {
      console.log(error);
    }
  }
}