import Vue from 'vue'
import axios from 'axios'

let myaxios = {}

myaxios.install = function (Vue) {
    axios.defaults.baseURL = process.env.VUE_APP_BASE_API


    Vue.prototype.$http = axios
}

export default myaxios