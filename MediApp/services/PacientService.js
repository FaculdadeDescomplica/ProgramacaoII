import PacientRepository from "../repositories/PacientRepository.js"

const getAllPacients = async () => {
    return await PacientRepository.getAllPacients();
}

const getPacient = async (id) => {
    return await PacientRepository.getPacient(id);
}

const savePacient = async ({ name, birthDate, email, phone }) => {
    return await PacientRepository.savePacient({ name, birthDate, email, phone });
}

const updatePacient = async (id, { name, birthDate, email, phone }) => {
    return await PacientRepository.updatePacient(id, { name, birthDate, email, phone });
}

const deletePacient = async (id) => {
    return await PacientRepository.deletePacient(id);
}

const pacientService = {
    getAllPacients,
    getPacient,
    savePacient,
    updatePacient,
    deletePacient
}

export default pacientService;