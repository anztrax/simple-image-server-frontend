import { Default, SuggestionHandler } from './Plugins';

function plugins(viewMode){
  const defaultPlugins = Default(viewMode);
  const suggestionHandlerPlugins = SuggestionHandler(viewMode);
  const plugins = [suggestionHandlerPlugins]
    .concat(defaultPlugins);

  return plugins;
}

export default plugins;
