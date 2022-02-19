import AOS from 'aos'

/* eslint-disable */
export default ({ app }, inject) => {
  app.AOS = new AOS.init()
}
