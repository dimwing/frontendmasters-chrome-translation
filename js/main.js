(function () {
  var info = chrome.extension.getBackgroundPage().info
  $('#info').html(info)
})()