const Doctor = require("../modal/doctor");
const Patient = require("../modal/patient");
const jwt = require("jsonwebtoken");

// exports controller function

module.exports.registerDoctor = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const doctor = await Doctor.create({ name, password });

    res.status(200).json({
      success: true,
      message: "New Doctor id is created ",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't create a doctor profile, internal server error",
    });
  }
};

module.exports.registerPatient = async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(200).json({
      success: true,
      message: "New Patient is registered",
      patient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Can't create a patient profile, internal server error",
    });
  }
};

module.exports.login = (req, res, next) => {
  try {
    const user = Doctor.find(req.body);

    if (user) {
      const token = jwt.sign(user.id, "secret");
      res.status(200).json({
        success: true,
        token,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Invalid name or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error due to unauthorized user",
    });
  }
};

module.exports.createReport = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    const date = Date.now();
    req.body.date = date;

    patient.reports.push(req.body);
    patient.save();

    res.status(200).json({
      success: true,
      message: "Patient report is updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in creating Report, internal server error",
    });
  }
};

module.exports.allReports = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    res.status(200).json({
      success: true,
      message: "patient reports",
      reports: patient.reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Patient validation failed",
    });
  }
};

module.exports.status = async (req, res, next) => {
  try {
    const patients = await Patient.find({
      reports: { $elemMatch: { status: req.params.status } },
    });

    res.status(200).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching reports",
    });
  }
};
