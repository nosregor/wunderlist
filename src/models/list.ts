import { Document, Schema } from 'mongoose';
import { ITask } from './task';

import { IUser } from './user';

import * as connections from '../database/index';

/**
 * @export
 * @interface IList
 * @extends {Document}
 */
export interface IList extends Document {
  title: string;
  user: IUser;
  tasks: ITask[];
}

const ListSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true },
);


//https://xjavascript.com/view/3705349/cascade-style-delete-in-mongoose
//https://dev.to/kwabenberko/implementing-sql--like-cascades-in-mongoose-bap
ListSchema.pre<IList>('remove', async function (next) {
  console.log('DELETING');
  try {
    await Task.remove({
      _id: {
        $in: this.tasks,
      },
    });
    next();
  } catch (error) {
    next(error);
  }
});

const List = connections.db.model('List', ListSchema);

export { List };
