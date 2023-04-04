const { sendErrorResponse } = require("../helpers");
const {
  Sort,
  SortingAlgorithm,
  OptimisedSortingAlgorithm,
  Working,
} = require("../models");
const {
  sortSchema,
  sortingAlgorithmSchema,
  optimisedSortingAlgorithmSchema,
  workingSchema,
} = require("../validations/sort.schema.js");
const { isValidObjectId } = require("mongoose");

module.exports = {
  createNewSortAlgorithm: async (req, res) => {
    try {
      const {
        title,
        description,
        alogorithm,
        tcBest,
        tcWorst,
        tcAverage,
        spaceComplexity,
        stability,
      } = req.body;

      const { _, error } = sortSchema.validate(req.body);

      if (error) {
        return sendErrorResponse(res, 400, error.details[0].message);
      }

      const newSort = new Sort({
        title,
        description,
        alogorithm,
        tcBest,
        tcWorst,
        tcAverage,
        spaceComplexity,
        stability,
      });
      await newSort.save();

      res.status(200).json(newSort);
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },
  editSortAlgorithm: async (req, res) => {
    try {
      const { id } = req.params;

      const { _, error } = sortSchema.validate(req.body);

      if (error) {
        return sendErrorResponse(res, 400, error.details[0].message);
      }

      const sort = await Sort.findByIdAndUpdate(id, { ...req.body });
      if (!sort) {
        return sendErrorResponse(res, 500, "sort not found");
      }

      res.status(200).json(sort);
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },

  createCodeSortingAlgorithm: async (req, res) => {
    try {
      const { sort, language, code } = req.body;

      const { _, error } = sortingAlgorithmSchema.validate(req.body);
      if (error) {
        return sendErrorResponse(res, 400, error.details[0].message);
      }

      if (!isValidObjectId(sort)) {
        return sendErrorResponse(res, 400, "Invalid Sort id!");
      }
      const sortData = await Sort.findById(sort);
      if (!sortData) {
        return sendErrorResponse(res, 404, "Sort Algorithm not found");
      }

      const newLanguage = new SortingAlgorithm({
        sort,
        language,
        code,
      });
      await newLanguage.save();

      res.status(200).json(newLanguage);
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },

  createOptimisedCodeSortingAlgorithm: async (req, res) => {
    try {
      const { sort, language, code } = req.body;

      const { _, error } = optimisedSortingAlgorithmSchema.validate(req.body);
      if (error) {
        return sendErrorResponse(res, 400, error.details[0].message);
      }

      if (!isValidObjectId(sort)) {
        return sendErrorResponse(res, 400, "Invalid Sort id!");
      }
      const sortData = await Sort.findById(sort);
      if (!sortData) {
        return sendErrorResponse(res, 404, "Sort Algorithm not found");
      }

      const newOptimisedLanguage = new OptimisedSortingAlgorithm({
        sort,
        language,
        code,
      });
      await newOptimisedLanguage.save();

      res.status(200).json(newOptimisedLanguage);
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },

  getSorts: async (req, res) => {
    try {
      const sort = await Sort.find();

      res.status(200).json({
        message: "success",
        sortData: sort,
      });
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },

  getSortingAlgorithm: async (req, res) => {
    try {
      const { sortid } = req.params;

      if (!isValidObjectId(sortid)) {
        return sendErrorResponse(res, 400, "Invalid Sort id!");
      }
      const code = await SortingAlgorithm.find({
        sort: sortid,
      });
      res.status(200).json({
        message: "success",
        codeData: code,
      });
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },

  getOptimisedSortingAlgorithm: async (req, res) => {
    try {
      const { sortid } = req.params;

      if (!isValidObjectId(sortid)) {
        return sendErrorResponse(res, 400, "Invalid Sort id!");
      }
      const code = await OptimisedSortingAlgorithm.find({
        sort: sortid,
      });
      res.status(200).json({
        message: "success",
        codeData: code,
      });
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },

  deleteSortBaseCode: async (req, res) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return sendErrorResponse(res, 400, "Invalid Base Code Id!");
      }
      await SortingAlgorithm.findByIdAndDelete(id);

      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },

  deleteOptimisedSortBaseCode: async (req, res) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return sendErrorResponse(res, 400, "Invalid Optimised Code Id!");
      }
      await OptimisedSortingAlgorithm.findByIdAndDelete(id);

      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },

  addWorking: async (req, res) => {
    try {
      console.log(req.body);
      const { _, error } = workingSchema.validate(req.body);
      if (error) {
        return sendErrorResponse(res, 400, error.details[0].message);
      }

      let image;
      if (!req.file?.path) {
        return sendErrorResponse(res, 400, "Working image is required");
      } else {
        image = "/" + req.file.path.replace(/\\/g, "/");
      }

      const newWorking = new Working({
        ...req.body,
        image,
      });
      await newWorking.save();

      res.status(200).json({
        message: "new working added successfully",
        newWorking,
      });
    } catch (err) {
      sendErrorResponse(res, 500, err);
    }
  },

  getWorking: async (req, res) => {
    try {
      const { sortid } = req.params;

      if (!isValidObjectId(sortid)) {
        return sendErrorResponse(res, 400, "Invalid Sort id!");
      }
      const work = await Working.find({
        sort: sortid,
      });
      res.status(200).json({
        message: "success",
        work,
      });
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },

  deleteWorking: async (req, res) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return sendErrorResponse(res, 400, "Invalid Working Code Id!");
      }
      await Working.findByIdAndDelete(id);

      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },

  getSortDataAdmin: async (req, res) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return sendErrorResponse(res, 400, "Invalid Working Code Id!");
      }

      const sort = await Sort.findById(id);

      res.status(200).json({
        message: "success",
        sort,
      });
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },
  deleteSort: async (req, res) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return sendErrorResponse(res, 400, "Invalid Working Code Id!");
      }
      await Sort.findByIdAndDelete(id);

      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },

  // client side code
  getSortsMain: async (req, res) => {
    try {
      const sortData = await Sort.find().select([
        "_id",
        "title",
        "description",
      ]);
      res.status(200).json({
        message: "success",
        sortData,
      });
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },

  getSingleSort: async (req, res) => {
    try {
      const { sortid } = req.params;

      if (!isValidObjectId(sortid)) {
        return sendErrorResponse(res, 400, "Invalid Sort id!");
      }
      const sortData = await Sort.findById(sortid);
      const working = await Working.find({ sort: sortid });
      const algo = await SortingAlgorithm.find({ sort: sortid });
      const optAlgo = await OptimisedSortingAlgorithm.find({ sort: sortid });

      res.status(200).json({
        message: "success",
        sortData,
        working,
        algo,
        optAlgo,
      });
    } catch (err) {
      sendErrorResponse(res, 500, err);
      console.log(err);
    }
  },
};
