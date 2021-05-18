import bcrypt from 'bcrypt';

export class Password {
  static async toHash(password: string) {
    const saltRounds = 8;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const match = await bcrypt.compare(suppliedPassword, storedPassword);
    return match;
  }
}
