import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

const doctorSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Doctor name is required.']
    },
    login: {
        type: String,
        required: [true, 'Login is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    medicalSpecialty: {
        type: String,
        required: [true, 'Medical Specialty is required.']
    },
    medicalRegistration: {
        type: String,
        required: [true, 'Medical Registration is required.'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email contact is required.']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
);

const doctor = mongoose.model('Doctor', doctorSchema);

export default doctor;