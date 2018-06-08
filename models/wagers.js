module.exports = function (sequelize, DataTypes) {
    var Wager = sequelize.define("Wager", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        terms: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        stakes: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        settledate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        player1: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        player2: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        player1win: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: '0'
        },
        player2win: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: '0'
        },
        player1welch: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: '0'
        },
        player2welch: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: '0'
        },
        betdate: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        player2name: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    //This should tie a wager to a user
    Wager.associate = function (models) {
        Wager.belongsTo(models.User, {
            // foreignKey: 'player1',
            allowNull: false
        })
    }

return Wager;
};