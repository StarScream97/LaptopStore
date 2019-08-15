// import Toast from '../helpers/sweetAlertToaster'
const Swal = require('sweetalert2')
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1000
})


export default function (context) {
  setTimeout(() => {
    if (!context.store.getters.isAuthenticated) {
      Toast.fire({
        type: 'error',
        title: 'Not logged in! Redirecting to the login page.'
      })

      context.redirect('/login');
    }
  }, 1000);
}
