import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
//rem适配     得在样式设置字体大小才有效果
import 'amfe-flexible/index.js'
//导入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//按需引入vant
import { 
  Tabbar, TabbarItem,Search ,Button ,Swipe, 
  SwipeItem,Lazyload, Icon ,Col, Row ,
  NoticeBar,Divider,SwipeCell ,Cell,Dialog,
  Card,Tag,Form,Field,Rate, 
  CellGroup, Grid, GridItem ,Tab,Tabs,
  NavBar ,Toast ,Sticky ,Overlay ,Skeleton,
  Empty , SubmitBar ,ImagePreview,GoodsAction, GoodsActionIcon, 
  GoodsActionButton,Picker,Popup 
} from 'vant';

Vue.use(Tabbar).use(TabbarItem).use(Search).use(Button).use(Swipe)
.use(SwipeItem).use(Lazyload, {lazyComponent: true}).use(Icon).use(Col).use(Row)
.use(NoticeBar).use(Divider).use(SwipeCell).use(Cell).use(Dialog)
.use(Card).use(Tag).use(Form).use(Field).use(Rate)
.use(CellGroup).use(Grid).use(GridItem).use(Tab).use(Tabs)
.use(NavBar).use(Toast).use(Sticky).use(Overlay ).use(Skeleton )
.use(Empty).use(SubmitBar).use(ImagePreview).use(GoodsAction).use(GoodsActionIcon)
.use(GoodsActionButton).use(Picker).use(Popup)
;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
