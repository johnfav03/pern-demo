const db = require("../models")
const Log = db.logs;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = (req, res) => {
  const log = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published ? req.body.published : false,
    public: req.body.public ? req.body.public : false,
  };

  Log.create(log)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Log"
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Log.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Logs"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Log.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Log with id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Log with id=${id}`
      })
    })
};

exports.update = (req, res) => {
  const id = req.params.id;

  Log.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Log was updated successfully"
        });
      } else {
        res.send({
          message: `Cannot update Log with id=${id}`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Log with id=${id}`
      });
    });
};

exports.delete = (req, res) => {
  Log.destroy({
    where: { id: req.params.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Log was deleted successfully"
        });
      } else {
        res.send({
          message: `Cannot delete Log with id=${id}`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error deleting Log with id=${err}`
      });
    });
};

exports.deleteAll = (req, res) => {
  Log.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Logs were deleted successfully` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Logs"
      });
    });
};

exports.findAllPublished = (req, res) => {
  Log.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Logs"
      });
    });
};