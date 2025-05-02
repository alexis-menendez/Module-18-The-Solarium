// Module-18-The-Solarium/client/src/models/User.ts

import type { Book } from './Book';

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  savedBooks: Book[];
}
