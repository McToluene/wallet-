import mongoose, { Document, Schema } from 'mongoose';

import ITransaction from '../interfaces/transaction';

const Transaction = new Schema(
  {
    transactionRef: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    customerId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['PENDING', 'FAILED', 'SUCCESSFUL'],
      required: true,
    },

    type: {
      type: String,
      enum: ['CREDIT', 'DEBIT'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction & Document>('Transaction', Transaction);
