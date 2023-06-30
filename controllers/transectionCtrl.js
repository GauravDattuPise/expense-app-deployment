const transectionModel = require("../models/transectionModel");
const moment = require("moment");


// creating new transaction
const addTransection = async (req, res) => {
  try {

    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).send("Transection Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// fetching transaction according to date 
const getAllTransection = async (req, res) => {
  try {

    const { frequency, selectedDate, type } = req.body;

    // Query the transections based on the provided filters
    const transections = await transectionModel.find({
      ...(frequency !== "custom"
        ? {
          // If frequency is not "custom", filter by date within the specified frequency
          date: {
            $gt: moment().subtract(Number(frequency), "d").toDate(),
          },
        }
        : {
          // If frequency is "custom", filter by selectedDate range
          date: {
            $gte: selectedDate[0],
            $lte: selectedDate[1],
          },
        }),
      userid: req.body.userid, // Filter by the provided userid
      ...(type !== "all" && { type }), // If type is not "all", filter by the provided type
    });

    // Return the retrieved transections as the response
    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).json(erorr);
  };
}
// deleting transaction document by using its id
const deleteTransection = async (req, res) => {
  try {

    await transectionModel.findOneAndDelete({ _id: req.body.transacationId });
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// updating transaction according to id
const editTransection = async (req, res) => {
  try {

    await transectionModel.findOneAndUpdate(
      { _id: req.body.transacationId },
      req.body.payload
    );
    res.status(200).send("Editd Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection
}