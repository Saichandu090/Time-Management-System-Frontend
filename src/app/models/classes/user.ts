export class UserLogin{
  email:string
  password:string

  constructor(){
    this.email=''
    this.password=''
  }
}

export class UserRegister{
  firstName:string
  lastName:string
  dob:string
  email:string
  password:string
  role:string

  constructor(){
    this.firstName='',
    this.lastName='',
    this.dob='',
    this.email='',
    this.password='',
    this.role='USER'
  }
}

export class AdminRegister{
  firstName:string
  lastName:string
  dob:string
  email:string
  password:string
  role:string

  constructor(){
    this.firstName='',
    this.lastName='',
    this.dob='',
    this.email='',
    this.password='',
    this.role='ADMIN'
  }
}
