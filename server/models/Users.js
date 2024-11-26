const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 20],
          msg: 'Name must be between 3 and 20 characters long.'
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'This email address is already in use.',
      },
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Invalid email format.'
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1],
          msg: 'Password cannot be empty.'
        },
      },
    },
    confirm_password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Confirm password is required.',
        },
        isEqualToPassword(value) {
          if (value !== this.password) {
            throw new Error('Passwords do not match.');
          }
        },
      },
    },
    last_seen: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_blocked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  },
    {
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
      timestamps: false,
      tableName: 'users'
    },
  )
  return Users
}
