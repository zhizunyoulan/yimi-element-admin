import './styles/element-variables.scss'
import './styles/index.scss' // global css
// import './icons' // icon
import layoutStore from './store'
import store from '../../store'
import VeaLayout from "./index.vue";

Object.keys(layoutStore.modules).forEach(moduleKey => {
  store.registerModule(moduleKey, layoutStore.modules[moduleKey])
})

export default VeaLayout;
