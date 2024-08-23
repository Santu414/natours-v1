const catchAsync = require("./../utils/catchAsync")
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils//apiFeaturs");


exports.deleteOne = (Model) => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(204). json({
      status: "Success",
      data:null,
    });
  });



exports.upDateOne = (Model) => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });

    if (!doc) {
      return next(new AppError("No Document found with that ID", 404));
    }

    res.json({
      status: "Success",
      message: "The tour has been updated successfully",
      data: {
        data: doc,
      },
    });
  });

  exports.createOne =(Model) =>catchAsync(async (req, res, next) => {
    const dec = await Model.create(req.body);
         res.json({
      status: "Success",
      message: "The tour has been created successfully",
      data: dec,
    });
  });

  exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
      let query = Model.findById(req.params.id);
      if (popOptions) query = query.populate(popOptions);
      const dec = await query;

      if (!dec) {
        return next(new AppError("No decument found with that ID", 404));
      }

      res.json({
        status: "Success",
        message: `Getting Tour by ${req.params.id}`,
        data: {
          data: dec,
        },
      });
    });

    exports.getAll = (Model) =>
      catchAsync(async (req, res, next) => {
        let filter = {};
        if (req.params.tourId) filter = { tour: req.params.tourId };

        const features = new APIFeatures(Model.find(filter), req.query)
          .filter()
          .sort()
          .limitFields()
          .paginate();

        let doc = await features.query;

        res.status(200).json({
          status: "Succes",
          message: "List of all doc",
          count: doc.length,
          data: {
            data: doc,
          },
        });
      });