export interface UserTokenInterface {
  token: string;
  user: { 
    id: number;
    name: string; 
    email: string
    password?: string; 
    role: string;
    urlPhoto?: string; 
    urlLinkedin?: string; 
    urlInstagram?: string; 
  };
}

export interface UserInterface {
  id: number;
  name: string; 
  email: string; 
  password?: string; 
  role: string;
  urlPhoto?: string; 
  urlLinkedin?: string; 
  urlInstagram?: string; 
}
