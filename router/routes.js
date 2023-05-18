// require router from express
const router = require("express").Router();
const passport = require("passport");
const {
  registerDoctor,
  registerPatient,
  createReport,
  allReports,
  status,
  login,
} = require("../controllers/userControllers");

router.post("/doctors/register", registerDoctor);
router.post(
  "/patient/register",
  passport.authenticate("jwt", { session: false }),
  registerPatient
);
router.post("/login", login);
router.post("/patient/:id/create_report", createReport);
router.get("/patient/:id/all_reports", allReports);
router.get("/reports/:status", status);

module.exports = router;
