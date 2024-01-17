import express from "express";
import PrescriptionService from "../services/PrescriptionService.js";
import multer from 'multer';
import process from "process";
import path from "path";

let router = express.Router();

const storage = multer.diskStorage(
  {
    destination: function(req, file, cb){
      cb(null, './MediApp/prescriptions/');
    },
    filename: function(req, file, cb){
      cb(null, file.originalname);
    }
  }
);

const upload = multer({storage: storage});

router.post('/uploadPrescription/:id', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    let prescription = await PrescriptionService.getPrescription(id);

    const file = "./MediApp/prescriptions/" + req.file.originalname;
    prescription = await PrescriptionService.updatePrescription(id, { file });

    return res.status(200).send(prescription);

  } catch (error) {
    console.error(error);
      res.status(500).send(error);
  }
}

);

router.get('/readPrescription/:id', async(req,res) => {
  const { id } = req.params;

  try {
    const prescription = await PrescriptionService.getPrescription(id);
    let filePath = path.resolve(process.cwd() + "/../" + prescription.file);
    res.status(200).sendFile(filePath);
    
  } catch (error) {
    console.error(error);
      res.status(500).send(error);
  }
  }
);

router.get('/prescriptions', async (req, res) => {
    try {
      const prescriptions = await PrescriptionService.getAllPrescriptions();
      res.send(prescriptions);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
});

router.get('/getPrescription/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const prescription = await PrescriptionService.getPrescription(id);
    res.send(prescription)
  } catch (error){
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/postPrescription", async function(req, res){
    const { date, appointmentId, medicine, dosage, instructions } = req.body;
    try{
        const prescription = await PrescriptionService.savePrescription({ date, appointmentId, medicine, dosage, instructions });
        res.send(prescription);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.put('/prescriptions/:id', async (req, res) => {
  const { id } = req.params;
  const { date, appointmentId, medicine, dosage, instructions } = req.body;

  try {
    const prescription = await PrescriptionService.updatePrescription(id, { date, appointmentId, medicine, dosage, instructions });
    res.send(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.delete('/prescriptions/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const prescription = await PrescriptionService.deletePrescription(id);
    res.send(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/generatePrescription/:id', async(req, res) => {
  const { id } = req.params;
  try {
    const prescription = await PrescriptionService.getPrescription(id);
    const generatedPrescription = await PrescriptionService.generatePrescriptionFile(prescription);
    res.send(generatedPrescription);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;