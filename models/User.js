const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//create our User model
class User extends Model {}

//define table columns and config
User.init(
  {
    // Table Column Definitions

    //define id
    id: {
      //use the special sequelize datatypes object provide what type of data it is
      type: DataTypes.INTEGER,
      //this is the equivalent of SQL's 'NOT NULL' option
      allowNull: false,
      //instruct that this is the Primary Key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true,
    },
    //define username
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //no duplicate emails
      unique: true,
      //if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true,
      },
    },
    //define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //this means the password must be at least four characters long
        len: [4],
      },
    },
  },
  {
    //Table Config options

    //pass in our imported sequelize connection
    sequelize,
    //dont automatically create timestap fields
    timestamps: false,
    //dont pluralize name of database title
    freezeTableName: true,
    //use underscores instead of camelcasing
    underscored: true,
    //make it so our model name stays lowercaase in the database
    modelName: "user",
  }
);

module.exports = User;
