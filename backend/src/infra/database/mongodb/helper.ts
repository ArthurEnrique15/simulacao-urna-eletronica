import 'dotenv/config'

import { MongoClient, ServerApiVersion } from 'mongodb'

class MongoHelper {
  private client: MongoClient = {} as MongoClient

  async connect() {
    this.client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017', {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })

    await this.client.connect()
  }

  getCollection(name: string) {
    return this.client.db('electronic_urn').collection(name)
  }
}

export default new MongoHelper()
