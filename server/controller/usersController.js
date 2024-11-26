const { Users } = require("../models");

class UsersController {
  static async getUsers(req, res) {
    try {
      const usersList = await Users.findAll({
        order: [
          ['last_seen', 'DESC'],
        ],
      });
      res.status(200).json({
        users: usersList,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  }

  static async blockUsers(req, res) {
    const { ids } = req.body;
    if (ids.length === 0) {
      return res.status(400).json({
        message: 'No IDs provided.',
      });
    }
    try {
      await Users.update(
        { is_blocked: 1 },
        {
          where: {
            id: req.body.ids,
          },
        },
      );
      res.status(201).json({
        message: 'Users blocked successfully'
      })
    } catch (error) {
      res.status(500).json({ message: 'Failed to block users' });
    }
  }

  static async unblockUsers(req, res) {
    const { ids } = req.body;
    if (ids.length === 0) {
      return res.status(400).json({
        message: 'No IDs provided.',
      });
    }
    try {
      await Users.update(
        { is_blocked: 0 },
        {
          where: {
            id: req.body.ids,
          },
        },
      );
      res.status(201).json({
        message: 'Users unblocked successfully'
      })
    } catch (error) {
      res.status(500).json({ message: 'Failed to unblock users' });
    }
  }

  static async deleteUsers(req, res) {
    const { ids } = req.body;
    if (ids.length === 0) {
      return res.status(400).json({
        message: 'No IDs provided.',
      });
    }
    try {
      await Users.destroy({
        where: {
          id: req.body.ids,
        },
      },
      );
      res.status(201).json({
        message: 'Users deleted successfully'
      })
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete users' });
    }
  }
}
module.exports = UsersController;