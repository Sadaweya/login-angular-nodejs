export interface Post{
  id: number;
  title: string;
  body: string;
  user: number; //cambiato da string
  created: Date;
}
