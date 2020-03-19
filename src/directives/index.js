import directive from './directives.js'
const importDirective = Vue =>{
    Vue.directive('filterSpecialChar',directive.filterSpecialChar)
}

export default importDirective