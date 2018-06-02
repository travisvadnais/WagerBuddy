module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            //This should enforce a unique nickname
            unique: true
        },
        email: {
            //Note: Since we allow Null here, any 'null' entry will bypass the validator
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            unique: true,
            validate: {
                isEmail: true,
            }
        }
    });

    //Associate user w/ bets & delete bets if a user gets deleted
    User.associate = function(models) {
        User.hasMany(models.Wager, {
            onDelete: "cascade"
        });
    };
    return User;
};