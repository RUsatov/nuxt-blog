export default function ({$axios, redirect, store}) {

  // Интерсептор нужен для того чтобы axios работал на сервере и передавал токен даже когда еще не загружен фронтенд
  $axios.interceptors.request.use(request => {
    if (store.getters['auth/isAuthenticated'] && !request.headers.common['Authorization']) {
      const token = store.getters['auth/token']
      request.headers.common['Authorization'] = `Bearer ${token}`
    }
    return request
  })


  $axios.onError(error => {
    if (error.response) {
      if (error.response.status === 401) {
        redirect('/admin/login?message=session')
        store.dispatch('auth/logout')
      }

      if (error.response.status === 500) {
        console.error('Server 500 error');
      }
    }
  })
}