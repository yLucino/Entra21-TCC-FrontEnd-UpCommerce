export interface UserInterface {
  token: string;
  user: { 
    id: number;
    name: string; 
    email: string; 
    role: string;
    urlPhoto?: string; 
    urlLinkedin?: string; 
    urlInstagram?: string; 
  };
}
