import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

const pacientSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Pacient name is required.']
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth Date is required.']
    },
    email: {
        type: String,
        required: [true, 'Email contact is required.']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required.'],
        validate: {
            validator: function (v) {
                return /\d{2} 9\d{4}-\d{4}/.test(v);
            },
            message: props =>
             `${props.value} This is not a valid phone value. Please use the following format 99 91234-4567`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
);

const pacient = mongoose.model('Pacient', pacientSchema);

export default pacient;