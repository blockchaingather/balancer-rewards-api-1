import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'every_week_need_reward_user_snapshot',
    timestamps: false,
    freezeTableName: true
})
export default class liquidityMining extends Model<liquidityMining> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    declare id: number;

    @Column(DataType.INTEGER)
    declare chain_id: number;

    @Column(DataType.STRING)
    declare pool_address: string;

    @Column(DataType.STRING)
    declare token_address: string;

    @Column(DataType.STRING)
    declare user_address: string;

    @Column(DataType.STRING)
    declare current_estimate: string;

    @Column(DataType.STRING)
    declare velocity: string;

    @Column(DataType.INTEGER)
    declare week: number;
}
