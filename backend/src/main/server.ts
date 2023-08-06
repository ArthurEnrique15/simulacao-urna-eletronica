import { MongoHelper } from '../infra/database/mongodb/helper'
import { setupApp } from './app'

MongoHelper.connect('')
  .then(() => {
    const app = setupApp()
    app.listen(3333, () => console.log('server running'))
  })
  .catch(console.error)
