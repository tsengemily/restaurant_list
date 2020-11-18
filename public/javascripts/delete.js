function del() {
  const msg = '您確定要刪除嗎？\n\n請確認！'
  if (confirm(msg) === true) {
    return true
  } else {
    return false
  }
}

module.exports = del
