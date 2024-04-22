const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const controller = require("../controllers/controller");

router.get("/diary/day", authenticateToken, controller.getDiaryDay);

router.get("/subjects", authenticateToken, controller.getSubjects);

router.post(
  "/homework/set-completed",
  authenticateToken,
  controller.setHomeworkCompleted
);
router.get(
  "/homework/upcoming",
  authenticateToken,
  controller.getUpcomingHomeworks
);
router.post("/homework/submit", authenticateToken, controller.submitHomework);
router.get(
  "/homework/submission/file",
  authenticateToken,
  controller.getStudentHomeworkSubmissionFile
);

router.get("/lesson", authenticateToken, controller.getLesson);
router.post("/lesson/save", authenticateToken, controller.saveLesson);
router.get("/lesson/group", authenticateToken, controller.getLessonGroup);
router.post("/lesson/set-attended", authenticateToken, controller.setAttended);

router.post("/lesson/set-mark", authenticateToken, controller.setLessonMark);
router.post(
  "/lesson/homework/set-mark",
  authenticateToken,
  controller.setLessonHomeworkMark
);
router.post(
  "/lesson/classwork/set-mark",
  authenticateToken,
  controller.setLessonClassworkMark
);

module.exports = router;
