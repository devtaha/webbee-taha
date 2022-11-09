import { DataTypes, literal, ModelAttributes, QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export default {
    /**
     # ToDo: Create a migration that creates all tables for the following user stories
  
     For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
     To not introduce additional complexity, please consider only one cinema.
  
     Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.
  
     ## User Stories
  
     **Movie exploration**
     * As a user I want to see which films can be watched and at what times
     * As a user I want to only see the shows which are not booked out
  
     **Show administration**
     * As a cinema owner I want to run different films at different times
     * As a cinema owner I want to run multiple films at the same time in different showrooms
  
     **Pricing**
     * As a cinema owner I want to get paid differently per show
     * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat
  
     **Seating**
     * As a user I want to book a seat
     * As a user I want to book a vip seat/couple seat/super vip/whatever
     * As a user I want to see which seats are still available
     * As a user I want to know where I'm sitting on my ticket
     * As a cinema owner I don't want to configure the seating for every show
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    up: async (queryInterface: QueryInterface): Promise<void> => {
        const createdUpdatedAtModels = {
            createdAt: {
                type: DataType.DATE,
                defaultValue: literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: DataType.DATE,
                defaultValue: literal('CURRENT_TIMESTAMP'),
            },
        }

        const idModel = {
            id: { type: 'integer', primaryKey: true, autoIncrement: true, },
        };

        await queryInterface.createTable('cinema', {
            ...idModel,
            name: { type: DataTypes.STRING },
            ...createdUpdatedAtModels
        } as ModelAttributes);

        await queryInterface.createTable('show_room', {
            ...idModel,
            name: { type: DataType.STRING },
            ...createdUpdatedAtModels
        } as ModelAttributes);

        await queryInterface.createTable('film', {
            ...idModel,
            name: { type: 'varchar' },
            duration: { type: DataTypes.INTEGER },
            ...createdUpdatedAtModels
        } as ModelAttributes);

        await queryInterface.createTable('show', {
            ...idModel,
            showRoomId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        tableName: 'show_room',
                    },
                    key: 'id',
                },
                onDelete: 'cascade',
            },
            filmId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        tableName: 'film',
                    },
                    key: 'id',
                },
                onDelete: 'cascade',
            },
            perSeatPrice: { type: DataTypes.NUMBER },
            ...createdUpdatedAtModels
        } as ModelAttributes);

        await queryInterface.createTable('booking', {
            ...idModel,
            showId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        tableName: 'show',
                    },
                    key: 'id',
                },
                onDelete: 'cascade',
            },
            ...createdUpdatedAtModels
        } as ModelAttributes);

        await queryInterface.createTable('booking_seat', {
            ...idModel,
            seatId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        tableName: 'seat',
                    },
                    key: 'id',
                },
                onDelete: 'cascade',
            },
            bookingId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        tableName: 'booking',
                    },
                    key: 'id',
                },
                onDelete: 'cascade',
            },
            ...createdUpdatedAtModels
        } as ModelAttributes);

        await queryInterface.createTable('seat', {
            ...idModel,
            name: { type: DataTypes.STRING },
            seatKindId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        tableName: 'seat_kind',
                    },
                    key: 'id',
                },
                onDelete: 'cascade',
            },
            ...createdUpdatedAtModels
        } as ModelAttributes);

        await queryInterface.createTable('seat_kind', {
            ...idModel,
            title: { type: DataTypes.STRING },
            ...createdUpdatedAtModels

        } as ModelAttributes);

        await queryInterface.createTable('seat_kind_premium', {
            ...idModel,
            premiumPercetage: { type: DataTypes.INTEGER },
            seatKindId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        tableName: 'seat_kind',
                    },
                    key: 'id',
                },
                onDelete: 'cascade',
            },
            ...createdUpdatedAtModels
        } as ModelAttributes);
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    down: (queryInterface: QueryInterface) => {
        // do nothing
    },
};
