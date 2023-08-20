import 'dotenv/config'

import { setupApp } from './app'

setupApp().then((app) => {
  const { PORT } = process.env
  app.listen(PORT, () => console.log(`server running in port ${PORT}`))
})
