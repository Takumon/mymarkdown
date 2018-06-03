import Vue from 'vue'
import moment from 'moment'
import momentja from 'moment/locale/ja.js'

Vue.filter('dateFormat', function(value, format) {
  moment.locale('ja');
  return moment(value).format(format);
});