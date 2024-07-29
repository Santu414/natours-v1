class APIFeatures {
  constructor(query, queryString) {
    this.query = query; // This should be a Mongoose query object
    this.queryString = queryString;
  }

  filter() {
    // Create a copy of the query string object to avoid mutation
    const queryObj = { ...this.queryString };
    console.log("queryObj", queryObj);

    // Exclude fields not needed for the query
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((item) => delete queryObj[item]);

    // Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Apply the filters to the query
    try {
      this.query = this.query.find(JSON.parse(queryStr));
    } catch (err) {
      console.error("Error parsing query string:", err);
      throw new Error("Invalid query parameters");
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt"); // Ensure this matches your schema field
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v"); // Ensure this matches your schema field
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports=APIFeatures