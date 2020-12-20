const {Sequelize, Model, DataTypes } = require('sequelize')
const {db} = require('./client')

class Place extends Model {}

Place.init({
    // attributes
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        defaultValue: 'Restaurants'
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    review: {
        type: DataTypes.VIRTUAL,
        get() {
            return ((this.reviews || 0) / this.reviewNumbers).toFixed(1);
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        }
    },
    reviews: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    reviewNumbers: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
}, {
    sequelize: db,

    modelName: 'place',

    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'updateTimestamp',
});

module.exports = {
    Place
}
