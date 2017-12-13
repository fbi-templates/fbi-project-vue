export default {
  dateConvert (time) {
    return time ? new Date(time).Format('yyyy-MM-dd hh:mm') : ''
  },
  dayConvert (time) {
    return time ? new Date(time).Format('yyyy-MM-dd') : ''
  }
}