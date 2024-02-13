import { Document, Model } from 'mongoose';

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

interface UserModel extends Model<UserDocument> {}

// Your mongoose schema definition and model creation...

export { UserDocument, UserModel };
