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

  async insertCandidates() {
    const candidates = this.getCollection('candidates')

    const candidatesCount = await candidates.countDocuments()

    if (candidatesCount === 0) {
      await candidates.insertMany([
        {
          name: 'Ciro Gomes',
          party: 'PDT',
          viceCandidate: 'Ana Paula Matos',
          number: 12,
          createdAt: '2022-01-01T00:00:00.000+00:00',
        },
        {
          name: 'Lula',
          party: 'PT',
          viceCandidate: 'Geraldo Alckimin',
          number: 13,
          createdAt: '2022-01-01T00:00:00.000+00:00',
        },
        {
          name: "Felipe D'Ávila",
          party: 'Novo',
          viceCandidate: 'Tiago Mitraud',
          number: 30,
          createdAt: '2022-01-01T00:00:00.000+00:00',
        },
        {
          name: 'Jair Bolsonaro',
          party: 'PL',
          viceCandidate: 'Braga Netto',
          number: 22,
          createdAt: '2022-01-01T00:00:00.000+00:00',
        },
        {
          name: 'Léo Péricles',
          party: 'UP',
          viceCandidate: 'Samara Martins',
          number: 80,
          createdAt: '2022-01-01T00:00:00.000+00:00',
        },
        {
          name: 'Simone Tebet',
          party: 'MDB',
          viceCandidate: 'Mara Gabrilli',
          number: 15,
          createdAt: '2022-01-01T00:00:00.000+00:00',
        },
        {
          name: 'Sofia Manzano',
          party: 'PCB',
          viceCandidate: 'Antônio Alves',
          number: 21,
          createdAt: '2022-01-01T00:00:00.000+00:00',
        },
      ])
    }
  }
}

export default new MongoHelper()
