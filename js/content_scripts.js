(function () {
  let oldText = null
  var init = function () {
    getTextTrack()
  },
  // 获取当前字幕
  getTextTrack = function () {
    var t = setInterval(function () {
      let textTrack = document.getElementsByClassName('vjs-text-track-display')[0]
      if (textTrack && textTrack.firstElementChild && textTrack.firstElementChild.firstElementChild) {
        let textNode = textTrack.firstElementChild.firstElementChild.children
        let text = textNode[textNode.length - 1].innerHTML.replace('&gt;&gt;', '')
        
        if (text !== oldText) {
          console.debug(text)
          oldText = text
          setBasicText()
          // 字幕发送至后台翻译
          send('text', text, (result) => {
            document.getElementById('newText').innerHTML = result
          })
        }
      }
    }, 500)
    
  },
  // 向 background 发送消息
  send = function (cmd, par, cb) {
    chrome.runtime.sendMessage({cmd: cmd, par: par}, cb)
  },
  // 创建翻译字幕对象
  setBasicText = () => {
    let newText = document.createElement("p")
    let textTrack = document.getElementsByClassName('vjs-text-track-display')[0].firstElementChild.firstElementChild
    let englishText = textTrack.firstElementChild
    newText.id = 'newText'
    textTrack.insertBefore(newText, englishText)
  }
  init()
})()