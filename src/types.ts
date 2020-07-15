export type MapOneSettigs = { 
  _id?:string
  title?:string
  subtitle?:string
  selected?:boolean 
  useInMapOption?:boolean
  archived?:boolean
  icon?: string
  id?:string
  creator?:{
    login: string
  }
}