import mongoose from "mongoose";
import { Password } from '../services/password';

//! An interface that describes proprties that are required
//! to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

//! An interface describes the properties that
//! user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//! An interface describes the properties that
//! user model has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  toJSON:{ //! customize JSON response
    transform(doc,ret){
      ret.id = ret._id;
      delete ret._id;     //remove property id
      delete ret.password; //remove property password
      delete ret.__v;  //remove property __v
    }
  }
});

//! implemented middleware function in mongoose
userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
    }
    done();
  });


userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
