import ajax from '@/utils/ajax'

export default {
  list () {
    return ajax
      .get('users/fbi-templates/repos')
      .then(response => ajax.responseHandler(response))
  }
}
