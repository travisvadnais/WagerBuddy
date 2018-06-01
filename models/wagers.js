module.exports = function(sequelize, DataTypes) {
    var Wager = sequelize.define("Wager", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        terms: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stakes: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        settledate: {
            type: DataTypes.DATE,
            allowNull: false
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
        }
    });

    //This should tie a wager to a user
    Wager.associate = function(models) {
        Wager.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Wager;
};