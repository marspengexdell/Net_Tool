import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubmissionSchema = new Schema({
  form: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
  data: { type: Object, required: true },
}, {
  timestamps: true,
});

const Submission = mongoose.model('Submission', SubmissionSchema);

export default Submission;
