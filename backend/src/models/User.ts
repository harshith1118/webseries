import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IHistoryItem {
  video: mongoose.Types.ObjectId;
  progress: number;
  lastWatched: Date;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  avatar?: string;
  history: IHistoryItem[];
  createdAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: '',
  },
  history: [{
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    },
    progress: {
        type: Number, // in seconds
        default: 0
    },
    lastWatched: {
        type: Date,
        default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function () {
  const user = this as any;
  if (!user.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  if (user.password) {
      user.password = await bcrypt.hash(user.password, salt);
  }
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  if (!this.password) return false; 
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
