import mongoose from 'mongoose';

const numSchema = mongoose.Schema({
  numInit: {
    type: Number,
    required: true
  },
  superNum: {
    type: Number,
    required: true
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
},{
  versionKey: false,
});

export default mongoose.model('Num', numSchema);