const db = require("../models");
const Cambien = db.cambien;
const moment = require("moment");
moment.locale("vi"); // Đặt locale là tiếng Việt

// Create and Save a new Cambien
exports.create = (req, res) => {
  // Validate request
  if (!req.body.mua) {
    return res.status(400).send({ message: "Mưa không thể rỗng!" });
  }

  // Tạo đối tượng cảm biến mới
  const cambien = new Cambien({
    ngaynhan: moment().format("L"), // Định dạng ngày theo locale
    gionhan: moment().format("LT"), // Định dạng giờ theo locale
    mua: req.body.mua,
    vitri: req.body.vitri,
  });

  // Lưu cảm biến vào cơ sở dữ liệu
  cambien.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Đã có lỗi xảy ra khi lưu dữ liệu vào bảng Cambien"
      });
    });
};

// Retrieve all Cambien or find by receive day from the database
exports.findAll = (req, res) => {
  const ngaynhan = req.query.ngaynhan;
  var condition = ngaynhan ? { ngaynhan: { $regex: new RegExp(ngaynhan), $options: "i" } } : {};

  Cambien.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Có lỗi trong khi tìm ngày nhận"
      });
    });
};

// Retrieve a single Cambien with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cambien.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "Not found CamBien with id " + id });
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving CamBien with id=" + id });
    });
};

// Update a Cambien identified by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!"
    });
  }

  const id = req.params.id;

  Cambien.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update CamBien with id=${id}. Maybe CamBien was not found!`
        });
      }
      res.send({ message: "CamBien was updated successfully.", data });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating CamBien with id=" + id
      });
    });
};

// Delete a Cambien with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cambien.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot delete Cambien with id=${id}. Maybe Cambien was not found!`
        });
      }
      res.send({
        message: "Cambien was deleted successfully!"
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cambien with id=" + id
      });
    });
};

// Delete all Cambien from the database
exports.deleteAll = (req, res) => {
  Cambien.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Cambien were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all cambien."
      });
    });
};
