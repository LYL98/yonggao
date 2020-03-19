// 过滤特殊字符
export default{
    update: function (el, {value, modifiers}, vnode) {
        try {
          let newval = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, "");
          if(value !== newval){
            el.children[0].value = newval
            el.children[0].dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
          }
        } catch (e) {
          console.log(e)
        }
      }
      
}