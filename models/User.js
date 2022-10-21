const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

//create our User model
class User extends Model {
  //setup method to run on instance data per user to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

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
    hooks: {
      //setup beforeCreate lifecycle "hook" functionality
      async beforeCreate(newuserData) {
        newuserData.password = await bcrypt.hash(newuserData.password, 10);
        return newuserData;
      },
      //setup beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
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
