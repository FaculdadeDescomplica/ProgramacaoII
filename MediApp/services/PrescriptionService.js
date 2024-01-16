import PrescriptionRepository from "../repositories/PrescriptionRepository.js"

const getAllPrescriptions = async () => {
    return await PrescriptionRepository.getAllPrescriptions();
}

const getPrescription = async (id) => {
    return await PrescriptionRepository.getPrescription(id);
}

const savePrescription = async ({ date, appointmentId, medicine, dosage, instructions }) => {
    return await PrescriptionRepository.savePrescription({ date, appointmentId, medicine, dosage, instructions });
}

const updatePrescription = async (id, { date, appointmentId, medicine, dosage, instructions }) => {
    return await PrescriptionRepository.updatePrescription(id, { date, appointmentId, medicine, dosage, instructions });
}

const deletePrescription = async (id) => {
    return await PrescriptionRepository.deletePrescription(id);
}

const prescriptionService = {
    getAllPrescriptions,
    getPrescription,
    savePrescription,
    updatePrescription,
    deletePrescription
}

export default prescriptionService;