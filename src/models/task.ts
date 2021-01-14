import { Document, Model, model, Schema } from 'mongoose';
import { IList, List } from './list';
import { IUser } from './user';

export interface ITask extends Document {
  title: String;
  status: String;
  list: IList;
  user: IUser;
}

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: 'List',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Task: Model<ITask> = model('Task', TaskSchema);

export { Task };
