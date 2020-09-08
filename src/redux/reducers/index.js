import {combineReducers} from 'redux';
import settings from './settings';

import favorite from './favorite';

import ui from './ui';

export default combineReducers({
  settings,
  favorite,
  ui,
});
