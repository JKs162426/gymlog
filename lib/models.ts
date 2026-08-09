import mongoose, { Schema, model, models } from "mongoose";

const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
});

const WorkoutSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    notes: { type: String },
    exercises: [ExerciseSchema],
  },
  { timestamps: true }
);

export const Workout = models.Workout || model("Workout", WorkoutSchema);

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
