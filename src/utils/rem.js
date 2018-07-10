;(function (win, doc) {
  if (!win.addEventListener) {
    return
  }
  const el = doc.documentElement || doc.body
  const evt = 'orientationchange' in win ? 'orientationchange' : 'resize'
  function setFont () {
    const clientWidth = el.clientWidth
    el.style.fontSize = clientWidth >= 750
      ? '100px'
      : 100 * (clientWidth / 750) + 'px'
  }
  setFont()
  win.addEventListener(evt, setFont, false)
})(window, document)
