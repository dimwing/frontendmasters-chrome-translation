const { youdao, baidu, google } = window.tjs

let info = null
let currentTabId = null

chrome.runtime.onMessage.addListener(
  function (request, sender, senResponse) {
    chrome.windows.getCurrent((currentWindow) => {
      currentTabId = currentWindow.id
    })

    google.translate(request.par).then(result => {
      if (!result.result) return
      info = result.result.join('') 
      senResponse(info)
    }).catch((err) => {
      info = '翻译出错'
      senResponse(info)
    })

    return true
  }
)


