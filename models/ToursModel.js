const mongoose = require("mongoose");
const slugify=require('slugify')
const validator = require("validator");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],

     // validate:[validator.isAlpha,'Tour Name must only contain characters ']
      unique: true,
      trim: true,
      maxlength: [40, `A tour name must have less or equal then 40 characters`],
      minlength: [10, `A tour name must have less or equal then 10 characters
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      enum: {
        values: ["easy", "meduim", "difficulty"],
        message: "difficulty is either: easy , midium, difficult ",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be above 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message:'Discount price ({VALUE}) should be below regular price'
      },
    },

    
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour:{
      type:Boolean,
      default:false,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//Document Middlewere:runs before .save() and .create()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
//tourSchema.pre("save", function (next) {
 // console.log("Will Save Document");
 // next();
//});
//tourSchema.pre("save", function (doc,next) {
//  console.log(doc);
 // next();/
//});

//AGGREGATIOn Middlewere
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

//Query Middleware
//tourSchema.pre("find", function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  console.log(docs);
  next();
});
 

const Tour = mongoose.model("Tours", tourSchema);

module.exports =  Tour;