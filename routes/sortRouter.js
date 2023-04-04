const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const {
   createNewSortAlgorithm,
   createCodeSortingAlgorithm,
   createOptimisedCodeSortingAlgorithm,
   getSorts,
   getSortingAlgorithm,
   getOptimisedSortingAlgorithm,
   deleteSortBaseCode,
   deleteOptimisedSortBaseCode,
   addWorking,
   getWorking,
   deleteWorking,
   getSortsMain,
   getSingleSort,
   getSortDataAdmin,
} = require("../controllers/sortController");
const userAuth = require("../middlewares/userAuth");

const storage = multer.diskStorage({
   destination: "public/images/sort",
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
         null,
         file.fieldname +
            "-" +
            uniqueSuffix +
            "." +
            file.originalname.split(".")[1]
      );
   },
});

const upload = multer({
   limits: {
      fileSize: 2000000,
   },
   fileFilter: (req, file, cb) => {
      const allowed = [".jpg", ".jpeg", ".png", ".webp"];
      const ext = path.extname(file.originalname);
      if (!allowed.includes(ext)) {
         return cb(new Error("Please upload jpg, jpeg, webp, or png"));
      }
      cb(undefined, true);
   },
   storage: storage,
});
// admin routes
router.post("/admin/creatsort", createNewSortAlgorithm);
router.post("/admin/addlanguage", createCodeSortingAlgorithm);
router.post("/admin/addoptlanguage", createOptimisedCodeSortingAlgorithm);
router.get("/admin/getsort", getSorts);
router.get("/admin/basecode/:sortid", getSortingAlgorithm);
router.get("/admin/optimisedcode/:sortid", getOptimisedSortingAlgorithm);
router.delete("/admin/basecode/:id/delete", deleteSortBaseCode);
router.delete("/admin/optimisedcode/:id/delete", deleteOptimisedSortBaseCode);
router.post("/admin/addworking", upload.single("image"), addWorking);
router.get("/admin/working/:sortid", getWorking);
router.delete("/admin/working/:id/delete", deleteWorking);
router.get("/admin/sort/:id", getSortDataAdmin);

// client routes
router.get("/getsort", getSortsMain);
router.get("/getsort/:sortid", getSingleSort);

module.exports = router;
