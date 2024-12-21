export interface Car {
  name: string
  nameUrl: string
  company: string
  companyUrl: string
  about?: string
  hull?: string
  year: number
  premium: boolean
  minPrice?: number
  maxPrice?: number
  priority: number
}

export interface Company {
  name: string
  nameUrl: string
}
