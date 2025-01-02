export interface IJsonResponse {
  result: boolean
  message: string
  data: any[]
}

export interface IMeasurement {
  id: number;
  loginTime: any
  logoutTime: any
}

export interface ILoggedInUser {
  email: string;
  role: string;
  loginId: number;
}

export interface ISession {
  id: number;
  loginTime: any;
  logoutTime: any;
  noOfBreaks: number;
  sessionTime: string;
  breakTime: string;
  email:string;
}
