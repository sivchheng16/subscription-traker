import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      minlenght: 2,
      maxlenght: 100,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a  grater than 0"],
      
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"],
      required: [true, "Currency is required"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      tyepe: String,
      enum: ["sport", "news", "software", "education", "other"],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "canceled","expired" ],
      default: "active",
    },

    startDate: {
      type: Date,
      required: true,
    },
    validate: {
      validate: (value) => value <= new Date(),
      message: "Start date must be in the past",
    },
    renewalDate: {
      type: Date,
      required: true,
    },
    validate: {
      validate: (value) => value > this.startDate(),
      message: "Renewal date must be after the start date",
    },
    user: { 
      type: mongoose.Schema.Type.ObjectID,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

subsctiptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalDate = {
      dalidy: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalDate[this.frequency],
    );
  }

  
  // auto-update the status if renwal date has passed
  if (this.renewalDate < new Date()) { 
      this.status = "expired";
    }
   next(); 
});


const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;