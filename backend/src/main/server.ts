import { setupApp } from './app'

setupApp().then((app) => {
  app.listen(3333, () => console.log('server running'))
})
